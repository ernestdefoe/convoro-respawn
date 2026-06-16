// Convoro theme — Respawn.
// A gaming / esports look: deep navy-black, neon cyan + magenta, sharp (zero-
// radius) corners, JetBrains Mono UI type, subtle scanlines and neon glow.
// Restyles the whole forum by remapping Convoro's --c-* design tokens, then
// layers the signature effects. Ships as plain JS (no build) — injected before
// the app mounts. Light/dark follow Convoro's theme toggle (no extra switcher).
(function () {
  'use strict';

  // JetBrains Mono for the UI chrome (the gaming-terminal vibe). display=swap so
  // text paints immediately in the fallback and swaps when the font loads.
  if (!document.getElementById('respawn-font')) {
    var l = document.createElement('link');
    l.id = 'respawn-font';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap';
    document.head.appendChild(l);
  }

  var CSS = [
    // ---- Palette + shared knobs -----------------------------------------
    ":root{",
    "  --r-c1:#2af0ff;--r-c2:#ff3da8;",
    "  --c-grad:linear-gradient(120deg,var(--r-c1) 0%,var(--r-c2) 100%);",
    "  --c-radius:0px;--c-radius-btn:0px;",
    "  --c-font:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;",
    "}",
    // Light ("daylight") — blue accent, off-white surfaces.
    ":root,:root[data-theme='light']{",
    "  --r-c1:#0089ff;--r-c2:#d6168a;",
    "  --c-bg:243 245 249;--c-surface:255 255 255;--c-surface-2:238 241 246;--c-border:214 222 234;",
    "  --c-text:12 20 34;--c-text-2:90 107 133;--c-muted:128 144 168;",
    "  --c-primary:0 137 255;--c-primary-600:0 120 224;--c-primary-700:0 102 190;--c-accent:214 22 138;--c-link:0 137 255;",
    "  --c-header-bg:rgb(255 255 255);--c-header-text:12 20 34;--r-scan:rgba(0,20,60,.05);--r-glow:.20;--r-grid:.06;",
    "}",
    // Dark (default for a gaming theme) — neon cyan on near-black.
    ":root[data-theme='dark']{",
    "  --r-c1:#2af0ff;--r-c2:#ff3da8;",
    "  --c-bg:11 15 20;--c-surface:19 25 35;--c-surface-2:26 34 48;--c-border:36 48 67;",
    "  --c-text:229 237 247;--c-text-2:142 160 187;--c-muted:120 134 160;",
    "  --c-primary:42 240 255;--c-primary-600:18 196 214;--c-primary-700:12 150 168;--c-accent:255 61 168;--c-link:42 240 255;",
    "  --c-header-bg:rgb(16 24 36);--c-header-text:229 237 247;--r-scan:rgba(255,255,255,.04);--r-glow:.6;--r-grid:.13;",
    "}",
    // ---- Animated neon backdrop (painted behind transparent app layers) --
    // html = solid base colour (never a blank frame). The glows + grid live on
    // fixed, negative-z pseudo-elements so the whole forum floats over them.
    "html{background:rgb(var(--c-bg))!important;}",
    "body,#app{background:transparent!important;}",
    ".bg-appbg{background:transparent!important;}",
    // Drifting neon glows (two corners), GPU-friendly transform animation.
    "html::before{content:'';position:fixed;inset:-20%;z-index:-2;pointer-events:none;background:radial-gradient(42% 52% at 85% 14%,rgb(var(--c-primary) / var(--r-glow,.5)),transparent 70%),radial-gradient(46% 56% at 12% 92%,rgb(var(--c-accent) / calc(var(--r-glow,.5) * .9)),transparent 70%);animation:rsp-drift 22s ease-in-out infinite alternate;}",
    "@keyframes rsp-drift{from{transform:translate3d(-2%,-1%,0) scale(1);}to{transform:translate3d(3%,2%,0) scale(1.12);}}",
    // Synthwave grid that slowly scrolls upward, faded at top/bottom.
    "body::before{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(rgb(var(--c-primary) / var(--r-grid,.1)) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--c-primary) / var(--r-grid,.1)) 1px,transparent 1px);background-size:44px 44px,44px 44px;-webkit-mask-image:linear-gradient(180deg,transparent,#000 28%,#000 72%,transparent);mask-image:linear-gradient(180deg,transparent,#000 28%,#000 72%,transparent);animation:rsp-grid 6s linear infinite;}",
    "@keyframes rsp-grid{from{background-position:0 0,0 0;}to{background-position:0 -44px,0 -44px;}}",
    // Faint CRT scanlines over everything (never blocks clicks).
    "body::after{content:'';position:fixed;inset:0;z-index:2147483000;pointer-events:none;background:repeating-linear-gradient(180deg,transparent 0 2px,var(--r-scan) 2px 3px);opacity:.6;}",
    // ---- Sharp corners (the angular gaming signature) -------------------
    ".rounded,.rounded-md,.rounded-lg,.rounded-xl,.rounded-2xl,.rounded-3xl,.rounded-c{border-radius:0!important;}",
    // ---- Mono UI, but keep post bodies readable in sans -----------------
    ".prose-q,.prose-q *{font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif!important;}",
    // ---- Neon primary buttons + glow ------------------------------------
    ".bg-primary{background-image:var(--c-grad)!important;background-color:transparent!important;box-shadow:0 0 0 1px rgb(var(--c-primary)),0 0 24px -8px rgb(var(--c-primary));border:0;}",
    ":root[data-theme='dark'] .bg-primary{color:#061319!important;}",
    ".bg-primary:hover{box-shadow:0 0 0 1px rgb(var(--c-primary)),0 0 28px -4px rgb(var(--c-primary));transform:translateY(-1px);}",
    // Cards/surfaces: solid with a sharp neon edge on hover for interactive ones.
    "a .bg-surface:hover,button .bg-surface:hover{border-color:rgb(var(--c-primary))!important;box-shadow:0 0 0 1px rgb(var(--c-primary) / .25),0 0 26px -10px rgb(var(--c-primary));}",
    // Headings get a faint cyan glow; links/usernames are neon.
    "h1,h2,h3{text-shadow:0 0 18px rgb(var(--c-primary) / .22);letter-spacing:-0.01em;}",
    "a.text-primary,.text-primary{text-shadow:0 0 10px rgb(var(--c-primary) / .25);}",
    // Scrollbar + selection.
    "::-webkit-scrollbar{width:10px;height:10px;}::-webkit-scrollbar-track{background:rgb(var(--c-surface));}::-webkit-scrollbar-thumb{background:var(--c-grad);border:2px solid rgb(var(--c-bg));}",
    "::selection{background:rgb(var(--c-primary) / .35);color:rgb(var(--c-text));}",
    "@media (prefers-reduced-motion: reduce){body::after{opacity:.35;}}",
  ].join('\n');

  if (!document.getElementById('convoro-respawn-css')) {
    var st = document.createElement('style');
    st.id = 'convoro-respawn-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
})();
