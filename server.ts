import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { Memory } from "./src/lib/memory.js";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize SQLite Memory
const memory = new Memory();

const PORT = 3000;

// Initialize the Google GenAI SDK key server-side.
// We set User-Agent header to 'aistudio-build' as required.
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI client:", e);
}

// ==========================================
// MOCK INTEGRATIONS & MOCK DATA (REAL FEEL)
// ==========================================

// Global state for simple persistence (e.g. clickup tasks)
let clickupTasks = [
  { id: "tk-1", name: "Review iFilter Marketing Campaign", status: "In Progress", dueDate: "Tomorrow", description: "Audit Meta ads and check Windsor ROAS." },
  { id: "tk-2", name: "Sealy Website SEO Optimization", status: "To Do", dueDate: "Next Monday", description: "Coordinate with Shopify development team." },
  { id: "tk-3", name: "Draft RFP deck for Royal Petroleum Corp", status: "To Do", dueDate: "2026-06-30", description: "Ahmed to lead pitch deck preparation." },
  { id: "tk-4", name: "Pre-briefing for O2Nation Launch", status: "Done", dueDate: "Completed Yesterday", description: "Review AI engine specifications." }
];

// Metorik Mock
function handleMetorikSales(storeId: string) {
  const storeIdStr = String(storeId).trim();
  if (storeIdStr === "149659") {
    // iFilter (EGP)
    return {
      storeName: "iFilter Egypt",
      currency: "EGP",
      todaySales: 138400,
      todayOrders: 37,
      yesterdaySales: 154200,
      yesterdayOrders: 42,
      averageOrderValue: 3671,
      conversionRate: "3.8%",
      recentOrders: [
        { id: "ord-883", customer: "Amr Abdelaziz", total: 4200, items: 2 },
        { id: "ord-882", customer: "Hana Shaker", total: 2900, items: 1 },
        { id: "ord-881", customer: "Mostafa Nour", total: 6100, items: 3 }
      ]
    };
  } else if (storeIdStr === "143214") {
    // Sealy (SAR)
    return {
      storeName: "Sealy Gulf / Saudi",
      currency: "SAR",
      todaySales: 18400,
      todayOrders: 9,
      yesterdaySales: 24700,
      yesterdayOrders: 14,
      averageOrderValue: 1764,
      conversionRate: "2.4%",
      recentOrders: [
        { id: "ord-701", customer: "Fahad bin Sultan", total: 1800, items: 1 },
        { id: "ord-700", customer: "Sarah Al-Ghamdi", total: 3500, items: 2 }
      ]
    };
  } else {
    return {
      error: `Store with ID ${storeId} is not registered in Metorik connections. Allowed IDs: 149659 (iFilter) or 143214 (Sealy).`
    };
  }
}

// Windsor Ad Performance Mock (Ads System)
function handleWindsorAdPerformance() {
  return {
    period: "Yesterday compared to 7-day average",
    accounts: [
      {
        name: "iFilter Meta Ads (Egypt)",
        spend: "22,400 EGP",
        revenue: "89,600 EGP",
        conversions: 42,
        roas: 4.0,
        status: "Excellent (Above target 3.0)"
      },
      {
        name: "Sealy Snapchat Campaign (Saudi)",
        spend: "4,500 SAR",
        revenue: "8,100 SAR",
        conversions: 14,
        roas: 1.8,
        status: "Needs Attention (Below target 2.5) Alert Triggered!"
      },
      {
        name: "Bohemian Geeks Google Brand Search",
        spend: "1,200 EGP",
        revenue: "4,800 EGP",
        conversions: 8,
        roas: 4.0,
        status: "Healthy"
      }
    ],
    overallSummary: "Total Spend: ~38,500 EGP equivalent. Combined ROAS: 3.4."
  };
}

// WordPress / Shopify Site Analytics Mock
function handleSiteAnalytics(platform: string) {
  const p = platform.toLowerCase();
  if (p === "wordpress" || p.includes("wordpress")) {
    return {
      platform: "WordPress Site (Bohemian Geeks Agency)",
      visitorsToday: 1240,
      pageViewsToday: 3820,
      activeSessions: 18,
      mostVisitedPage: "/services/ai-solutions",
      loadTime: "1.4s"
    };
  } else {
    return {
      platform: "Shopify Store (iFilter/Sealy Frontend)",
      visitorsToday: 4890,
      pageViewsToday: 16400,
      activeSessions: 84,
      mostVisitedPage: "/products/water-filter-pro",
      cartAbandonsToday: 112
    };
  }
}

