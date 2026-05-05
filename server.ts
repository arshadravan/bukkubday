import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local Database Setup
const DB_PATH = path.join(process.cwd(), "data", "db.json");
const DATA_DIR = path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const initialData = {
  settings: {
    heroImage: "https://lh3.googleusercontent.com/pw/AP1GczNiWix0N9WvNqQByID7vA0nE6ZJm9V7X83Y9V5A-eFvM5uPzLID7vXvzN7Xv83Y9V5A=w1000",
    archiveProfilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Princess",
    isDarkMode: false
  },
  gallery: [],
  archive: [],
  messages: []
};

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const content = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading DB:", err);
    return initialData;
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing DB:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log(`Starting server with NODE_ENV=${process.env.NODE_ENV}`);

  app.use(express.json({ limit: '50mb' })); // Higher limit for base64 images

  app.use((req, res, next) => {
    if (!req.url.startsWith('/assets/')) {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    }
    next();
  });

  // API Routes
  app.get("/api/db", (req, res) => {
    res.json(readDB());
  });

  app.post("/api/settings", (req, res) => {
    const db = readDB();
    db.settings = { ...db.settings, ...req.body };
    writeDB(db);
    res.json({ success: true });
  });

  app.post("/api/messages", (req, res) => {
    const db = readDB();
    const newMessage = {
      id: Date.now().toString(),
      text: req.body.text,
      author: req.body.author || "Me",
      createdAt: new Date().toISOString()
    };
    db.messages.push(newMessage);
    // Keep last 100 messages
    if (db.messages.length > 100) db.messages.shift();
    writeDB(db);
    res.json(newMessage);
  });

  app.post("/api/gallery", (req, res) => {
    const db = readDB();
    const newImage = {
      id: Date.now().toString(),
      image: req.body.image,
      createdAt: new Date().toISOString()
    };
    db.gallery.push(newImage);
    writeDB(db);
    res.json(newImage);
  });

  app.post("/api/archive", (req, res) => {
    const db = readDB();
    const newImage = {
      id: Date.now().toString(),
      image: req.body.image,
      createdAt: new Date().toISOString()
    };
    db.archive.push(newImage);
    writeDB(db);
    res.json(newImage);
  });

  // Notification API
  app.post("/api/notify", async (req, res) => {
    const { message } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(200).json({ status: "skipped", reason: "config_missing" });
    }

    try {
      const text = encodeURIComponent(message || "She opened the website! ❤️");
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json({ status: data.ok ? "success" : "error" });
    } catch (error) {
      res.status(500).json({ status: "error" });
    }
  });

  // Telegram Polling
  let lastUpdateId = 0;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const allowedChatId = process.env.TELEGRAM_CHAT_ID;

  async function pollTelegram() {
    if (!botToken || !allowedChatId) return;

    try {
      const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.ok && data.result.length > 0) {
        const db = readDB();
        let changed = false;

        for (const update of data.result) {
          lastUpdateId = update.update_id;
          const message = update.message;
          if (message && message.text && message.chat.id.toString() === allowedChatId) {
            db.messages.push({
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              text: message.text,
              author: "Him",
              createdAt: new Date().toISOString()
            });
            changed = true;
          }
        }
        if (changed) writeDB(db);
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
    setTimeout(pollTelegram, 3000);
  }

  if (botToken) pollTelegram();

  // Vite/Static serving
  const distPath = path.resolve(process.cwd(), "dist");
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(distPath);

  if (isProduction) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath);
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

