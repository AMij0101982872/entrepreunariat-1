"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const agencies = [
  { id:1, name:"Nahda Business", logo:"NB", color:"#16a34a", bg:"#f0fdf4", type:"Groupage Aérien", slogan:"N°1 du Groupage Aérien Subsaharien", description:"Avec Nahda Business, envoyer vos colis n'a jamais été aussi facile et sécurisé. 15 pays desservis.", destinations:["Côte d'Ivoire","Cameroun","Sénégal","Mali","Guinée Conakry","Burkina Faso","Congo Kinshasa","Congo Brazza","Togo","Niger","Centre Afrique","Ghana","Nigéria","Gabon","Maroc"], prix_kg:"Sur devis", delai:"3-7 jours", note:4.8, avis:124, badge:"15 PAYS", verified:true, featured:true, contacts:[{label:"Maroc",tel:"+212 669 790 518"},{label:"Maroc",tel:"+212 629 204 375"},{label:"Côte d'Ivoire",tel:"+225 078 892 3844"},{label:"Côte d'Ivoire",tel:"+225 070 680 4710"}], modes:["✈️ Aérien"], adresse:"Casablanca, Maroc", horaires:"", tarifs:[{article:"Standard",prix:"Sur devis",delai:"3-7j"}], specials:[] },
  { id:2, name:"BS International Express", logo:"BS", color:"#1d4ed8", bg:"#eff6ff", type:"Transport Aérien", slogan:"Express vers l'Afrique de l'Ouest", description:"Spécialiste du transport aérien. Grille tarifaire détaillée, tarifs catégorie inclus.", destinations:["Burkina Faso","Côte d'Ivoire","Sénégal","Mali","Guinée","Ghana","Nigéria","Togo","Bénin"], prix_kg:"60-70 DH/kg", delai:"2-5 jours", note:4.7, avis:89, badge:"EXPRESS", verified:true, featured:true, contacts:[{label:"Maroc",tel:"+212 620 876 468"},{label:"Burkina Faso",tel:"+226 042 642 42"}], modes:["✈️ Aérien"], adresse:"Casablanca, Maroc", horaires:"", tarifs:[{article:"Maroc → Burkina (1kg)",prix:"70 DH",delai:"2-5j"},{article:"Burkina → Maroc (1kg)",prix:"60 DH",delai:"2-5j"},{article:"Maroc → Burkina (23kg)",prix:"1 610 DH",delai:"2-5j"},{article:"Burkina → Maroc (23kg)",prix:"1 380 DH",delai:"2-5j"}], specials:[{nom:"Cosmétique",prix:"80 DH/kg"},{nom:"Mèche / Perruque",prix:"80-100 DH"},{nom:"Parfums",prix:"80 DH/kg"},{nom:"Mannequin",prix:"70 DH/kg"},{nom:"Médicament trad.",prix:"80 DH/kg"},{nom:"Téléphone",prix:"300 DH"},{nom:"Ordinateur",prix:"500 DH"},{nom:"Document",prix:"100 DH"}] },
  { id:3, name:"Aigle Royal Transport", logo:"AR", color:"#ea580c", bg:"#fff7ed", type:"Transport Routier", slogan:"L'expertise au service de vos échanges globaux", description:"Envois express par route. Tarifs compétitifs : 30 DH/kg standard, 25 DH/kg effets personnels.", destinations:["Côte d'Ivoire","Sénégal","Mali","Guinée","Burkina Faso","Mauritanie"], prix_kg:"25-30 DH/kg", delai:"7-15 jours", note:4.5, avis:67, badge:"MEILLEUR PRIX", verified:true, featured:true, contacts:[{label:"Principal",tel:"+212 627 770 455"},{label:"Secondaire",tel:"+212 689 863 640"}], modes:["🚛 Routier"], adresse:"Hay El Oulfa, Casablanca", horaires:"Lun–Sam : 08h00–17h00", tarifs:[{article:"Colis standard",prix:"30 DH/kg",delai:"7-15j"},{article:"Effets personnels",prix:"25 DH/kg",delai:"7-15j"}], specials:[] },
  { id:4, name:"Nolivet P Express", logo:"NE", color:"#0369a1", bg:"#f0f9ff", type:"Multi-modal", slogan:"Vous avez le choix !", description:"Transport par avion, bateau et camion. Toutes destinations.", destinations:["Afrique","Europe","International"], prix_kg:"Sur devis", delai:"Selon mode", note:4.6, avis:54, badge:"MULTI-MODAL", verified:true, featured:false, contacts:[{label:"Principal",tel:"+212 600 890 010"}], modes:["✈️ Aérien","🚢 Maritime","🚛 Routier"], adresse:"Casablanca – Oulfa, Mosquée Zoubir", horaires:"Lun–Sam : 09h00–19h00", tarifs:[{article:"Tous modes",prix:"Sur devis",delai:"Variable"}], specials:[] },
  { id:5, name:"SAM GP", logo:"SG", color:"#b45309", bg:"#fffbeb", type:"Groupage Sénégal↔Maroc", slogan:"Dakar → Casablanca · Meknès · Fès", description:"Spécialiste exclusif Sénégal-Maroc. 4 agences. Livraison à domicile.", destinations:["Dakar → Casablanca","Dakar → Meknès","Dakar → Fès","Maroc → Dakar"], prix_kg:"70 DH / 4200 CFA", delai:"Variable", note:4.4, avis:98, badge:"70 DH/KG", verified:true, featured:false, contacts:[{label:"Agence Yoff",tel:"+221 77 691 52 83"},{label:"Agence K.Massar",tel:"+221 77 545 31 20"},{label:"Agence Rufisque",tel:"+221 78 379 69 98"},{label:"Maroc",tel:"+212 721 38 99 19"}], modes:["🚛 Routier"], adresse:"Points Maroc : Georges · Médina · Lehdim · Sidi Birahim", horaires:"", tarifs:[{article:"Standard",prix:"70 DH / 4200 CFA",delai:"Variable"}], specials:[{nom:"Cosmétiques",prix:"Tarif spécial"},{nom:"Talismans",prix:"Tarif spécial"},{nom:"Médicaments",prix:"Tarif spécial"},{nom:"Électronique",prix:"Tarif spécial"}] },
  { id:6, name:"AMSA & Babacar GP", logo:"AB", color:"#be123c", bg:"#fff1f2", type:"Groupage Sénégal↔Maroc", slogan:"Dakar 🇸🇳 ↔ Casa · Rabat · Marrakech 🇲🇦", description:"Transport Dakar ↔ grandes villes Maroc. Départ chaque mardi soir.", destinations:["Dakar → Casablanca","Dakar → Rabat","Dakar → Marrakech"], prix_kg:"70 DH/kg", delai:"Départ mardi soir", note:4.2, avis:33, badge:"70 DH/KG", verified:false, featured:false, contacts:[{label:"Sénégal 1",tel:"+221 78 632 10 74"},{label:"Sénégal 2",tel:"+221 77 235 94 49"},{label:"Maroc",tel:"+212 605 138 902"}], modes:["🚛 Routier"], adresse:"Dakar — Livraison : Casa · Rabat · Marrakech", horaires:"Départ chaque mardi soir", tarifs:[{article:"Standard",prix:"70 DH",delai:"Variable"}], specials:[] },
  { id:7, name:"Express Cargo Afrique", logo:"EC", color:"#7c3aed", bg:"#faf5ff", type:"Maritime & Routier", slogan:"Transport & Négoce International", description:"Maritime (Congo,Gabon,Angola,Cameroun) + Routier (CI,Burkina,Guinée). Tarifs détaillés.", destinations:["Congo","Gabon","Angola","Cameroun","Côte d'Ivoire","Burkina Faso","Guinée Conakry"], prix_kg:"dès 28 DH/kg", delai:"Maritime 15-30j · Routier 7-15j", note:4.5, avis:76, badge:"MARITIME", verified:true, featured:false, contacts:[{label:"Maroc 1",tel:"+212 620 981 627"},{label:"Maroc 2",tel:"+212 700 273 573"},{label:"Guinée 1",tel:"+224 627 06 14 62"},{label:"Guinée 2",tel:"+224 622 58 79 96"},{label:"Guinée 3",tel:"+224 628 73 90 28"}], modes:["🚢 Maritime","🚛 Routier"], adresse:"Casablanca, Maroc", horaires:"", tarifs:[{article:"Vêtements neufs (maritime)",prix:"65.21 DH",delai:"15-30j"},{article:"Vêtements neufs (routier)",prix:"34.78 DH",delai:"7-15j"},{article:"Cosmétiques (maritime)",prix:"65.21 DH",delai:"15-30j"},{article:"Cosmétiques (routier)",prix:"26.08 DH",delai:"7-15j"},{article:"Chaussures (maritime)",prix:"45.50 DH",delai:"15-30j"},{article:"Chaussures (routier)",prix:"34.78 DH",delai:"7-15j"},{article:"Épices & Alimentaire (routier)",prix:"28.26 DH",delai:"7-15j"},{article:"Vêtements usagés (maritime)",prix:"45.50 DH",delai:"15-30j"},{article:"Vêtements usagés (routier)",prix:"28.26 DH",delai:"7-15j"}], specials:[] },
];

