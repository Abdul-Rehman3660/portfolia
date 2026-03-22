// AI Services Configuration - SERVER ONLY
// This file should NEVER be imported in client components
// All API keys are exposed here and must stay server-side

import 'server-only'

import Anthropic from "@anthropic-ai/sdk"
import { GoogleGenerativeAI } from "@google/generative-ai"
import OpenAI from "openai"
import { HfInference } from "@huggingface/inference"

// Initialize Claude (Anthropic)
export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Initialize Gemini (Google)
export const gemini = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY || ""
)

// Initialize OpenAI
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Initialize Hugging Face
export const huggingFace = new HfInference(
  process.env.HUGGINGFACE_API_KEY || ""
)

// Qwen Configuration (Alibaba DashScope API)
export interface QwenConfig {
  apiKey: string
  model?: string
  baseUrl?: string
}

export const qwenConfig: QwenConfig = {
  apiKey: process.env.QWEN_API_KEY || "",
  model: process.env.QWEN_MODEL || "qwen-turbo",
  baseUrl:
    process.env.QWEN_BASE_URL ||
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
}

// Example: Ask Claude a question
export async function askClaude(prompt: string): Promise<string> {
  const message = await claude.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  const textContent = message.content.find((block) => block.type === "text")
  return textContent ? (textContent as any).text : ""
}

// Example: Ask Gemini a question
export async function askGemini(prompt: string): Promise<string> {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" })
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}

// Example: Ask OpenAI a question
export async function askOpenAI(prompt: string): Promise<string> {
  const message = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  return message.choices[0]?.message?.content || "No response from OpenAI"
}

// Example: Use Hugging Face model
export async function askHuggingFace(
  prompt: string,
  model: string = "gpt2"
): Promise<string> {
  const response = await huggingFace.textGeneration({
    model: model,
    inputs: prompt,
  })

  return response.generated_text || ""
}

// Example: Ask Qwen a question (Alibaba DashScope)
export async function askQwen(prompt: string): Promise<string> {
  if (!qwenConfig.apiKey) {
    throw new Error(
      "QWEN_API_KEY is not set. Get it from https://dashscope.aliyun.com/"
    )
  }

  const response = await fetch(qwenConfig.baseUrl || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${qwenConfig.apiKey}`,
    },
    body: JSON.stringify({
      model: qwenConfig.model || "qwen-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })

  const data = (await response.json()) as any

  if (data.output?.text) {
    return data.output.text
  } else if (data.message) {
    throw new Error(`Qwen API Error: ${data.message}`)
  } else {
    throw new Error(`Unexpected Qwen response: ${JSON.stringify(data)}`)
  }
}
