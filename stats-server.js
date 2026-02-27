import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HITS_FILE = path.join(__dirname, 'hits.txt');
let hits = 0;

// Load hits from file
try {
    if (fs.existsSync(HITS_FILE)) {
        hits = parseInt(fs.readFileSync(HITS_FILE, 'utf8')) || 0;
    }
} catch (e) { console.error("Error loading hits:", e); }

const activeUsers = new Map(); // token -> lastSeen timestamp

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    
    if (url.pathname === '/api/stats') {
        const now = Date.now();
        const token = url.searchParams.get('t');
        const isNew = url.searchParams.get('n') === 'true';

        if (token) {
            activeUsers.set(token, now);
        }

        if (isNew) {
            hits++;
            fs.writeFileSync(HITS_FILE, hits.toString());
        }

        // Cleanup: Remove users inactive for > 40 seconds
        for (const [t, lastSeen] of activeUsers.entries()) {
            if (now - lastSeen > 40000) activeUsers.delete(t);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            hits: hits,
            online: activeUsers.size
        }));
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3002, () => {
    console.log('Stats server running on http://localhost:3002');
});
