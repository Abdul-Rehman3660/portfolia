# 🤖 AI Services Setup Guide

## Quick Start

You now have all AI services installed and ready to use!

### ✅ Installed Packages

| AI Service | Package | Status |
|-----------|---------|--------|
| **Gemini** (Google) | `@google/generative-ai` | ✅ Installed |
| **Claude** (Anthropic) | `anthropic` | ✅ Installed |
| **OpenAI** (ChatGPT) | `openai` | ✅ Installed |
| **Hugging Face** | `@huggingface/inference` | ✅ Installed |
| **Qwen** (Alibaba) | `qwen`, `client`, `dotenv` | ✅ Installed |

---

## 🚀 CLI Commands

### Gemini Interactive CLI
```bash
pnpm cli:gemini
```
Start an interactive chat with Google Gemini AI.

**Example:**
```
🌟 Google Gemini CLI - Type 'exit' to quit

📝 You: What is React?
🤖 Gemini: React is a JavaScript library for building user interfaces...

📝 You: exit
👋 Goodbye!
```

### Qwen Interactive CLI
```bash
pnpm cli:qwen
```
Start an interactive chat with Alibaba Qwen AI.

**Example:**
```
🌟 Alibaba Qwen CLI - Type 'exit' to quit

📝 You: Explain machine learning
🤖 Qwen: Machine learning is a subset of artificial intelligence...

📝 You: exit
👋 Goodbye!
```

---

## 📝 API Configuration

### 1. Copy the environment template
```bash
cp .env.local.example .env.local
```

### 2. Get your API Keys

#### 🔮 Gemini (Google) - **Completely Free**
1. Go to: https://aistudio.google.com/
2. Click "Get API key"
3. Create new API key
4. Copy and paste into `.env.local` as `GOOGLE_API_KEY`

#### 🧠 Claude (Anthropic) - **$5 Free Credits**
1. Go to: https://console.anthropic.com
2. Sign up
3. Go to API keys section
4. Create new API key
5. Copy and paste into `.env.local` as `ANTHROPIC_API_KEY`

#### 🔌 OpenAI - **$5 Free Trial**
1. Go to: https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and paste into `.env.local` as `OPENAI_API_KEY`

#### 🤗 Hugging Face - **Free Tier**
1. Go to: https://huggingface.co/settings/tokens
2. Create new token (read or write)
3. Copy and paste into `.env.local` as `HUGGINGFACE_API_KEY`

#### 🟠 Qwen (Alibaba) - **Free Tier**
1. Go to: https://dashscope.aliyun.com/
2. Sign up with email/phone
3. Create API key in console
4. Copy and paste into `.env.local` as `QWEN_API_KEY`

---

## 📦 Using in Code

### Import Services
```typescript
import {
  askClaude,
  askGemini,
  askOpenAI,
  askHuggingFace,
  askQwen,
} from "@/lib/ai-services";
```

### Ask Claude
```typescript
const response = await askClaude("What is TypeScript?");
console.log(response);
```

### Ask Gemini
```typescript
const response = await askGemini("Explain React hooks");
console.log(response);
```

### Ask OpenAI
```typescript
const response = await askOpenAI("How do I use Next.js?");
console.log(response);
```

### Ask Qwen
```typescript
const response = await askQwen("什么是人工智能?"); // Works with Chinese too!
console.log(response);
```

### Use Hugging Face
```typescript
const response = await askHuggingFace("Once upon a time", "gpt2");
console.log(response);
```

---

## 🔗 API Endpoints

```typescript
// In lib/ai-services.ts you can configure:

// Qwen Configuration
const qwenConfig = {
  apiKey: process.env.QWEN_API_KEY,
  model: "qwen-turbo", // or "qwen-plus", "qwen-max"
  baseUrl: "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
};

// Gemini Models
// - gemini-1.5-flash (fast, cheap)
// - gemini-1.5-pro (most capable)

// Claude Models
// - claude-3-5-sonnet (latest)
// - claude-3-opus (most capable)
// - claude-3-haiku (fastest)

// OpenAI Models
// - gpt-4o-mini (cheap fast)
// - gpt-4o (capable)
// - gpt-4-turbo (expensive)

// Qwen Models
// - qwen-turbo (balanced)
// - qwen-plus (better quality)
// - qwen-max (highest quality)
```

---

## 🛠️ API Key Management Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use environment variables in production** - Set via hosting platform
3. **Rotate keys regularly** - Delete old unused keys
4. **Use different keys for different environments** - Dev, staging, production
5. **Monitor usage** - Check API dashboard for unexpected costs

---

## 🎯 Next Steps

1. Set up your `.env.local` with API keys
2. Test CLI tools: `pnpm cli:gemini` or `pnpm cli:qwen`
3. Use AI services in your Next.js components
4. Build amazing features with AI! 🚀

---

## 📚 Documentation Links

- [Google Gemini API](https://ai.google.dev/)
- [Anthropic Claude API](https://www.anthropic.com/api)
- [OpenAI API](https://platform.openai.com/docs)
- [Hugging Face Inference API](https://huggingface.co/docs/hub/en/inference-api)
- [Alibaba DashScope (Qwen)](https://dashscope.aliyun.com/doc)

---

## ❓ Troubleshooting

### "API key not found" error
- Make sure `.env.local` exists
- Check spelling of environment variable names
- Restart development server: `pnpm dev`

### CLI not responding
- Check your internet connection
- Verify API key is valid
- Check API quota/billing on service dashboard

### Type errors in code
- Run `pnpm install` to ensure all packages are installed
- Check that TypeScript types are installed: `pnpm ls | grep @types`

---

**Happy coding with AI! 🚀**
