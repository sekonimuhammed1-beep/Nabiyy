import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#020817",
  navy: "#0a1628",
  navyLight: "#0d1f3c",
  cyan: "#00d4ff",
  cyanDim: "#00a8cc",
  emerald: "#00e676",
  emeraldDim: "#00b85c",
  gold: "#ffd700",
  white: "#f0f4ff",
  muted: "#7a8aaa",
  card: "rgba(13,31,60,0.7)",
  border: "rgba(0,212,255,0.15)",
};

const NAV_LINKS = ["Home", "Markets", "Buy Crypto", "Sell Crypto", "Merchants", "About Us", "Contact"];

const STATS = [
  { value: "$2.5B+", label: "Trading Volume" },
  { value: "200K+", label: "Active Traders" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries Supported" },
];

const FEATURES = [
  { icon: "🔒", title: "Secure Escrow Protection", desc: "All trades are protected by our multi-sig escrow system, ensuring funds are only released when both parties confirm." },
  { icon: "⚡", title: "Instant Transactions", desc: "Lightning-fast settlement with our optimized blockchain infrastructure. Trade in seconds, not minutes." },
  { icon: "✅", title: "Verified Merchants", desc: "All merchants undergo strict KYC/AML verification. Trade with confidence knowing every partner is vetted." },
  { icon: "💎", title: "Low Trading Fees", desc: "Industry-leading fees starting at 0.1%. More of your money stays where it belongs — in your portfolio." },
  { icon: "🌐", title: "Multi-Currency Support", desc: "Trade BTC, ETH, USDT, XRP, SOL, BNB and 50+ digital assets seamlessly across 150+ countries." },
  { icon: "🎯", title: "24/7 Customer Support", desc: "Expert support team available around the clock via live chat, email, and phone. Never trade alone." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create an Account", desc: "Sign up in minutes with email verification and complete KYC for full access to all trading features." },
  { step: "02", title: "Choose Buy or Sell", desc: "Browse live offers or post your own trade. Set your preferred price, currency, and payment method." },
  { step: "03", title: "Select a Merchant", desc: "Filter verified merchants by rating, volume, and location. Chat directly before committing to a trade." },
  { step: "04", title: "Complete Trade Securely", desc: "Our escrow holds funds safely. Confirm receipt and funds release automatically — fast and trustless." },
];

const COINS = [
  { symbol: "BTC", name: "Bitcoin", price: 67842.50, change: 2.34, cap: "1.33T", color: "#f7931a", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: 3521.18, change: -1.12, cap: "423.8B", color: "#627eea", icon: "Ξ" },
  { symbol: "USDT", name: "Tether", price: 1.00, change: 0.01, cap: "114.2B", color: "#26a17b", icon: "₮" },
  { symbol: "XRP", name: "XRP", price: 0.6234, change: 4.21, cap: "35.1B", color: "#00aae4", icon: "✕" },
  { symbol: "SOL", name: "Solana", price: 178.92, change: 5.67, cap: "83.4B", color: "#9945ff", icon: "◎" },
  { symbol: "BNB", name: "BNB", price: 412.33, change: -0.88, cap: "61.7B", color: "#f3ba2f", icon: "◆" },
];

const WHY_US = [
  { icon: "🛡️", title: "Advanced Security", desc: "Military-grade encryption, 2FA, cold storage, and real-time fraud detection protect every trade." },
  { icon: "🚀", title: "Fast Transactions", desc: "Sub-second matching engine processes thousands of trades per second with zero downtime." },
  { icon: "🌍", title: "Global Accessibility", desc: "Available in 150+ countries with 40+ fiat currencies and local payment method support." },
  { icon: "🤝", title: "Professional Support", desc: "Dedicated account managers and 24/7 multilingual support team at your service." },
  { icon: "🏆", title: "Trusted Environment", desc: "Regulated, audited, and trusted by 200,000+ traders globally since 2019." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", location: "United Kingdom", rating: 5, text: "APTITUDE has transformed how I trade crypto. The escrow system gives me complete peace of mind. I've done over 300 trades with zero issues!", avatar: "SM" },
  { name: "David K.", location: "Nigeria", rating: 5, text: "Best P2P platform in Africa. Local payment methods, instant settlement, and excellent customer support. Highly recommended!", avatar: "DK" },
  { name: "Wei L.", location: "Singapore", rating: 5, text: "The verified merchant system is brilliant. I always know I'm trading with trusted counterparties. UI is clean and professional.", avatar: "WL" },
  { name: "Carlos R.", location: "Brazil", rating: 5, text: "Switched from Binance P2P and never looked back. Better rates, faster trades, and the support team actually responds!", avatar: "CR" },
  { name: "Aisha T.", location: "UAE", rating: 5, text: "As a high-volume trader, reliability is everything. APTITUDE's 99.9% uptime and deep liquidity make it my go-to platform.", avatar: "AT" },
  { name: "James O.", location: "Canada", rating: 5, text: "Incredible platform. The multi-currency support and low fees make it perfect for arbitrage trading across markets.", avatar: "JO" },
];

const FAQS = [
  { q: "How does APTITUDE keep my funds secure?", a: "We use a multi-signature escrow system where funds are locked until both parties confirm the trade. Combined with 2FA, cold storage, and real-time fraud monitoring, your assets are always protected." },
  { q: "What is P2P trading and how does it work?", a: "P2P (Peer-to-Peer) trading connects buyers and sellers directly. You choose a verified merchant, agree on price and payment method, and our escrow secures the crypto until payment is confirmed." },
  { q: "How do merchants get verified?", a: "All merchants complete a rigorous KYC/AML process including identity verification, address proof, and trade history analysis. Only merchants meeting our standards receive the Verified badge." },
  { q: "What are the trading fees?", a: "We charge a transparent 0.1–0.5% fee per completed trade depending on your volume tier. There are no hidden fees, and we publish our full fee schedule on the pricing page." },
  { q: "How quickly can I withdraw funds?", a: "Crypto withdrawals process within 1–3 blockchain confirmations (typically under 10 minutes). Fiat withdrawals via bank transfer take 1–2 business days depending on your region." },
  { q: "Which cryptocurrencies are supported?", a: "We support Bitcoin (BTC), Ethereum (ETH), USDT, XRP, Solana (SOL), BNB, and 50+ other digital assets. New tokens are added regularly based on community demand." },
];

// Particle/Network animation component
function NetworkBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#00d4ff" : "#00e676",
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />;
}

// Glowing ticker
function PriceTicker() {
  const [prices, setPrices] = useState(COINS.map(c => ({ ...c })));
  useEffect(() => {
    const id = setInterval(() => {
      setPrices(prev => prev.map(c => ({
        ...c,
        price: c.price * (1 + (Math.random() - 0.5) * 0.001),
        change: c.change + (Math.random() - 0.5) * 0.05,
      })));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ overflow: "hidden", background: "rgba(0,212,255,0.05)", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "10px 0" }}>
      <div style={{ display: "flex", gap: 48, animation: "ticker 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {[...prices, ...prices].map((c, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.white }}>
            <span style={{ color: c.color, fontWeight: 700 }}>{c.icon} {c.symbol}</span>
            <span>${c.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span style={{ color: c.change >= 0 ? COLORS.emerald : "#ff4d6d" }}>
              {c.change >= 0 ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [liveCoins, setLiveCoins] = useState(COINS.map(c => ({ ...c })));
  useEffect(() => {
    const id = setInterval(() => {
      setLiveCoins(prev => prev.map(c => ({
        ...c,
        price: c.price * (1 + (Math.random() - 0.5) * 0.002),
        change: +(c.change + (Math.random() - 0.5) * 0.08).toFixed(2),
      })));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const glowBtn = {
    primary: {
      background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`,
      color: "#000",
      fontWeight: 800,
      padding: "14px 32px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontSize: 15,
      letterSpacing: 0.5,
      boxShadow: `0 0 24px rgba(0,212,255,0.4)`,
      transition: "all 0.3s",
    },
    outline: {
      background: "transparent",
      color: COLORS.cyan,
      fontWeight: 700,
      padding: "13px 32px",
      borderRadius: 8,
      border: `1.5px solid ${COLORS.cyan}`,
      cursor: "pointer",
      fontSize: 15,
      letterSpacing: 0.5,
      boxShadow: `0 0 16px rgba(0,212,255,0.15)`,
      transition: "all 0.3s",
    }
  };

  return (
    <div style={{ fontFamily: "'Syne', 'Exo 2', sans-serif", background: COLORS.bg, color: COLORS.white, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Exo+2:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.cyan}; border-radius: 3px; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-4deg); } }
        @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 20px rgba(0,212,255,0.3); } 50% { box-shadow: 0 0 40px rgba(0,212,255,0.7); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes borderGlow { 0%,100% { border-color: rgba(0,212,255,0.3); } 50% { border-color: rgba(0,212,255,0.7); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .nav-link { color: ${COLORS.muted}; text-decoration:none; font-size:14px; font-weight:600; letter-spacing:0.5px; transition:color 0.2s; position:relative; }
        .nav-link:hover { color: ${COLORS.cyan}; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:${COLORS.cyan}; transition:width 0.3s; }
        .nav-link:hover::after { width:100%; }
        .feature-card:hover { transform:translateY(-6px); border-color:rgba(0,212,255,0.5) !important; box-shadow:0 20px 40px rgba(0,212,255,0.1) !important; }
        .feature-card { transition: all 0.35s ease; }
        .stat-card:hover { transform:scale(1.04); }
        .stat-card { transition: transform 0.3s; }
        .coin-row:hover { background: rgba(0,212,255,0.07) !important; }
        .coin-row { transition: background 0.2s; }
        .faq-item { transition: all 0.3s; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(0,212,255,0.6) !important; }
        .btn-outline:hover { background:rgba(0,212,255,0.1) !important; transform:translateY(-2px); }
        .testimonial-card:hover { transform:translateY(-4px); border-color:rgba(0,212,255,0.4) !important; }
        .testimonial-card { transition: all 0.3s; }
        .step-card:hover .step-num { box-shadow: 0 0 30px rgba(0,212,255,0.6) !important; }
        .why-card:hover { background:rgba(0,212,255,0.08) !important; border-color:rgba(0,212,255,0.4) !important; }
        .why-card { transition: all 0.3s; }
        @media (max-width:768px) {
          .hero-headline { font-size:2.2rem !important; }
          .hero-sub { font-size:1rem !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .features-grid { grid-template-columns:1fr !important; }
          .how-grid { grid-template-columns:1fr 1fr !important; }
          .why-grid { grid-template-columns:1fr 1fr !important; }
          .testi-grid { grid-template-columns:1fr !important; }
          .section-pad { padding:60px 20px !important; }
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
          .hero-btns { flex-direction:column !important; }
          .footer-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media (min-width:769px) {
          .mobile-menu-btn { display:none !important; }
          .mobile-nav { display:none !important; }
        }
        .floating-coin { animation: float1 6s ease-in-out infinite; }
        .floating-coin-2 { animation: float2 8s ease-in-out infinite; }
        .glow-border { animation: borderGlow 3s ease-in-out infinite; }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(2,8,23,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.4s",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#000", boxShadow: `0 0 20px rgba(0,212,255,0.4)` }}>A</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 1, color: COLORS.white, lineHeight: 1.1 }}>APTITUDE</div>
              <div style={{ fontSize: 9, color: COLORS.cyan, letterSpacing: 2, fontWeight: 600 }}>TRADING TECH</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="nav-link">{l}</a>)}
          </div>

          {/* Auth Buttons */}
          <div className="desktop-nav" style={{ display: "flex", gap: 12 }}>
            <button className="btn-outline" style={glowBtn.outline}>Login</button>
            <button className="btn-primary" style={glowBtn.primary}>Sign Up</button>
          </div>

          {/* Mobile Menu */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: `1.5px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: COLORS.cyan, fontSize: 20 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-nav" style={{ background: "rgba(2,8,23,0.98)", backdropFilter: "blur(20px)", borderTop: `1px solid ${COLORS.border}`, padding: "20px 5%" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "12px 0", color: COLORS.muted, textDecoration: "none", fontSize: 15, fontWeight: 600, borderBottom: `1px solid ${COLORS.border}` }}>
                {l}
              </a>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button style={{ ...glowBtn.outline, flex: 1 }}>Login</button>
              <button style={{ ...glowBtn.primary, flex: 1 }}>Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 80 }}>
        {/* Animated BG */}
        <NetworkBg />

        {/* Radial glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "60%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,230,118,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Floating coins */}
        {[
          { icon: "₿", color: "#f7931a", top: "20%", left: "8%", size: 60 },
          { icon: "Ξ", color: "#627eea", top: "60%", left: "5%", size: 50 },
          { icon: "◎", color: "#9945ff", top: "25%", right: "8%", size: 56 },
          { icon: "◆", color: "#f3ba2f", top: "65%", right: "6%", size: 48 },
        ].map((c, i) => (
          <div key={i} className={i % 2 === 0 ? "floating-coin" : "floating-coin-2"}
            style={{ position: "absolute", top: c.top, left: c.left, right: c.right, width: c.size, height: c.size, borderRadius: "50%", background: `rgba(${c.color.replace(/#/, '').match(/../g).map(h => parseInt(h, 16)).join(',')}, 0.15)`, border: `1.5px solid ${c.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: c.size * 0.45, color: c.color, backdropFilter: "blur(8px)" }}>
            {c.icon}
          </div>
        ))}

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 860, padding: "0 24px" }}>
          <div style={{ display: "inline-block", background: "rgba(0,212,255,0.1)", border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "6px 18px", marginBottom: 24, fontSize: 12, color: COLORS.cyan, fontWeight: 600, letterSpacing: 2 }}>
            🚀 TRUSTED BY 200,000+ TRADERS WORLDWIDE
          </div>

          <h1 className="hero-headline fade-up" style={{ fontSize: "3.8rem", fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>
            Trade Crypto{" "}
            <span style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Securely,
            </span>
            <br />Anytime, Anywhere
          </h1>

          <p className="hero-sub fade-up" style={{ fontSize: "1.15rem", color: COLORS.muted, lineHeight: 1.8, marginBottom: 40, maxWidth: 680, margin: "0 auto 40px", fontFamily: "'Exo 2', sans-serif", fontWeight: 400 }}>
            APTITUDE Enterprises Trading Tech provides a secure peer-to-peer marketplace for buying and selling Bitcoin, Ethereum, USDT, and other digital assets with verified merchants worldwide.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ ...glowBtn.primary, fontSize: 16, padding: "16px 40px" }}>🚀 Start Trading</button>
            <button className="btn-outline" style={{ ...glowBtn.outline, fontSize: 16, padding: "15px 40px" }}>Create Account →</button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
            {["🔒 SSL Secured", "✅ KYC Verified", "⚡ Instant Settlement", "🌍 150+ Countries"].map(b => (
              <span key={b} style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600, letterSpacing: 0.5 }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(transparent, ${COLORS.bg})` }} />
      </section>

      {/* ─── TICKER ─── */}
      <PriceTicker />

      {/* ─── STATS ─── */}
      <section style={{ padding: "80px 5%", background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.navy} 100%)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-card" style={{ textAlign: "center", padding: "36px 24px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, backdropFilter: "blur(20px)" }}>
                <div style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'Syne', sans-serif", background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
                <div style={{ color: COLORS.muted, fontSize: 14, fontWeight: 500, marginTop: 8, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="section-pad" style={{ padding: "100px 5%", background: COLORS.navy }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: COLORS.cyan, fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>PLATFORM FEATURES</div>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>
              Everything You Need to{" "}
              <span style={{ color: COLORS.cyan }}>Trade Smarter</span>
            </h2>
            <p style={{ color: COLORS.muted, marginTop: 16, maxWidth: 540, margin: "16px auto 0", fontFamily: "'Exo 2', sans-serif" }}>
              Built from the ground up for serious traders who demand security, speed, and reliability.
            </p>
          </div>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{ padding: "32px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, backdropFilter: "blur(20px)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(0,212,255,0.1)", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>{f.title}</h3>
                <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, fontFamily: "'Exo 2', sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="section-pad" style={{ padding: "100px 5%", background: COLORS.bg, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: COLORS.emerald, fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>Start Trading in{" "}
              <span style={{ color: COLORS.emerald }}>4 Simple Steps</span>
            </h2>
          </div>

          <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="step-card" style={{ textAlign: "center", padding: "36px 24px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, backdropFilter: "blur(20px)", position: "relative" }}>
                {i < 3 && (
                  <div style={{ position: "absolute", top: "48px", right: -20, width: 40, color: COLORS.border, fontSize: 20, zIndex: 1 }}>→</div>
                )}
                <div className="step-num" style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.cyan}22, ${COLORS.emerald}22)`, border: `2px solid ${COLORS.cyan}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "1.3rem", fontWeight: 800, color: COLORS.cyan, boxShadow: `0 0 20px rgba(0,212,255,0.3)`, transition: "box-shadow 0.3s", fontFamily: "'Syne', sans-serif" }}>{s.step}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, fontFamily: "'Exo 2', sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE MARKETS ─── */}
      <section id="markets" className="section-pad" style={{ padding: "100px 5%", background: COLORS.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ color: COLORS.cyan, fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 8 }}>LIVE MARKETS</div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>Real-Time{" "}
                <span style={{ color: COLORS.cyan }}>Crypto Prices</span>
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.emerald, fontSize: 13, fontWeight: 600 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.emerald, animation: "glow-pulse 2s infinite" }} />
              LIVE UPDATES
            </div>
          </div>

          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, backdropFilter: "blur(20px)", overflow: "hidden" }}>
            {/* Table Header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 1fr", padding: "14px 28px", background: "rgba(0,212,255,0.05)", borderBottom: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.muted, fontWeight: 700, letterSpacing: 1.5 }}>
              <span>ASSET</span><span>PRICE</span><span>24H CHANGE</span><span>MARKET CAP</span><span>ACTION</span>
            </div>

            {liveCoins.map((c, i) => (
              <div key={i} className="coin-row" style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 1fr", padding: "18px 28px", borderBottom: i < liveCoins.length - 1 ? `1px solid ${COLORS.border}` : "none", alignItems: "center", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${c.color}22`, border: `1.5px solid ${c.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: c.color }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12, fontWeight: 600 }}>{c.symbol}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "'Exo 2', sans-serif" }}>
                  ${c.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ color: c.change >= 0 ? COLORS.emerald : "#ff4d6d", fontWeight: 700, fontSize: 14 }}>
                  {c.change >= 0 ? "▲ +" : "▼ "}{Math.abs(c.change).toFixed(2)}%
                </div>
                <div style={{ color: COLORS.muted, fontSize: 14, fontWeight: 600 }}>${c.cap}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "7px 14px", borderRadius: 6, background: "rgba(0,230,118,0.15)", border: `1px solid ${COLORS.emerald}44`, color: COLORS.emerald, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Buy</button>
                  <button style={{ padding: "7px 14px", borderRadius: 6, background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.3)", color: "#ff4d6d", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Sell</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button className="btn-outline" style={glowBtn.outline}>View All Markets →</button>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section id="about-us" className="section-pad" style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: COLORS.cyan, fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>WHY APTITUDE</div>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>The World's Most{" "}
              <span style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trusted</span>
              {" "}P2P Platform
            </h2>
          </div>

          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {WHY_US.map((w, i) => (
              <div key={i} className="why-card" style={{ padding: "32px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{w.title}</h3>
                  <p style={{ color: COLORS.muted, fontSize: 13.5, lineHeight: 1.7, fontFamily: "'Exo 2', sans-serif" }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="glow-border" style={{ marginTop: 60, padding: "48px", background: `linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,230,118,0.06))`, border: `1px solid rgba(0,212,255,0.3)`, borderRadius: 20, textAlign: "center" }}>
            <h3 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>Ready to Start Your Trading Journey?</h3>
            <p style={{ color: COLORS.muted, marginBottom: 28, fontFamily: "'Exo 2', sans-serif" }}>Join 200,000+ traders already using APTITUDE. Create your free account in under 2 minutes.</p>
            <button className="btn-primary" style={{ ...glowBtn.primary, fontSize: 16, padding: "16px 48px" }}>Get Started Free 🚀</button>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-pad" style={{ padding: "100px 5%", background: COLORS.navy }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: COLORS.emerald, fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>TESTIMONIALS</div>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>Trusted by{" "}
              <span style={{ color: COLORS.emerald }}>Traders Worldwide</span>
            </h2>
          </div>

          <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ padding: "28px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, backdropFilter: "blur(20px)" }}>
                <div style={{ color: COLORS.gold, fontSize: 14, marginBottom: 12 }}>{"★".repeat(t.rating)}</div>
                <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.75, marginBottom: 20, fontFamily: "'Exo 2', sans-serif", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>🌍 {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="contact" className="section-pad" style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: COLORS.cyan, fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>FAQ</div>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>Frequently Asked{" "}
              <span style={{ color: COLORS.cyan }}>Questions</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" style={{ background: COLORS.card, border: `1px solid ${openFaq === i ? COLORS.cyan + "55" : COLORS.border}`, borderRadius: 12, overflow: "hidden", backdropFilter: "blur(20px)", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{f.q}</span>
                  <span style={{ color: COLORS.cyan, fontSize: 20, flexShrink: 0, marginLeft: 12, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", color: COLORS.muted, fontSize: 14, lineHeight: 1.75, fontFamily: "'Exo 2', sans-serif" }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: COLORS.navyLight, borderTop: `1px solid ${COLORS.border}`, padding: "64px 5% 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#000" }}>A</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 1 }}>APTITUDE</div>
                  <div style={{ fontSize: 9, color: COLORS.cyan, letterSpacing: 2, fontWeight: 600 }}>ENTERPRISES TRADING TECH</div>
                </div>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13.5, lineHeight: 1.75, maxWidth: 280, fontFamily: "'Exo 2', sans-serif" }}>
                Secure Trading. Trusted Connections. Limitless Opportunities. 🚀<br /><br />
                The world's most trusted peer-to-peer cryptocurrency trading platform.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["𝕏", "📘", "💬", "📸", "▶"].map((s, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,212,255,0.1)", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: COLORS.muted }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <div style={{ fontWeight: 700, marginBottom: 20, fontSize: 13, letterSpacing: 1.5, color: COLORS.white }}>PLATFORM</div>
              {["Buy Crypto", "Sell Crypto", "P2P Trading", "Markets", "Merchants", "Trading Fees"].map(l => (
                <a key={l} href="#" style={{ display: "block", color: COLORS.muted, textDecoration: "none", fontSize: 13.5, marginBottom: 10, fontFamily: "'Exo 2', sans-serif", transition: "color 0.2s" }}
                  onMouseOver={e => e.target.style.color = COLORS.cyan}
                  onMouseOut={e => e.target.style.color = COLORS.muted}>{l}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <div style={{ fontWeight: 700, marginBottom: 20, fontSize: 13, letterSpacing: 1.5, color: COLORS.white }}>COMPANY</div>
              {["About Us", "Careers", "Blog", "Press Kit", "Affiliates", "Contact Us"].map(l => (
                <a key={l} href="#" style={{ display: "block", color: COLORS.muted, textDecoration: "none", fontSize: 13.5, marginBottom: 10, fontFamily: "'Exo 2', sans-serif", transition: "color 0.2s" }}
                  onMouseOver={e => e.target.style.color = COLORS.cyan}
                  onMouseOut={e => e.target.style.color = COLORS.muted}>{l}</a>
              ))}
            </div>

            {/* Support */}
            <div>
              <div style={{ fontWeight: 700, marginBottom: 20, fontSize: 13, letterSpacing: 1.5, color: COLORS.white }}>SUPPORT</div>
              {["Help Center", "Terms & Conditions", "Privacy Policy", "Cookie Policy", "Security", "API Docs"].map(l => (
                <a key={l} href="#" style={{ display: "block", color: COLORS.muted, textDecoration: "none", fontSize: 13.5, marginBottom: 10, fontFamily: "'Exo 2', sans-serif", transition: "color 0.2s" }}
                  onMouseOver={e => e.target.style.color = COLORS.cyan}
                  onMouseOut={e => e.target.style.color = COLORS.muted}>{l}</a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'Exo 2', sans-serif" }}>
              © 2025 APTITUDE Enterprises Trading Tech. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms", "Privacy", "Cookies", "Security"].map(l => (
                <a key={l} href="#" style={{ color: COLORS.muted, textDecoration: "none", fontSize: 12, fontWeight: 600, transition: "color 0.2s" }}
                  onMouseOver={e => e.target.style.color = COLORS.cyan}
                  onMouseOut={e => e.target.style.color = COLORS.muted}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
