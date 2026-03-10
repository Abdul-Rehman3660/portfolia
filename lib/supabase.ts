import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          project_type: string
          budget: string
          details: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          project_type?: string
          budget?: string
          details?: string
          status?: string
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          lead_magnet: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          lead_magnet?: string | null
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          name: string
          email: string
          meeting_type: string
          meeting_date: string
          meeting_time: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          meeting_type: string
          meeting_date: string
          meeting_time: string
          status?: string
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          message: string
          is_user: boolean
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          message: string
          is_user: boolean
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          type: string
          project: string
          description: string
          link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          project: string
          description: string
          link?: string | null
          created_at?: string
        }
      }
    }
  }
}