// Function Declarations list for Gemini AI
const toolsDeclarations = [
  {
    name: "getMetorikSales",
    description: "Fetches sales and orders data from Metorik store analytics. Always request store_id explicitly: 149659 for iFilter (Egypt, EGP) or 143214 for Sealy (Saudi/Gulf, SAR).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        store_id: {
          type: Type.STRING,
          description: "The unique ID profile of the store: '149659' (iFilter, EGP) or '143214' (Sealy, SAR)."
        }
      },
      required: ["store_id"]
    }
  },
  {
    name: "getWindsorAdPerformance",
    description: "Fetches live ad performance across systems (Meta, Snapchat, Google Ads) from Windsor, tracking budgets, spends, ROAS, and warnings.",
    parameters: {
      type: Type.OBJECT,
      properties: {}
    }
  },
  {
    name: "getSiteAnalytics",
    description: "Fetches dynamic analytics of visitors and views from WordPress or Shopify platforms.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        platform: {
          type: Type.STRING,
          description: "Can be 'wordpress' for BGK creative agency, or 'shopify' for dynamic sales stores."
        }
      },
      required: ["platform"]
    }
  },
  {
    name: "getClickUpTasks",
    description: "Fetches BGK / O2Nation agency tasks from ClickUp with lists, due dates and details.",
    parameters: {
      type: Type.OBJECT,
      properties: {}
    }
  },
  {
    name: "createClickUpTask",
    description: "Creates a new task in ClickUp for Ahmed or the team.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "Summary or title of the action item."
        },
        description: {
          type: Type.STRING,
          description: "Detailed step or context of what is needed."
        },
        dueDate: {
          type: Type.STRING,
          description: "Optionally specify when it is due (e.g. 'Tomorrow', 'Next week', or a date standard)."
        }
      },
      required: ["name"]
    }
  }
];

// Helper to execute function call
function executeFunctionCall(name: string, args: any) {
  console.log(`[EXECUTE TOOL] Calling function ${name} with args:`, args);
  try {
    switch (name) {
      case "getMetorikSales":
        return handleMetorikSales(args.store_id);
      case "getWindsorAdPerformance":
        return handleWindsorAdPerformance();
      case "getSiteAnalytics":
        return handleSiteAnalytics(args.platform);
      case "getClickUpTasks":
        return { tasks: clickupTasks };
      case "createClickUpTask": {
        const newTask = {
          id: `tk-${Date.now().toString().slice(-4)}`,
          name: args.name,
          description: args.description || "Created via Boho Voice Orb",
          status: "To Do",
          dueDate: args.dueDate || "Not Set"
        };
        clickupTasks.unshift(newTask);
        return { success: true, task: newTask, totalTasks: clickupTasks.length };
      }
      default:
        return { error: `Function ${name} is unsupported.` };
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

// BOHO COMPRESSION: System instruction (English guidance, directing model to output Egyptian Arabic chat).
let BOHO_SYSTEM_PROMPT = "";
try {
  BOHO_SYSTEM_PROMPT = fs.readFileSync(path.join(process.cwd(), "boho_system_prompt.txt"), "utf-8");
} catch (e) {
  console.warn("Could not read boho_system_prompt.txt, using fallback.");
  BOHO_SYSTEM_PROMPT = `You are "Boho" (بوهو), the ultimate AI Enterprise Operations Manager.`;
}

// ==========================================
// CORE DEEP BRAIN ENGINE
// ==========================================

async function think(userText: string): Promise<string> {
  if (!ai) return "AI not connected.";
  memory.add("user", userText);
  
  const recentContext = memory.recentMessages(20).map(m => ({
    role: m.role === "assistant" || m.role === "model" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  try {
    let currentResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: recentContext,
      config: {
        systemInstruction: BOHO_SYSTEM_PROMPT,
        temperature: 0.7,
        tools: [{ functionDeclarations: toolsDeclarations }],
      }
    });

    let loopSafety = 0;
    let formattedContents = [...recentContext];
    if (currentResponse?.candidates?.[0]?.content) {
      formattedContents.push(currentResponse.candidates[0].content);
    }

    while (currentResponse?.functionCalls && currentResponse.functionCalls.length > 0 && loopSafety < 4) {
      loopSafety++;
      const fc = currentResponse.functionCalls[0];
      const toolResult = executeFunctionCall(fc.name, fc.args);
      
      formattedContents.push({
        role: "user",
        parts: [{ text: `[TOOL_OUT] Result of ${fc.name}: ${JSON.stringify(toolResult)}` }]
      });

      currentResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: BOHO_SYSTEM_PROMPT,
          temperature: 0.7,
          tools: [{ functionDeclarations: toolsDeclarations }],
        }
      });
      if (currentResponse?.candidates?.[0]?.content) {
        formattedContents.push(currentResponse.candidates[0].content);
      }
    }

    const reply = currentResponse?.text || "حدث خطأ أثناء التفكير العميق.";
    memory.add("assistant", reply);
    return reply;
  } catch (error: any) {
    console.error("Think error:", error);
    return "سماح يا أحمد باشا، في عطل فني في العقل العميق.";
  }
}

// ==========================================
// TELEGRAM PROACTIVITY
// ==========================================

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT = process.env.TELEGRAM_CHAT_ID;

async function pushToTelegram(text: string) {
  if (!TG_TOKEN || !TG_CHAT) {
    console.log("[Telegram Warning] Tokens missing, simulated push:", text);
    return;
  }
  try {
    const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TG_CHAT, text })
    });
    console.log("[Telegram] Pushed alert successfully.");
  } catch (e) {
    console.error("[Telegram] Push failed:", e);
  }
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers["x-boho-secret"] || req.query.secret;
  if (process.env.X_BOHO_SECRET && token !== process.env.X_BOHO_SECRET) {
    return res.status(401).json({ error: "Unauthorized. Invalid X-Boho-Secret.", is_hybrid: true });
  }
  next();
};

