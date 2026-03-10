import { NextRequest, NextResponse } from "next/server"

// Dynamic import for Supabase to avoid build-time initialization
let supabase: any = null

async function getSupabaseClient() {
  if (!supabase) {
    try {
      const { supabase: supabaseClient } = await import("@/lib/supabase")
      supabase = supabaseClient
    } catch (error) {
      console.warn("Supabase client not available:", error)
      return null
    }
  }
  return supabase
}

// Simple in-memory rate limiting (for production, use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour window
  const maxRequests = 5 // 5 requests per hour

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  rateLimitMap.set(ip, record)
  return { allowed: true, remaining: maxRequests - record.count }
}

// Sanitize input to prevent XSS
function sanitizeInput(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const rateLimit = checkRateLimit(ip)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, projectType, budget, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name).slice(0, 100),
      email: sanitizeInput(email).slice(0, 255),
      projectType: projectType ? sanitizeInput(projectType).slice(0, 50) : undefined,
      budget: budget ? sanitizeInput(budget).slice(0, 50) : undefined,
      message: sanitizeInput(message).slice(0, 2000),
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate message length
    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 2000 characters" },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      // Supabase not configured - still allow form submission but just log it
      console.warn("Supabase not configured. Form submission:", sanitizedData)

      // Send email notification if configured
      if (process.env.RESEND_API_KEY || process.env.GMAIL_APP_PASS) {
        try {
          await sendEmailNotification(sanitizedData)
          return NextResponse.json({
            success: true,
            message: "Thank you! I'll get back to you soon.",
            data: { id: 'temp', created_at: new Date().toISOString() }
          })
        } catch (emailError) {
          console.error("Email notification failed:", emailError)
          return NextResponse.json(
            { error: "Email service not configured. Please contact directly." },
            { status: 500 }
          )
        }
      }

      return NextResponse.json({
        success: true,
        message: "Thank you! I'll get back to you soon.",
        data: { id: 'temp', created_at: new Date().toISOString() }
      })
    }

    // Insert into Supabase with sanitized data
    const supabaseClient = await getSupabaseClient()
    if (!supabaseClient) {
      console.warn("Supabase not configured, skipping database save")
      // Send email notification if configured
      if (process.env.RESEND_API_KEY || process.env.GMAIL_APP_PASS) {
        try {
          await sendEmailNotification(sanitizedData)
          return NextResponse.json({
            success: true,
            message: "Thank you! I'll get back to you soon.",
            data: { id: 'temp', created_at: new Date().toISOString() }
          })
        } catch (emailError) {
          console.error("Email notification failed:", emailError)
          return NextResponse.json(
            { error: "Email service not configured. Please contact directly." },
            { status: 500 }
          )
        }
      }
      return NextResponse.json({
        success: true,
        message: "Thank you! I'll get back to you soon.",
        data: { id: 'temp', created_at: new Date().toISOString() }
      })
    }

    const { data, error } = await supabaseClient
      .from("leads")
      .insert({
        name: sanitizedData.name,
        email: sanitizedData.email,
        project_type: sanitizedData.projectType || "General",
        budget: sanitizedData.budget || "Not specified",
        details: sanitizedData.message,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error.message)
      return NextResponse.json(
        { error: "Failed to save message. Please try again." },
        { status: 500 }
      )
    }

    // Send email notification (if configured)
    if (process.env.RESEND_API_KEY || process.env.GMAIL_APP_PASS) {
      try {
        await sendEmailNotification(sanitizedData)
      } catch (emailError) {
        console.error("Email notification failed:", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! I'll get back to you soon.",
      data,
    })
  } catch (error) {
    console.error("Contact API error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

async function sendEmailNotification(data: {
  name: string
  email: string
  projectType?: string
  budget?: string
  message: string
}) {
  // Note: Data is already sanitized before being passed to this function
  // Try Resend first (recommended)
  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
        to: [process.env.NOTIFICATION_EMAIL || "notifications@localhost"],
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <table style="width: 100%; max-width: 500px; border-collapse: collapse; font-family: sans-serif;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.projectType ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Project Type:</td>
              <td style="padding: 8px 0;">${data.projectType}</td>
            </tr>
            ` : ""}
            ${data.budget ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Budget:</td>
              <td style="padding: 8px 0;">${data.budget}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0;">${data.message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 10px;">
            Submitted on ${new Date().toLocaleString()} from ${data.email}
          </p>
        `,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(`Resend API error: ${res.status} - ${JSON.stringify(errorData)}`)
    }

    return
  }

  // Fallback to Nodemailer with Gmail
  if (process.env.GMAIL_APP_PASS) {
    const nodemailer = (await import("nodemailer")).default
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS.replace(/\s/g, ""),
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ""}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    })
  }
}
