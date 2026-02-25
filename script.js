// ==========================================
// 1. CONFIGURATION & DATA
// ==========================================
const ASH_PARTICLE_COUNT = 1000; 

const MY_PROJECTS = [
    {
        name: "Sentry-AI",
        desc: "Autonomous surveillance system tracking anomalies.",
        tech: "Python",
        link: "https://github.com/yourname/sentry"
    },
    {
        name: "Wormhole-P2P",
        desc: "Encrypted peer-to-peer file transfer protocol.",
        tech: "Node.js",
        link: "https://github.com/yourname/wormhole"
    },
    {
        name: "Ghost-Shell",
        desc: "Custom terminal interface for the open web.",
        tech: "HTML/JS",
        link: "https://github.com/yourname/ghost"
    },
    {
        name: "Neural-Hunt",
        desc: "Machine learning algo that hunts for data patterns.",
        tech: "Python",
        link: "https://github.com/yourname/hunt"
    },
    {
        name: "Lazor-Kit",
        desc: "High-performance UI toolkit for cyber decks.",
        tech: "React",
        link: "https://github.com/yourname/lazor"
    },
    {
        name: "Vibe-Coder",
        desc: "AI-assisted development environment.",
        tech: "Rust",
        link: "https://github.com/yourname/vibe"
    }
];

// === 2. RENDER PROJECTS ===
function renderProjects() {
    const listContainer = document.getElementById('repo-list');
    const countLabel = document.getElementById('repo-count');
    const ghostIcon = `<svg class="repo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: #eee;"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 3 7 3 7l1 1 2-1 2 1 2-1 1 1s3-1.6 3-7a8 8 0 0 0-8-8z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>`;

    if (!listContainer) return;
    listContainer.innerHTML = '';

    MY_PROJECTS.forEach(proj => {
        const row = document.createElement('div');
        row.className = 'db-row';
        row.onclick = () => window.open(proj.link, '_blank');

        row.innerHTML = `
            <span class="db-name" style="flex: 1.5;">${ghostIcon} ${proj.name}</span>
            <span class="db-desc" style="flex: 3.5; color: #888; font-size: 11px;">${proj.desc}</span>
        `;

        listContainer.appendChild(row);
    });

    if (countLabel) countLabel.textContent = `${MY_PROJECTS.length} active modules`;
}

// === 3. DRAGGABLE WINDOWS LOGIC ===
const windows = document.querySelectorAll('.window'); 
let zIndexCounter = 100;

windows.forEach(win => {
    const header = win.querySelector('.title-bar');
    if (!header) return; 

    header.addEventListener('mousedown', (e) => {
        zIndexCounter++;
        win.style.zIndex = zIndexCounter;
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;
        function moveAt(pageX, pageY) {
            win.style.left = pageX - shiftX + 'px';
            win.style.top = pageY - shiftY + 'px';
            win.style.position = 'absolute'; 
        }
        function onMouseMove(event) { moveAt(event.pageX, event.pageY); }
        document.addEventListener('mousemove', onMouseMove);
        win.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            win.onmouseup = null;
        };
    });
    header.ondragstart = function() { return false; };
});

// ==========================================
// 4. 3D ASH GENERATOR (HIGH-PERFORMANCE POOL)
// ==========================================
function initAshCanvas() {
    const canvas = document.getElementById('ash-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const count = 800;
    const pool = new Float32Array(count * 3);

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        for (let i = 0; i < count; i++) {
            resetParticle(i);
        }
    }

    function resetParticle(i) {
        const idx = i * 3;
        pool[idx] = (Math.random() - 0.5) * width * 4;     
        pool[idx + 1] = (Math.random() - 0.5) * height * 4; 
        pool[idx + 2] = Math.random() * width;             
    }

    window.addEventListener('resize', resize);
    resize();

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < count; i++) {
            const idx = i * 3;
            pool[idx + 2] -= 1.5; 
            if (pool[idx + 2] <= 0) { resetParticle(i); }
            const z = pool[idx + 2];
            const sx = (pool[idx] / z) * (width/4) + width/2;
            const sy = (pool[idx + 1] / z) * (height/4) + height/2;
            const r = (1 - z / width) * 2;
            ctx.fillStyle = `rgba(255, 230, 200, ${1 - z/width})`;
            ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        }
        requestAnimationFrame(animate);
    }
    animate();
}


// === 5. AUDIO LOGIC ===
const audio = document.getElementById('bg-music');
const notif = document.getElementById('sound-notif');
let hasInteracted = false;