// Deep Brain Tool Execution Endpoint (Webhook for Voice Agent)
app.post("/api/tasks/execute", requireAuth, async (req, res) => {
  const userRequest = req.body.request || req.body.args?.request || req.body.message;
  if (!userRequest) {
    return res.status(400).json({ error: "request is required in HTTP Task Processing payload" });
  }

  const answer = await think(userRequest);
  return res.json({ answer: answer });
});

// Simple Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    time: new Date().toISOString(),
    system: "Boho Enterprise Hybrid S2S Brain v2",
    apiLinked: !!ai,
    mcpConnected: true,
  });
});

// Mock Tools Directly Exposed to Frontend dashboard widgets
app.get("/api/mock/metorik", (req, res) => {
  const store = req.query.store_id || "149659";
  res.json(handleMetorikSales(store as string));
});

app.get("/api/mock/windsor", (req, res) => {
  res.json(handleWindsorAdPerformance());
});

app.get("/api/mock/analytics", (req, res) => {
  const platform = req.query.platform || "wordpress";
  res.json(handleSiteAnalytics(platform as string));
});

app.get("/api/mock/tasks", (req, res) => {
  res.json({ tasks: clickupTasks });
});

app.post("/api/mock/tasks", (req, res) => {
  const { name, description, dueDate } = req.body;
  if (!name) return res.status(400).json({ error: "Task name is required" });
  const newTask = {
    id: `tk-${Date.now().toString().slice(-4)}`,
    name,
    description: description || "Created via Dashboard widget",
    status: "To Do",
    dueDate: dueDate || "Today"
  };
  clickupTasks.unshift(newTask);
  res.json({ success: true, task: newTask, tasks: clickupTasks });
});

// AI Chat endpoint integrating the server-side Gemini API with support for multiple round-trip Function Calling
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages payload" });
  }

  const lastUserMsg = messages[messages.length - 1]?.content || "";
  if (!ai) {
    return res.json({
      role: "model",
      content: `يا غالي، في مشكلة بسيطة في ربط المفتاح (GEMINI_API_KEY). \n\nردك كان رداً على: "${lastUserMsg}"`
    });
  }

  const finalReplyContent = await think(lastUserMsg);
  res.json({
    role: "model",
    content: finalReplyContent,
    debugToolsCalled: true
  });
});

// A Daily Briefing route (Simulating the n8n triggering described in the doc)
app.post("/api/briefing", async (req, res) => {
  const prompt = "Ahmed is starting his day. Fetch iFilter sales (Metorik 149659) and Sealy sales (Metorik 143214), check ROAS performance across ad managers. Compile a morning briefing in exactly 5 short, high-energy Egyptian Arabic spoken sentences. Lead with the most important numbers Ahmed should watch first.";
  const text = await think(prompt);
  await pushToTelegram(text);
  res.json({ briefing: text });
});

// ROAS Alert route
app.post("/api/alert/roas", async (req, res) => {
  const prompt = "Check ROAS for every ad account via Windsor. If any account is below 2.0, alert Ahmed in one Egyptian Arabic sentence with the account name and number. If all fine, reply only 'tameen'.";
  const text = await think(prompt);
  if (!text.toLowerCase().includes("tameen") && !text.includes("تمام")) {
    await pushToTelegram(text);
  }
  res.json({ ok: true });
});

// ==========================================
// VITE DEV ENGINE OR STATIC BUNDLE MIDDLEWARE
// ==========================================
async function initiateRuntime() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(`🚀 Boho Hybrid Assistant Server active on port ${PORT}`);
    console.log(`📡 Ingress route: http://0.0.0.0:${PORT}`);
    console.log(`====================================================`);
  });
}

initiateRuntime();