type Msg = { from: "client" | "agence"; text: string; time: string };
type Inbox = Record<number, Msg[]>;

const autoReplies = [
  "Merci pour votre message ! Je vous réponds dans quelques instants.",
  "Bien noté ! Pouvez-vous préciser le poids et le type de colis ?",
  "Je vous prépare un devis personnalisé sous peu.",
  "Oui, nous pouvons gérer cela. Quelle est la date souhaitée ?",
  "Super ! Envoyez-moi les détails et je vous donne le tarif exact.",
];

const initInbox = (): Inbox =>
  Object.fromEntries(
    agencies.map((a) => [
      a.id,
      [{ from: "agence" as const, text: `Bonjour ! ${a.name} à votre service. Comment puis-je vous aider ?`, time: "10:00" }],
    ])
  );

function Stars({ n, avis }: { n: number; avis: number }) {
  return (
    <span style={{ fontSize: 12, color: "#64748b" }}>
      <span style={{ color: "#f59e0b" }}>
        {"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}
      </span>{" "}
      {n} <span style={{ opacity: 0.6 }}>({avis} avis)</span>
    </span>
  );
}

export default function Home() {
  const [tab, setTab] = useState<"agences" | "comparateur" | "devis" | "messages">("agences");
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("featured");
  const [inbox, setInbox] = useState<Inbox>(initInbox);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [showTarifs, setShowTarifs] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"client" | "agence">("agence");
  const [devis, setDevis] = useState({ poids: "", dest: "", type: "", desc: "" });
  const [devisOk, setDevisOk] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ nom: "", responsable: "", tel: "", email: "", zones: "", tarif: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [inbox, activeChat]);

  const blurAmount = Math.min(scrollY / 20, 10);
  const parallax = scrollY * 0.35;

  const modes = ["Tous", "✈️ Aérien", "🚢 Maritime", "🚛 Routier"];

  const filtered = agencies
    .filter((a) => {
      const q = search.toLowerCase();
      return (
        (!search ||
          a.name.toLowerCase().includes(q) ||
          a.destinations.some((d) => d.toLowerCase().includes(q)) ||
          a.type.toLowerCase().includes(q)) &&
        (modeFilter === "Tous" || a.modes.includes(modeFilter))
      );
    })
    .sort((a, b) => {
      if (sortBy === "prix") return (parseFloat(a.prix_kg) || 999) - (parseFloat(b.prix_kg) || 999);
      if (sortBy === "note") return b.note - a.note;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const send = (agId: number) => {
    if (!chatInput.trim()) return;
    const t = new Date();
    const time = `${t.getHours()}:${String(t.getMinutes()).padStart(2, "0")}`;
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    setInbox((p) => ({
      ...p,
      [agId]: [...(p[agId] || []), { from: "client", text: chatInput, time }, { from: "agence", text: reply, time }],
    }));
    setChatInput("");
  };

  const openChat = (id: number) => { setActiveChat(id); setTab("messages"); setMenuOpen(false); };
  const totalUnread = agencies.reduce((s, a) => s + (inbox[a.id]?.length > 1 ? 1 : 0), 0);

  const submitForm = async () => {
    if (!formData.nom || !formData.tel) { setFormStatus("error"); return; }
    setFormStatus("loading");
    try {
      const res = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: formType, created_at: new Date().toISOString() }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ nom: "", responsable: "", tel: "", email: "", zones: "", tarif: "" });
      } else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  const navTabs = [
    ["agences", "🏢 Agences"],
    ["comparateur", "⚖️ Comparer"],
    ["devis", "📋 Devis"],
    ["messages", "💬 Messages"],
  ] as const;

  return (
    <main style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        background: "rgba(8,16,32,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        height: 62, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 1.5rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setTab("agences"); setMenuOpen(false); }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#22d3ee,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#fff", flexShrink: 0 }}>DM</div>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#fff", letterSpacing: -0.5 }}>DelivraMaroc</span>
          <span style={{ fontSize: 10, color: "#22d3ee", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 100, padding: "1px 7px", marginLeft: 2 }}>BETA</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
          {navTabs.map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "7px 13px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: "none",
              background: tab === key ? "rgba(34,211,238,0.12)" : "transparent",
              color: tab === key ? "#22d3ee" : "#94a3b8",
              position: "relative", transition: "all 0.2s",
            }}>
              {label}
              {key === "messages" && totalUnread > 0 && (
                <span style={{ position: "absolute", top: 1, right: 1, background: "#ef4444", color: "#fff", borderRadius: 100, fontSize: 8, fontWeight: 700, padding: "1px 4px" }}>{totalUnread}</span>
              )}
            </button>
          ))}
          <button
            onClick={() => { setShowForm(true); setFormType("agence"); setFormStatus("idle"); }}
            style={{ marginLeft: 8, background: "linear-gradient(135deg,#22d3ee,#0ea5e9)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(34,211,238,0.25)", whiteSpace: "nowrap" }}>
            + Inscrire mon agence
          </button>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "transparent", border: "none", color: "#fff", fontSize: 24, cursor: "pointer", padding: 4 }} className="burger">☰</button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 62, left: 0, right: 0, zIndex: 299, background: "rgba(8,16,32,0.97)", backdropFilter: "blur(20px)", padding: "12px 1rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 4 }}>
          {navTabs.map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); setMenuOpen(false); }} style={{ padding: "12px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", background: tab === key ? "rgba(34,211,238,0.12)" : "transparent", color: tab === key ? "#22d3ee" : "#94a3b8", textAlign: "left" as const, position: "relative" }}>
              {label}
              {key === "messages" && totalUnread > 0 && <span style={{ marginLeft: 8, background: "#ef4444", color: "#fff", borderRadius: 100, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{totalUnread}</span>}
            </button>
          ))}
          <button onClick={() => { setShowForm(true); setFormType("agence"); setFormStatus("idle"); setMenuOpen(false); }} style={{ margin: "4px 0", background: "linear-gradient(135deg,#22d3ee,#0ea5e9)", color: "#fff", border: "none", borderRadius: 8, padding: "12px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", textAlign: "left" as const }}>
            + Inscrire mon agence
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      {tab === "agences" && (
        <section ref={heroRef} style={{ position: "relative", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", color: "#fff", textAlign: "center" }}>

          {/* IMAGE DE FOND avec next/image + parallax */}
          <div style={{
            position: "absolute", inset: "-25%",
            transform: `translateY(${parallax}px)`,
            filter: `blur(${blurAmount}px)`,
            transition: "filter 0.1s ease",
            willChange: "transform,filter",
          }}>
            <Image
              src="/hero.png"
              alt="DelivraMaroc hero"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Overlay dégradé */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,8,20,0.70) 0%,rgba(3,8,20,0.50) 40%,rgba(3,8,20,0.88) 100%)" }} />
          {/* Grille déco */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 820, padding: "140px 2rem 100px", zIndex: 10 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.28)", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, color: "#67e8f9", marginBottom: 24, backdropFilter: "blur(10px)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee" }} />
              🇲🇦 La 1ère plateforme livraison Maroc–Afrique
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem,5.5vw,4rem)", fontWeight: 900, margin: "0 0 6px", lineHeight: 1.06, letterSpacing: -2, textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
              Connectez-vous aux
            </h1>
            <h1 style={{ fontSize: "clamp(2.2rem,5.5vw,4rem)", fontWeight: 900, margin: "0 0 22px", lineHeight: 1.06, letterSpacing: -2, color: "#22d3ee", textShadow: "0 0 50px rgba(34,211,238,0.4)" }}>
              meilleures agences de livraison
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 44px", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
              Comparez les tarifs · Chattez en direct · Envoyez vos colis en toute confiance vers l&apos;Afrique
            </p>

            {/* Barre de recherche */}
            <div style={{ display: "flex", maxWidth: 660, margin: "0 auto 48px", borderRadius: 14, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.55)", border: "1px solid rgba(34,211,238,0.18)" }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍  Destination, pays, type de colis..."
                style={{ flex: 1, padding: "18px 22px", border: "none", fontSize: 15, outline: "none", background: "rgba(255,255,255,0.97)", color: "#0f172a" }}
                onKeyDown={(e) => { if (e.key === "Enter") setTab("comparateur"); }}
              />
              <button onClick={() => setTab("comparateur")} style={{ background: "linear-gradient(135deg,#22d3ee,#0369a1)", color: "#fff", border: "none", padding: "18px 30px", fontSize: 15, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", letterSpacing: 0.5 }}>
                COMPARER →
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
              {[{ v: "7+", l: "Agences" }, { v: "20+", l: "Pays" }, { v: "3", l: "Modes" }, { v: "4.6★", l: "Note moy." }].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: "#22d3ee", lineHeight: 1, textShadow: "0 0 24px rgba(34,211,238,0.45)" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: tab === "agences" ? "32px 1.5rem" : "82px 1.5rem 32px" }}>

        {/* ── AGENCES ── */}
        {tab === "agences" && (
          <>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
              {modes.map((m) => (
                <button key={m} onClick={() => setModeFilter(m)} style={{ padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "2px solid", background: modeFilter === m ? "#0ea5e9" : "#fff", color: modeFilter === m ? "#fff" : "#475569", borderColor: modeFilter === m ? "#0ea5e9" : "#e2e8f0", transition: "all 0.2s" }}>
                  {m}
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Aucune agence trouvée</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Essayez une autre destination ou un autre mode</div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 22 }}>
              {filtered.map((ag) => (
                <div key={ag.id}
                  style={{ background: "#fff", borderRadius: 20, border: ag.featured ? "2px solid #0ea5e9" : "1px solid #e2e8f0", overflow: "hidden", boxShadow: ag.featured ? "0 4px 24px rgba(14,165,233,0.12)" : "0 2px 12px rgba(0,0,0,0.05)", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = ag.featured ? "0 4px 24px rgba(14,165,233,0.12)" : "0 2px 12px rgba(0,0,0,0.05)"; }}>

                  {ag.featured && <div style={{ background: "linear-gradient(90deg,#0ea5e9,#0369a1)", color: "#fff", fontSize: 10, fontWeight: 700, textAlign: "center", padding: "5px", letterSpacing: 1 }}>⭐ AGENCE RECOMMANDÉE</div>}

                  <div style={{ background: ag.bg, padding: "18px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: ag.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>{ag.logo}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                        <span style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{ag.name}</span>
                        {ag.verified && <span style={{ background: "#dcfce7", color: "#166534", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 100 }}>✓ Vérifié</span>}
                        <span style={{ background: ag.color, color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 7px", borderRadius: 100 }}>{ag.badge}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ag.slogan}</div>
                    </div>
                  </div>

                  <div style={{ padding: "16px 20px" }}>
                    <Stars n={ag.note} avis={ag.avis} />
                    <p style={{ fontSize: 12, color: "#64748b", margin: "10px 0", lineHeight: 1.5 }}>{ag.description}</p>

                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                      {ag.modes.map((m) => <span key={m} style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, padding: "3px 9px", borderRadius: 100, fontWeight: 600 }}>{m}</span>)}
                    </div>

                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: 0.6 }}>Destinations</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {ag.destinations.slice(0, 4).map((d) => <span key={d} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#334155", fontSize: 10, padding: "2px 7px", borderRadius: 5 }}>{d}</span>)}
                        {ag.destinations.length > 4 && <span style={{ background: ag.color, color: "#fff", fontSize: 10, padding: "2px 7px", borderRadius: 5, fontWeight: 700 }}>+{ag.destinations.length - 4} pays</span>}
                      </div>
                    </div>

                    {ag.adresse && <div style={{ display: "flex", gap: 5, alignItems: "flex-start", marginBottom: 6 }}><span style={{ fontSize: 12 }}>📍</span><span style={{ fontSize: 11, color: "#64748b" }}>{ag.adresse}</span></div>}
                    {ag.horaires && <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 12 }}>🕐</span><span style={{ fontSize: 11, color: "#64748b" }}>{ag.horaires}</span></div>}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px", textAlign: "center" as const }}>
                        <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700, marginBottom: 3, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Tarif</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: ag.color }}>{ag.prix_kg}</div>
                      </div>
                      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px", textAlign: "center" as const }}>
                        <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700, marginBottom: 3, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Délai</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{ag.delai}</div>
                      </div>
                    </div>

                    <button onClick={() => setShowTarifs(showTarifs === ag.id ? null : ag.id)} style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${ag.color}33`, color: ag.color, background: `${ag.color}08`, fontSize: 12, fontWeight: 600, cursor: "pointer", marginBottom: 10 }}>
                      {showTarifs === ag.id ? "▲ Masquer les tarifs" : "📊 Grille tarifaire complète"}
                    </button>

                    {showTarifs === ag.id && (
                      <div style={{ marginBottom: 12, borderRadius: 10, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 11 }}>
                          <thead>
                            <tr style={{ background: ag.color }}>
                              <th style={{ padding: "7px 10px", textAlign: "left" as const, color: "#fff", fontWeight: 600 }}>Service</th>
                              <th style={{ padding: "7px 10px", textAlign: "center" as const, color: "#fff", fontWeight: 600 }}>Prix</th>
                              <th style={{ padding: "7px 10px", textAlign: "center" as const, color: "#fff", fontWeight: 600 }}>Délai</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ag.tarifs.map((t, i) => (
                              <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#fff", borderTop: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "6px 10px", color: "#334155" }}>{t.article}</td>
                                <td style={{ padding: "6px 10px", textAlign: "center" as const, color: ag.color, fontWeight: 700 }}>{t.prix}</td>
                                <td style={{ padding: "6px 10px", textAlign: "center" as const, color: "#64748b" }}>{t.delai}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {ag.specials.length > 0 && (
                          <div style={{ padding: "10px", background: "#fffbeb", borderTop: "1px solid #fde68a" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>⚠️ Tarifs spéciaux :</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {ag.specials.map((s, i) => (
                                <span key={i} style={{ background: "#fff", border: "1px solid #fcd34d", color: "#92400e", fontSize: 10, padding: "2px 7px", borderRadius: 5 }}>
                                  {typeof s === "string" ? s : `${s.nom} : ${s.prix}`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <button onClick={() => openChat(ag.id)} style={{ width: "100%", background: `linear-gradient(135deg,${ag.color},${ag.color}cc)`, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, boxShadow: `0 4px 14px ${ag.color}40`, marginBottom: 8 }}>
                      💬 Contacter sur la plateforme
                    </button>

                    {ag.contacts.slice(0, 2).map((c, i) => (
                      <a key={i} href={`tel:${c.tel}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", border: "1px solid #e2e8f0", color: "#334155", textDecoration: "none", padding: "8px 12px", borderRadius: 8, fontSize: 11, marginBottom: 5 }}>
                        <span style={{ color: "#94a3b8" }}>📞 {c.label}</span>
                        <span style={{ fontWeight: 700 }}>{c.tel}</span>
                      </a>
                    ))}
                    {ag.contacts.length > 2 && <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "center" as const, padding: "3px" }}>+{ag.contacts.length - 2} autres contacts disponibles</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── COMPARATEUR ── */}
        {tab === "comparateur" && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 20, marginTop: 0 }}>⚖️ Comparateur d&apos;agences</h2>
            <div style={{ background: "#fff", borderRadius: 14, padding: "16px", marginBottom: 20, border: "1px solid #e2e8f0", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Destination ou pays..." style={{ flex: 1, minWidth: 180, padding: "9px 14px", borderRadius: 9, border: "1px solid #e2e8f0", fontSize: 13, outline: "none" }} />
              {modes.map((m) => (
                <button key={m} onClick={() => setModeFilter(m)} style={{ padding: "7px 13px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "2px solid", background: modeFilter === m ? "#0ea5e9" : "#fff", color: modeFilter === m ? "#fff" : "#475569", borderColor: modeFilter === m ? "#0ea5e9" : "#e2e8f0" }}>{m}</button>
              ))}
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "8px 12px", borderRadius: 9, border: "1px solid #e2e8f0", fontSize: 12, outline: "none", background: "#fff", cursor: "pointer" }}>
                <option value="featured">⭐ Recommandés</option>
                <option value="prix">💰 Meilleur prix</option>
                <option value="note">⭐ Meilleures notes</option>
              </select>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "auto", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" as const, minWidth: 700 }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    {["Agence", "Mode", "Tarif/kg", "Délai", "Note", "Action"].map((h) => (
                      <th key={h} style={{ padding: "13px 16px", textAlign: "left" as const, color: "#64748b", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={a.id}
                      style={{ borderTop: "1px solid #f1f5f9", background: a.featured ? "#f0f9ff" : i % 2 === 0 ? "#fff" : "#fafafa", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#e0f2fe"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = a.featured ? "#f0f9ff" : i % 2 === 0 ? "#fff" : "#fafafa"}>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 9, background: a.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{a.logo}</div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                              {a.name}
                              {a.verified && <span style={{ background: "#dcfce7", color: "#166534", fontSize: 9, padding: "1px 5px", borderRadius: 100 }}>✓</span>}
                              {a.featured && <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: 9, padding: "1px 5px", borderRadius: 100 }}>★</span>}
                            </div>
                            <div style={{ fontSize: 10, color: "#94a3b8" }}>{a.adresse}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          {a.modes.map((m) => <span key={m} style={{ background: "#f1f5f9", color: "#475569", fontSize: 10, padding: "2px 6px", borderRadius: 100, fontWeight: 600, whiteSpace: "nowrap" }}>{m}</span>)}
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px" }}><span style={{ fontWeight: 800, fontSize: 14, color: a.color }}>{a.prix_kg}</span></td>
                      <td style={{ padding: "13px 16px", fontSize: 12, color: "#475569", fontWeight: 600 }}>{a.delai}</td>
                      <td style={{ padding: "13px 16px" }}><Stars n={a.note} avis={a.avis} /></td>
                      <td style={{ padding: "13px 16px" }}>
                        <button onClick={() => openChat(a.id)} style={{ background: a.color, color: "#fff", border: "none", borderRadius: 7, padding: "7px 13px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>💬 Contacter</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Aucun résultat</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── DEVIS ── */}
        {tab === "devis" && (
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {!devisOk ? (
                <>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginTop: 0, marginBottom: 6 }}>📋 Publier une demande de devis</h2>
                  <p style={{ color: "#64748b", fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>Décrivez votre colis. Les agences vous répondront sur la messagerie.</p>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 15 }}>
                    {[
                      { k: "poids", l: "Poids estimé (kg)", t: "number", p: "Ex: 5" },
                      { k: "dest", l: "Destination", t: "text", p: "Ex: Dakar, Sénégal" },
                      { k: "type", l: "Type de colis", t: "text", p: "Ex: vêtements, cosmétiques..." },
                    ].map((f) => (
                      <div key={f.k}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{f.l}</label>
                        <input
                          type={f.t}
                          placeholder={f.p}
                          value={devis[f.k as keyof typeof devis]}
                          onChange={(e) => setDevis({ ...devis, [f.k]: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Informations complémentaires</label>
                      <textarea
                        rows={3}
                        placeholder="Date souhaitée, contraintes particulières..."
                        value={devis.desc}
                        onChange={(e) => setDevis({ ...devis, desc: e.target.value })}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none", resize: "none" as const, boxSizing: "border-box" as const }}
                      />
                    </div>
                    <button
                      onClick={() => { if (devis.poids && devis.dest) setDevisOk(true); }}
                      style={{ background: "linear-gradient(135deg,#0ea5e9,#0369a1)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                      📤 Publier ma demande
                    </button>
                    {(!devis.poids || !devis.dest) && (
                      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" as const }}>Le poids et la destination sont requis</div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center" as const, padding: "20px 0" }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Demande publiée !</h3>
                  <p style={{ color: "#64748b", marginBottom: 24, lineHeight: 1.6 }}>Les agences vont vous répondre sur la <strong>messagerie</strong>. Consultez-les dès maintenant.</p>
                  <button
                    onClick={() => { setTab("messages"); setDevisOk(false); setDevis({ poids: "", dest: "", type: "", desc: "" }); }}
                    style={{ background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    💬 Voir mes messages →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MESSAGERIE ── */}
        {tab === "messages" && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 20, marginTop: 0 }}>💬 Messagerie</h2>
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", height: 580 }}>

              {/* Inbox */}
              <div style={{ background: "#fff", borderRight: "1px solid #f1f5f9", overflowY: "auto" as const, display: "flex", flexDirection: "column" as const }}>
                <div style={{ padding: "16px", borderBottom: "1px solid #f1f5f9", background: "#0f172a", flexShrink: 0 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Boîte de réception</div>
                  <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{agencies.length} conversations</div>
                </div>
                {agencies.map((ag) => {
                  const msgs = inbox[ag.id] || [];
                  const last = msgs[msgs.length - 1];
                  const isActive = activeChat === ag.id;
                  return (
                    <div key={ag.id}
                      onClick={() => setActiveChat(ag.id)}
                      style={{ padding: "12px 14px", borderBottom: "1px solid #f8fafc", cursor: "pointer", background: isActive ? "#eff6ff" : "#fff", display: "flex", gap: 11, alignItems: "center", transition: "background 0.15s" }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isActive ? "#eff6ff" : "#fff"; }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: ag.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 13, flexShrink: 0, position: "relative" }}>
                        {ag.logo}
                        {msgs.length > 1 && <div style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid #fff" }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#0f172a", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ag.name}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{last?.text || "..."}</div>
                      </div>
                      {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9", flexShrink: 0 }} />}
                    </div>
                  );
                })}
              </div>

              {/* Chat */}
              {activeChat ? (() => {
                const ag = agencies.find((a) => a.id === activeChat)!;
                const msgs = inbox[activeChat] || [];
                return (
                  <div style={{ display: "flex", flexDirection: "column" as const, background: "#f8fafc" }}>
                    <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: "#fff", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: ag.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14 }}>{ag.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: "#0f172a" }}>{ag.name}</div>
                        <div style={{ fontSize: 11, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                          En ligne · Répond rapidement
                        </div>
                      </div>
                      {ag.contacts.slice(0, 1).map((c, i) => (
                        <a key={i} href={`tel:${c.tel}`} style={{ background: "#f1f5f9", color: "#334155", textDecoration: "none", padding: "7px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>📞 {c.tel}</a>
                      ))}
                    </div>

                    <div style={{ flex: 1, overflowY: "auto" as const, padding: "20px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                      {msgs.map((msg, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: msg.from === "client" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
                          {msg.from === "agence" && (
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: ag.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 10, flexShrink: 0 }}>{ag.logo}</div>
                          )}
                          <div style={{ maxWidth: "70%", background: msg.from === "client" ? `linear-gradient(135deg,${ag.color},${ag.color}cc)` : "#fff", color: msg.from === "client" ? "#fff" : "#334155", borderRadius: msg.from === "client" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", fontSize: 13, boxShadow: msg.from === "agence" ? "0 1px 6px rgba(0,0,0,0.08)" : "none", lineHeight: 1.5 }}>
                            <div>{msg.text}</div>
                            <div style={{ fontSize: 10, opacity: 0.5, marginTop: 4, textAlign: "right" as const }}>{msg.time}</div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <div style={{ padding: "6px 16px", background: "#fffbeb", borderTop: "1px solid #fef3c7", fontSize: 10, color: "#92400e", textAlign: "center" as const, flexShrink: 0 }}>
                      🔒 Restez sur la plateforme pour votre sécurité
                    </div>
                    <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", background: "#fff", display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") send(activeChat); }}
                        placeholder={`Message à ${ag.name}...`}
                        style={{ flex: 1, padding: "10px 16px", borderRadius: 24, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", background: "#f8fafc" }}
                      />
                      <button onClick={() => send(activeChat)} style={{ background: `linear-gradient(135deg,${ag.color},${ag.color}cc)`, color: "#fff", border: "none", borderRadius: "50%", width: 42, height: 42, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>➤</button>
                    </div>
                  </div>
                );
              })() : (
                <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", background: "#f8fafc" }}>
                  <div style={{ fontSize: 52, marginBottom: 12, opacity: 0.35 }}>💬</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#64748b" }}>Sélectionnez une conversation</div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Choisissez une agence dans la liste à gauche</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", padding: "60px 2rem", textAlign: "center" as const }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Vous êtes une agence de livraison ?</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>Rejoignez le réseau · Clients qualifiés · Visibilité gratuite</p>
          <button
            onClick={() => { setShowForm(true); setFormType("agence"); setFormStatus("idle"); }}
            style={{ background: "linear-gradient(135deg,#22d3ee,#0ea5e9)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginRight: 10, boxShadow: "0 4px 16px rgba(34,211,238,0.3)" }}>
            Inscrire mon agence →
          </button>
          <button
            onClick={() => { setShowForm(true); setFormType("client"); setFormStatus("idle"); }}
            style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", borderRadius: 12, padding: "13px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Je suis client
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a1020", color: "#334155", padding: "28px 2rem", textAlign: "center" as const, fontSize: 12 }}>
        <div style={{ fontWeight: 900, color: "#fff", fontSize: 16, marginBottom: 4 }}>DelivraMaroc</div>
        <div style={{ color: "#475569" }}>Marketplace de livraison Maroc–Afrique · Casablanca 🇲🇦</div>
        <div style={{ marginTop: 6, color: "#1e293b" }}>© 2026 DelivraMaroc — Tous droits réservés</div>
      </footer>

      {/* ── MODAL INSCRIPTION ── */}
      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem", backdropFilter: "blur(8px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: "32px", maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto" as const, boxShadow: "0 24px 64px rgba(0,0,0,0.45)" }}>

            {formStatus === "success" ? (
              <div style={{ textAlign: "center" as const, padding: "20px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Inscription envoyée !</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6 }}>Votre demande a été enregistrée. Notre équipe vous contactera dans les 24h.</p>
                <button onClick={() => setShowForm(false)} style={{ marginTop: 20, background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Fermer</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: 0 }}>{formType === "agence" ? "📦 Inscrire mon agence" : "🙋 Devenir client"}</h3>
                  <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 18, cursor: "pointer", color: "#64748b", lineHeight: 1 }}>×</button>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <button onClick={() => setFormType("client")} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "2px solid", borderColor: formType === "client" ? "#0ea5e9" : "#e2e8f0", background: formType === "client" ? "#eff6ff" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: 12 }}>Je suis client</button>
                  <button onClick={() => setFormType("agence")} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "2px solid", borderColor: formType === "agence" ? "#0ea5e9" : "#e2e8f0", background: formType === "agence" ? "#eff6ff" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: 12 }}>Je suis une agence</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column" as const, gap: 13 }}>
                  {(formType === "agence"
                    ? ([["Nom de l'agence *", "nom"], ["Responsable", "responsable"], ["Téléphone / WhatsApp *", "tel"], ["Email", "email"], ["Zones desservies", "zones"], ["Tarif indicatif (DH/kg)", "tarif"]] as [string, string][])
                    : ([["Nom complet *", "nom"], ["Téléphone *", "tel"], ["Email", "email"], ["Ville de départ", "zones"]] as [string, string][])
                  ).map(([l, k]) => (
                    <div key={k}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{l}</label>
                      <input
                        value={formData[k as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [k]: e.target.value })}
                        placeholder={l.replace(" *", "")}
                        style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: `1px solid ${formStatus === "error" && (k === "nom" || k === "tel") && !formData[k as keyof typeof formData] ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", boxSizing: "border-box" as const }}
                      />
                    </div>
                  ))}
                </div>

                {formStatus === "error" && (
                  <div style={{ marginTop: 12, padding: "10px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12, color: "#dc2626" }}>⚠️ Veuillez remplir les champs obligatoires (marqués *)</div>
                )}

                <button
                  onClick={submitForm}
                  disabled={formStatus === "loading"}
                  style={{ width: "100%", background: formStatus === "loading" ? "#94a3b8" : "linear-gradient(135deg,#0ea5e9,#0369a1)", color: "#fff", border: "none", borderRadius: 11, padding: "13px", fontSize: 14, fontWeight: 700, cursor: formStatus === "loading" ? "not-allowed" : "pointer", marginTop: 18, boxShadow: "0 4px 14px rgba(14,165,233,0.3)" }}>
                  {formStatus === "loading" ? "⏳ Envoi en cours..." : formType === "agence" ? "Envoyer ma demande d'inscription ✓" : "Trouver une agence →"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </main>
  );
}