document.addEventListener('click', () => {
    if (hasInteracted) return;
    hasInteracted = true;
    if (audio) {
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
    if (notif) {
        notif.classList.add('show');
        setTimeout(() => { notif.classList.remove('show'); }, 3000);
    }
});

document.addEventListener('visibilitychange', () => {
    if (audio) {
        if (document.hidden) { audio.pause(); } 
        else { if (hasInteracted) audio.play().catch(e => console.log("Resume failed:", e)); }
    }
});

// ==========================================
// 6. PET 1: RUNNER (STABLE VERSION)
// ==========================================
const runnerPet = document.querySelector('.pixel-pet');
let petX = window.innerWidth / 2;
let petY = window.innerHeight / 2;
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

if (runnerPet) {
    runnerPet.style.display = 'block';
    runnerPet.style.left = petX + 'px';
    runnerPet.style.top = petY + 'px';
}

function updateTarget(x, y) {
    targetX = x;
    targetY = y;
}

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        updateTarget(e.clientX, e.clientY);
    });
}

window.addEventListener('click', (e) => {
    updateTarget(e.clientX, e.clientY);
});

function animateRunner() {
    if (!runnerPet) return;
    const easing = 0.01;   
    const maxSpeed = 1.5;  
    const deadzone = 60;   

    const dx = targetX - petX;
    const dy = targetY - petY;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if (distance > deadzone || window.petIsMoving) {
        window.petIsMoving = true;
        let vx = dx * easing;
        let vy = dy * easing;
        const currentSpeed = Math.sqrt(vx*vx + vy*vy);
        if (currentSpeed > maxSpeed) {
            vx = (vx / currentSpeed) * maxSpeed;
            vy = (vy / currentSpeed) * maxSpeed;
        }
        petX += vx;
        petY += vy;
        runnerPet.style.left = (petX - 12) + 'px';
        runnerPet.style.top = (petY - 12) + 'px';
        if (distance < 10) {
            window.petIsMoving = false;
            runnerPet.classList.remove('runner-run');
            runnerPet.classList.add('runner-idle');
        } else {
            runnerPet.classList.remove('runner-idle');
            runnerPet.classList.add('runner-run');
        }
        if (dx < 0) { runnerPet.style.transform = 'scaleX(1)'; } 
        else { runnerPet.style.transform = 'scaleX(-1)'; }
    } else {
        runnerPet.classList.remove('runner-run');
        runnerPet.classList.add('runner-idle');
        runnerPet.style.left = (petX - 12) + 'px';
        runnerPet.style.top = (petY - 12) + 'px';
    }
    requestAnimationFrame(animateRunner);
}
animateRunner();

// ==========================================
// 7. PET 2: SUPERMAN
// ==========================================
const superGhost = document.getElementById('pixel-superman');
const superSprite = document.getElementById('superman-sprite'); 
let superState = 'flying'; 

function superAI() {
    if (!superGhost || !superSprite) return;
    if (superState === 'flying') {
        superSprite.classList.remove('super-sit');
        superSprite.classList.add('super-fly');
        const destX = Math.random() * (window.innerWidth - 50);
        const destY = Math.random() * (window.innerHeight - 200);
        if (Math.random() > 0.7) { landOnWindow(); } 
        else { moveSuperman(destX, destY); setTimeout(superAI, 3000); }
    }
}

function moveSuperman(x, y) {
    if (!superGhost) return;
    const currentX = parseFloat(superGhost.style.left || 0);
    if (x < currentX) { superGhost.style.transform = "scaleX(1) rotate(-10deg)"; } 
    else { superGhost.style.transform = "scaleX(-1) rotate(10deg)"; }
    superGhost.style.left = x + 'px';
    superGhost.style.top = y + 'px';
}

function landOnWindow() {
    const allWins = document.querySelectorAll('.window, .static-window');
    if (allWins.length === 0) { setTimeout(superAI, 1000); return; }
    const targetWin = allWins[Math.floor(Math.random() * allWins.length)];
    const rect = targetWin.getBoundingClientRect();
    const sitX = rect.left + rect.width - 40; 
    const sitY = rect.top - 25; 
    superState = 'sitting';
    moveSuperman(sitX, sitY);
    setTimeout(() => {
        if(!superGhost) return;
        superSprite.classList.remove('super-fly');
        superSprite.classList.add('super-sit');
        superGhost.style.transform = "scaleX(1) rotate(0deg)";
        setTimeout(() => { superState = 'flying'; superAI(); }, 6000);
    }, 3000);
}
setTimeout(superAI, 1000);

