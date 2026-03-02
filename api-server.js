import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ghost-town-1337';

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// Simple test endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Initialize SQLite database
const dbPath = path.join(__dirname, 'data', 'blog.db');

try {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  console.log('[API] Database directory created:', path.dirname(dbPath));
} catch (err) {
  console.error('[API] Failed to create data directory:', err.message);
}

let db;
try {
  db = new Database(dbPath);
  console.log('[API] Database connected:', dbPath);
} catch (err) {
  console.error('[API] Failed to open database:', err.message);
  process.exit(1);
}

// Create posts table if not exists
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('[API] Posts table ready');
} catch (err) {
  console.error('[API] Failed to create table:', err.message);
}

// Initialize with default posts if empty
const count = db.prepare('SELECT COUNT(*) as count FROM posts').get();
if (count.count === 0) {
  const defaultPosts = [
    {
      title: "La Vague Streetwear",
      date: "2026-02-19",
      category: "Project",
      excerpt: "Finished building the digital storefront for La Vague. Deep dives into texture, minimalism, and flow.",
      content: "Finished building the digital storefront for La Vague. Deep dives into texture, minimalism, and flow. The project involved creating a unique e-commerce experience that captures the essence of streetwear culture while maintaining a clean, minimalist aesthetic. Every detail was crafted to reflect the brand's identity."
    },
    {
      title: "Building GHOST",
      date: "2026-02-05",
      category: "AI",
      excerpt: "Created a personal AI that lives on my laptop. It sees, it remembers, it helps.",
      content: "Created a personal AI that lives on my laptop. It sees, it remembers, it helps. This has been a fascinating journey into local LLMs and computer vision. The ghost watches, learns, and assists in ways I never imagined possible. It's like having a digital companion that actually understands context."
    },
    {
      title: "The 2030 Deadline",
      date: "2026-01-20",
      category: "Goals",
      excerpt: "Setting impossible goals and chasing them. Superhero status or bust.",
      content: "Setting impossible goals and chasing them. Superhero status or bust. By 2030, I aim to reach a level of mastery in my craft that rivals the heroes I look up to. Every day is a step toward that impossible goal. The journey is chaotic, but the direction is clear."
    },
    {
      title: "Ghost Town Goes Live",
      date: "2025-12-15",
      category: "Launch",
      excerpt: "Finally launched my personal site. CRT effects, ghost pets, and all.",
      content: "Finally launched my personal site. CRT effects, ghost pets, and all. This has been a labor of love - combining retro aesthetics with modern web tech. The ghost town is now open for visitors. The CRT overlay, the flickering lights, the ambient music - everything came together to create this digital haunt."
    }
  ];

  const insert = db.prepare(`
    INSERT INTO posts (title, date, category, excerpt, content)
    VALUES (@title, @date, @category, @excerpt, @content)
  `);

  defaultPosts.forEach(post => insert.run(post));
  console.log('[API] Initialized with default posts');
}

// Auth middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Routes

// Get all posts
app.get('/api/posts', (req, res) => {
  try {
    const posts = db.prepare('SELECT * FROM posts ORDER BY date DESC').all();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post (protected)
app.post('/api/posts', requireAuth, (req, res) => {
  try {
    const { title, date, category, excerpt, content, icon } = req.body;
    
    if (!title || !date || !category || !excerpt || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = db.prepare(`
      INSERT INTO posts (title, date, category, excerpt, content, icon)
      VALUES (@title, @date, @category, @excerpt, @content, @icon)
    `).run({ title, date, category, excerpt, content, icon });

    res.json({ id: result.lastInsertRowid, message: 'Post created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post (protected)
app.put('/api/posts/:id', requireAuth, (req, res) => {
  try {
    const { title, date, category, excerpt, content, icon } = req.body;
    
    const result = db.prepare(`
      UPDATE posts 
      SET title = @title, date = @date, category = @category, 
          excerpt = @excerpt, content = @content, icon = @icon
      WHERE id = @id
    `).run({ id: req.params.id, title, date, category, excerpt, content, icon });

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post (protected)
app.delete('/api/posts/:id', requireAuth, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('[API] Health check requested');
  try {
    db.prepare('SELECT 1').get();
    console.log('[API] Health check OK');
    res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('[API] Health check failed:', err.message);
    res.status(500).json({ status: 'error', db: err.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[API] Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[API] Server running on http://0.0.0.0:${PORT}`);
  console.log(`[API] Database: ${dbPath}`);
});