// ==========================================
// 9. GRAVITY ENGINE & LAYOUT (OPTIMIZED)
// ==========================================
function autoResizePage() {
    const allFloatingElements = document.querySelectorAll('.window, .static-window, .ticker-frame');
    const spacer = document.getElementById('layout-spacer');
    const sun = document.querySelector('.sun-frame');
    const footer = document.getElementById('site-footer');

    let lowestPixel = 800; 
    allFloatingElements.forEach(el => {
        const bottomEdge = el.offsetTop + el.offsetHeight;
        if (bottomEdge > lowestPixel) { lowestPixel = bottomEdge; }
    });

    const sunStartPosition = lowestPixel + 50;
    if (sun) { sun.style.top = sunStartPosition + 'px'; }
    const footerPosition = sunStartPosition + 700; 
    if (footer) { footer.style.top = footerPosition + 'px'; }
    if (spacer) { spacer.style.top = (footerPosition + 100) + 'px'; }
}

// Use ResizeObserver instead of polling for better performance
const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(autoResizePage);
});

// Observe the body and specific floating containers
resizeObserver.observe(document.body);
document.querySelectorAll('.window, .static-window').forEach(el => resizeObserver.observe(el));

window.addEventListener('load', autoResizePage);
window.addEventListener('resize', autoResizePage); 

// === 10. VISITOR COUNTER & LIVE STATS ===
const SITE_START_TIME = Date.now();
function initStats() {
    const updatedEl = document.getElementById('last-updated');

    // Stats (Visitors/Online) are handled automatically by Tinylytics classes in index.html.
    // No manual fetch needed here to prevent conflicts.

    if (updatedEl) {
        const today = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        updatedEl.textContent = `${months[today.getMonth()]} ${String(today.getDate()).padStart(2, '0')}`;
    }
}

// === 11. AMBIENT PARALLAX ===
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    const traces = document.querySelector('.bg-traces');
    if (traces) { traces.style.transform = `translate(${moveX}px, ${moveY}px)`; }
});

// === 12. ROTATING STATUS ===
const ACTIVITIES = ['vibecoding', 'debugging', 'dreaming', 'building', 'learning', 'iterating'];
const MOODS = ['chaotic good', 'focused', 'curious', 'determined', 'caffeinated'];
let activityIndex = 0;
let moodIndex = 0;

function rotateStatus() {
    const activityEl = document.getElementById('current-activity');
    const moodEl = document.getElementById('current-mood');
    if (activityEl) {
        activityIndex = (activityIndex + 1) % ACTIVITIES.length;
        activityEl.style.opacity = '0';
        setTimeout(() => { activityEl.textContent = ACTIVITIES[activityIndex]; activityEl.style.opacity = '1'; }, 300);
    }
    if (moodEl && Math.random() > 0.5) {
        moodIndex = (moodIndex + 1) % MOODS.length;
        moodEl.style.opacity = '0';
        setTimeout(() => { moodEl.textContent = MOODS[moodIndex]; moodEl.style.opacity = '1'; }, 300);
    }
}

function initBlogHandlers() {
    const entries = document.querySelectorAll('.blog-entry');
    entries.forEach(entry => {
        entry.addEventListener('click', () => {
            const title = entry.querySelector('.blog-title').textContent;
            console.log(`Opening blog: ${title}`);
        });
    });
}

// === 13. REAL-TIME SYSTEM MONITOR ===
function updateSystemMonitor() {
    const uptimeEl = document.getElementById('sys-uptime');
    const latencyEl = document.getElementById('sys-latency');
    const memoryEl = document.getElementById('sys-memory');
    if (uptimeEl) {
        const diff = Math.floor((Date.now() - SITE_START_TIME) / 1000);
        const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
        const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const secs = String(diff % 60).padStart(2, '0');
        uptimeEl.textContent = `${hours}:${mins}:${secs}`;
    }
    if (latencyEl) {
        const start = performance.now();
        fetch(window.location.href, { method: 'HEAD', cache: 'no-cache' })
            .then(() => {
                const end = performance.now();
                latencyEl.textContent = `${Math.round(end - start)}ms`;
            })
            .catch(() => { latencyEl.textContent = 'err'; });
    }
    if (memoryEl && window.performance && window.performance.memory) {
        const usedMem = Math.round(window.performance.memory.usedJSHeapSize / 1048576);
        memoryEl.textContent = `${usedMem}MB`;
    }
}

// === 13.5 SPOTIFY INTEGRATION ===
const SPOTIFY_CONFIG = {
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    refreshToken: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN
};

let spotifyAccessToken = '';

async function getSpotifyAccessToken() {
    if (!SPOTIFY_CONFIG.clientId || !SPOTIFY_CONFIG.refreshToken) return null;

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(SPOTIFY_CONFIG.clientId + ':' + SPOTIFY_CONFIG.clientSecret)
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: SPOTIFY_CONFIG.refreshToken
            })
        });

        const data = await response.json();
        spotifyAccessToken = data.access_token;
        return spotifyAccessToken;
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        return null;
    }
}

async function fetchSpotifyData() {
    if (!SPOTIFY_CONFIG.clientId) return;
    if (!spotifyAccessToken) await getSpotifyAccessToken();

    try {
        // Try currently playing first
        let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 'Authorization': 'Bearer ' + spotifyAccessToken }
        });

        if (response.status === 204 || response.status > 400) {
            // Nothing playing, get recently played
            response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                headers: { 'Authorization': 'Bearer ' + spotifyAccessToken }
            });
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                updateSpotifyUI(data.items[0].track, false, data.items[0].played_at);
            }
        } else {
            const data = await response.json();
            updateSpotifyUI(data.item, true, null, data.progress_ms);
        }
    } catch (error) {
        if (error.status === 401) {
            await getSpotifyAccessToken();
            fetchSpotifyData();
        }
        console.error('Error fetching Spotify data:', error);
    }
}

function updateSpotifyUI(track, isPlaying, playedAt, progressMs) {
    const artEl = document.getElementById('spotify-art');
    const nameEl = document.getElementById('spotify-name');
    const artistEl = document.getElementById('spotify-artist');
    const statusEl = document.getElementById('spotify-status');
    const timeEl = document.getElementById('spotify-time');
    const progressEl = document.getElementById('music-progress');

    if (!track) return;

    if (artEl) artEl.style.backgroundImage = `url(${track.album.images[0].url})`;
    if (nameEl) nameEl.textContent = track.name;
    if (artistEl) artistEl.textContent = track.artists.map(a => a.name).join(', ');
    
    if (statusEl) {
        statusEl.textContent = isPlaying ? 'Currently Playing' : 'Last Played';
        statusEl.style.color = isPlaying ? '#1DB954' : '#888';
    }

    if (timeEl) {
        if (isPlaying) {
            timeEl.textContent = 'Playing now on Spotify';
        } else if (playedAt) {
            timeEl.textContent = formatRelativeTime(new Date(playedAt));
        }
    }

    if (progressEl) {
        if (isPlaying && progressMs && track.duration_ms) {
            const pct = (progressMs / track.duration_ms) * 100;
            progressEl.style.width = pct + '%';
        } else {
            progressEl.style.width = '0%';
        }
    }
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
}

// Update Spotify data every 30 seconds
setInterval(fetchSpotifyData, 30000);
fetchSpotifyData();

// === 14. POWER TOGGLE LOGIC (SIGN) ===
function initPowerToggle() {
    const socket = document.getElementById('power-socket');
    const signWrapper = document.querySelector('.sign-wrapper');
    if (socket && signWrapper) {
        socket.addEventListener('click', () => {
            signWrapper.classList.toggle('power-cut');
        });
    }
}

// === 15. ECLIPSE TOGGLE (SUN) ===
function initEclipseToggle() {
    const theSun = document.querySelector('.the-sun');
    if (theSun) {
        theSun.addEventListener('click', () => {
            document.body.classList.toggle('eclipse-active');
            const notif = document.getElementById('sound-notif');
            if (notif) {
                const isActive = document.body.classList.contains('eclipse-active');
                notif.textContent = isActive ? 'ENVIRONMENT: DARK' : 'ENVIRONMENT: NORMAL';
                notif.classList.add('show');
                setTimeout(() => notif.classList.remove('show'), 3000);
            }
        });
    }
}

// ==========================================
// 16. STEALTH BOT PROTECTION (Anti-Headless)
// ==========================================
// This script prevents bots/headless browsers (like snapshots) from loading the site.
(function() {
    const isBot = navigator.webdriver || 
                  !navigator.languages || 
                  navigator.languages.length === 0 ||
                  /headless|bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

    if (isBot) {
        // If a bot is detected, we wipe the content immediately
        document.documentElement.innerHTML = '<html><body style="background:#000;color:#f00;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh;">[SYSTEM ERROR: AUTOMATED ACCESS DETECTED - CONNECTION TERMINATED]</body></html>';
        window.stop(); // Stop any further loading
        throw new Error("Bot detected - process killed");
    }

    // Additional check: Many snapshot bots have specific window properties or zero screen size
    if (window.innerWidth === 0 || window.innerHeight === 0) {
        document.body.innerHTML = "";
    }
})();

// === INIT ===
renderProjects();
initAshCanvas();
animateRunner();
initStats();
initBlogHandlers();
initPowerToggle();
initEclipseToggle();

setInterval(rotateStatus, 8000);
setInterval(updateSystemMonitor, 2000);
updateSystemMonitor();
