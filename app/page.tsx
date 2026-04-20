"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const agencies = [
  { id:1, name:"Nahda Business", logo:"NB", color:"#16a34a", bg:"#f0fdf4", type:"Groupage Aérien", slogan:"N°1 du Groupage Aérien Subsaharien", description:"Avec Nahda Business, envoyer vos colis n'a jamais été aussi facile et sécurisé. 15 pays desservis.", destinations:["Côte d'Ivoire","Cameroun","Sénégal","Mali","Guinée Conakry","Burkina Faso","Congo Kinshasa","Congo Brazza","Togo","Niger","Centre Afrique","Ghana","Nigéria","Gabon","Maroc"], prix_kg:"Sur devis", delai:"3-7 jours", note:4.8, avis:124, badge:"15 PAYS", verified:true, featured:true, contacts:[{label:"Maroc",tel:"+212 669 790 518"},{label:"Maroc",tel:"+212 629 204 375"},{label:"Côte d'Ivoire",tel:"+225 078 892 3844"},{label:"Côte d'Ivoire",tel:"+225 070 680 4710"}], modes:["✈️ Aérien"], adresse:"Casablanca, Maroc", horaires:"", tarifs:[{article:"Standard",prix:"Sur devis",delai:"3-7j"}], specials:[] },
  { id:2, name:"BS International Express", logo:"BS", color:"#1d4ed8", bg:"#eff6ff", type:"Transport Aérien", slogan:"Express vers l'Afrique de l'Ouest", description:"Spécialiste du transport aérien. Grille tarifaire détaillée, tarifs catégorie inclus.", destinations:["Burkina Faso","Côte d'Ivoire","Sénégal","Mali","Guinée","Ghana","Nigéria","Togo","Bénin"], prix_kg:"60-70 DH/kg", delai:"2-5 jours", note:4.7, avis:89, badge:"EXPRESS", verified:true, featured:true, contacts:[{label:"Maroc",tel:"+212 620 876 468"},{label:"Burkina Faso",tel:"+226 042 642 42"}], modes:["✈️ Aérien"], adresse:"Casablanca, Maroc", horaires:"", tarifs:[{article:"Maroc → Burkina (1kg)",prix:"70 DH",delai:"2-5j"},{article:"Burkina → Maroc (1kg)",prix:"60 DH",delai:"2-5j"},{article:"Maroc → Burkina (23kg)",prix:"1 610 DH",delai:"2-5j"},{article:"Burkina → Maroc (23kg)",prix:"1 380 DH",delai:"2-5j"}], specials:[{nom:"Cosmétique",prix:"80 DH/kg"},{nom:"Mèche / Perruque",prix:"80-100 DH"},{nom:"Parfums",prix:"80 DH/kg"},{nom:"Mannequin",prix:"70 DH/kg"},{nom:"Médicament trad.",prix:"80 DH/kg"},{nom:"Téléphone",prix:"300 DH"},{nom:"Ordinateur",prix:"500 DH"},{nom:"Document",prix:"100 DH"}] },
  { id:3, name:"Aigle Royal Transport", logo:"AR", color:"#ea580c", bg:"#fff7ed", type:"Transport Routier", slogan:"L'expertise au service de vos échanges globaux", description:"Envois express par route. Tarifs compétitifs : 30 DH/kg standard, 25 DH/kg effets personnels.", destinations:["Côte d'Ivoire","Sénégal","Mali","Guinée","Burkina Faso","Mauritanie"], prix_kg:"25-30 DH/kg", delai:"7-15 jours", note:4.5, avis:67, badge:"MEILLEUR PRIX", verified:true, featured:true, contacts:[{label:"Principal",tel:"+212 627 770 455"},{label:"Secondaire",tel:"+212 689 863 640"}], modes:["🚛 Routier"], adresse:"Hay El Oulfa, Casablanca", horaires:"Lun–Sam : 08h00–17h00", tarifs:[{article:"Colis standard",prix:"30 DH/kg",delai:"7-15j"},{article:"Effets personnels",prix:"25 DH/kg",delai:"7-15j"}], specials:[] },
  { id:4, name:"Nolivet P Express", logo:"NE", color:"#0369a1", bg:"#f0f9ff", type:"Multi-modal", slogan:"Vous avez le choix !", description:"Transport par avion, bateau et camion. Toutes destinations.", destinations:["Afrique","Europe","International"], prix_kg:"Sur devis", delai:"Selon mode", note:4.6, avis:54, badge:"MULTI-MODAL", verified:true, featured:false, contacts:[{label:"Principal",tel:"+212 600 890 010"}], modes:["✈️ Aérien","🚢 Maritime","🚛 Routier"], adresse:"Casablanca – Oulfa, Mosquée Zoubir", horaires:"Lun–Sam : 09h00–19h00", tarifs:[{article:"Tous modes",prix:"Sur devis",delai:"Variable"}], specials:[] },
  { id:5, name:"SAM GP", logo:"SG", color:"#b45309", bg:"#fffbeb", type:"Groupage Sénégal↔Maroc", slogan:"Dakar → Casablanca · Meknès · Fès", description:"Spécialiste exclusif Sénégal-Maroc. 4 agences. Livraison à domicile.", destinations:["Dakar → Casablanca","Dakar → Meknès","Dakar → Fès","Maroc → Dakar"], prix_kg:"70 DH / 4200 CFA", delai:"Variable", note:4.4, avis:98, badge:"70 DH/KG", verified:true, featured:false, contacts:[{label:"Agence Yoff",tel:"+221 77 691 52 83"},{label:"Agence K.Massar",tel:"+221 77 545 31 20"},{label:"Agence Rufisque",tel:"+221 78 379 69 98"},{label:"Maroc",tel:"+212 721 38 99 19"}], modes:["🚛 Routier"], adresse:"Points Maroc : Georges · Médina · Lehdim · Sidi Birahim", horaires:"", tarifs:[{article:"Standard",prix:"70 DH / 4200 CFA",delai:"Variable"}], specials:[{nom:"Cosmétiques",prix:"Tarif spécial"},{nom:"Talismans",prix:"Tarif spécial"},{nom:"Médicaments",prix:"Tarif spécial"},{nom:"Électronique",prix:"Tarif spécial"}] },
  { id:6, name:"AMSA & Babacar GP", logo:"AB", color:"#be123c", bg:"#fff1f2", type:"Groupage Sénégal↔Maroc", slogan:"Dakar 🇸🇳 ↔ Casa · Rabat · Marrakech 🇲🇦", description:"Transport Dakar ↔ grandes villes Maroc. Départ chaque mardi soir.", destinations:["Dakar → Casablanca","Dakar → Rabat","Dakar → Marrakech"], prix_kg:"70 DH/kg", delai:"Départ mardi soir", note:4.2, avis:33, badge:"70 DH/KG", verified:false, featured:false, contacts:[{label:"Sénégal 1",tel:"+221 78 632 10 74"},{label:"Sénégal 2",tel:"+221 77 235 94 49"},{label:"Maroc",tel:"+212 605 138 902"}], modes:["🚛 Routier"], adresse:"Dakar — Livraison : Casa · Rabat · Marrakech", horaires:"Départ chaque mardi soir", tarifs:[{article:"Standard",prix:"70 DH",delai:"Variable"}], specials:[] },
  { id:7, name:"Express Cargo Afrique", logo:"EC", color:"#7c3aed", bg:"#faf5ff", type:"Maritime & Routier", slogan:"Transport & Négoce International", description:"Maritime (Congo,Gabon,Angola,Cameroun) + Routier (CI,Burkina,Guinée). Tarifs détaillés.", destinations:["Congo","Gabon","Angola","Cameroun","Côte d'Ivoire","Burkina Faso","Guinée Conakry"], prix_kg:"dès 28 DH/kg", delai:"Maritime 15-30j · Routier 7-15j", note:4.5, avis:76, badge:"MARITIME", verified:true, featured:false, contacts:[{label:"Maroc 1",tel:"+212 620 981 627"},{label:"Maroc 2",tel:"+212 700 273 573"},{label:"Guinée 1",tel:"+224 627 06 14 62"},{label:"Guinée 2",tel:"+224 622 58 79 96"},{label:"Guinée 3",tel:"+224 628 73 90 28"}], modes:["🚢 Maritime","🚛 Routier"], adresse:"Casablanca, Maroc", horaires:"", tarifs:[{article:"Vêtements neufs (maritime)",prix:"65.21 DH",delai:"15-30j"},{article:"Vêtements neufs (routier)",prix:"34.78 DH",delai:"7-15j"},{article:"Cosmétiques (maritime)",prix:"65.21 DH",delai:"15-30j"},{article:"Cosmétiques (routier)",prix:"26.08 DH",delai:"7-15j"},{article:"Chaussures (maritime)",prix:"45.50 DH",delai:"15-30j"},{article:"Chaussures (routier)",prix:"34.78 DH",delai:"7-15j"},{article:"Épices & Alimentaire (routier)",prix:"28.26 DH",delai:"7-15j"},{article:"Vêtements usagés (maritime)",prix:"45.50 DH",delai:"15-30j"},{article:"Vêtements usagés (routier)",prix:"28.26 DH",delai:"7-15j"}], specials:[] },
];

type DbMsg = { id: number; from_name: string; to_name: string | null; text: string; created_at: string };
type Product = { id: number; name: string; price: string; description: string; emoji: string; owner: string };

function Stars({ n, avis }: { n: number; avis: number }) {
  return (
    <span style={{ fontSize:12, color:"#64748b" }}>
      <span style={{ color:"#f59e0b" }}>{"★".repeat(Math.floor(n))}{"☆".repeat(5-Math.floor(n))}</span>
      {" "}{n} <span style={{ opacity:0.6 }}>({avis} avis)</span>
    </span>
  );
}

const EMOJIS = ["📦","👗","👟","💄","📱","💻","🎁","🍎","🌿","🪴","🛍️","💍"];

export default function Home() {
  const [tab, setTab] = useState<"agences"|"boutique"|"comparateur"|"devis"|"messages"|"admin">("agences");
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("featured");
  const [showTarifs, setShowTarifs] = useState<number|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"client"|"agence">("agence");
  const [devis, setDevis] = useState({ poids:"", dest:"", type:"", desc:"" });
  const [devisOk, setDevisOk] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ nom:"", responsable:"", tel:"", email:"", zones:"", tarif:"" });
  const [formStatus, setFormStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);

  // Identité
  const [myName, setMyName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [connected, setConnected] = useState(false);

  // Boutique / nom affiché
  const [shopName, setShopName] = useState("");
  const [shopNameInput, setShopNameInput] = useState("");
  const [showShopEdit, setShowShopEdit] = useState(false);

  // Chat
  const [dbMessages, setDbMessages] = useState<DbMsg[]>([]);
  const [chatWith, setChatWith] = useState<string|null>(null);
  const [rtInput, setRtInput] = useState("");
  const [unread, setUnread] = useState<Record<string,number>>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Boutique
  const [products, setProducts] = useState<Product[]>([]);
  const [newProd, setNewProd] = useState({ name:"", price:"", description:"", emoji:"📦" });
  const [showAddProd, setShowAddProd] = useState(false);

  const channelRef = useRef<ReturnType<typeof supabase.channel>|null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Nom affiché dans le chat = nom boutique (si propriétaire) ou prénom
  const displayName = (isOwner && shopName) ? shopName : myName;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [dbMessages, chatWith]);

  // Init : charger depuis localStorage
  useEffect(() => {
    setIsOwner(window.location.hostname === "localhost");
    const saved = localStorage.getItem("dm_username");
    const savedShop = localStorage.getItem("dm_shopname");
    if (saved) {
      setMyName(saved);
      if (savedShop) { setShopName(savedShop); setShopNameInput(savedShop); }
    } else {
      setShowNameModal(true);
    }
  }, []);

  // Produits Supabase
  useEffect(() => {
    supabase.from("products").select("*").order("created_at").then(({ data }) => {
      if (data) setProducts(data as Product[]);
    });
    const prodSub = supabase.channel("products-db")
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"products" }, ({ new: p }) => {
        setProducts(prev => [...prev, p as Product]);
      })
      .on("postgres_changes", { event:"DELETE", schema:"public", table:"products" }, ({ old: p }) => {
        setProducts(prev => prev.filter(x => x.id !== (p as Product).id));
      })
      .subscribe();
    return () => { supabase.removeChannel(prodSub); };
  }, []);

  // Messages + Présence Supabase
  useEffect(() => {
    if (!myName) return;

    // Charger l'historique des messages
    supabase.from("messages").select("*").order("created_at").limit(500)
      .then(({ data }) => { if (data) setDbMessages(data as DbMsg[]); });

    // Souscrire aux nouveaux messages en temps réel
    const msgSub = supabase.channel("messages-realtime")
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"messages" }, ({ new: msg }) => {
        const m = msg as DbMsg;
        setDbMessages(prev => {
          if (prev.find(x => x.id === m.id)) return prev;
          return [...prev, m];
        });
        if (m.from_name !== displayName) {
          setUnread(p => {
            const key = m.to_name === null ? "__public__" : m.from_name;
            return { ...p, [key]: (p[key] || 0) + 1 };
          });
        }
      })
      .subscribe();

    // Canal présence
    const channel = supabase.channel("delivramaroc-presence-v2", {
      config: { presence: { key: displayName || myName } },
    });
    channel.on("presence", { event:"sync" }, () => {
      const state = channel.presenceState<{ name: string }>();
      const dn = displayName || myName;
      const users = Object.values(state).flat().map((p: any) => p.name).filter((n: string) => n !== dn);
      setOnlineUsers([...new Set(users)] as string[]);
    });
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ name: displayName || myName });
        setConnected(true);
      }
    });
    channelRef.current = channel;

    return () => {
      supabase.removeChannel(msgSub);
      supabase.removeChannel(channel);
      setConnected(false);
    };
  }, [myName, shopName]);

  const joinChat = () => {
    const n = nameInput.trim();
    if (!n) return;
    if (rememberMe) localStorage.setItem("dm_username", n);
    setMyName(n);
    setShowNameModal(false);
  };

  const saveShopName = () => {
    const s = shopNameInput.trim();
    setShopName(s);
    if (s) localStorage.setItem("dm_shopname", s);
    else localStorage.removeItem("dm_shopname");
    setShowShopEdit(false);
  };

  const sendRt = async () => {
    if (!rtInput.trim()) return;
    const dn = displayName || myName;
    await supabase.from("messages").insert({
      from_name: dn,
      to_name: chatWith,
      text: rtInput.trim(),
    });
    setRtInput("");
  };

  const openChat = (user: string | null) => {
    setChatWith(user);
    setTab("messages");
    setUnread(p => ({ ...p, [user === null ? "__public__" : user]: 0 }));
    setMenuOpen(false);
  };

  const addProduct = async () => {
    if (!newProd.name.trim()) return;
    const ownerName = displayName || myName;
    await supabase.from("products").insert({ ...newProd, owner: ownerName });
    setNewProd({ name:"", price:"", description:"", emoji:"📦" });
    setShowAddProd(false);
  };

  const deleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("id", id);
  };

  const dn = displayName || myName;

  const currentMsgs = dbMessages.filter(msg => {
    if (chatWith === null) return msg.to_name === null;
    return (msg.from_name === dn && msg.to_name === chatWith) ||
           (msg.from_name === chatWith && msg.to_name === dn);
  });

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);
  const blurAmount = Math.min(scrollY / 20, 10);
  const parallax = scrollY * 0.35;
  const modes = ["Tous","✈️ Aérien","🚢 Maritime","🚛 Routier"];

  const filtered = agencies.filter(a => {
    const q = search.toLowerCase();
    return (!search || a.name.toLowerCase().includes(q) || a.destinations.some(d => d.toLowerCase().includes(q)) || a.type.toLowerCase().includes(q)) && (modeFilter === "Tous" || a.modes.includes(modeFilter));
  }).sort((a, b) => {
    if (sortBy === "prix") return (parseFloat(a.prix_kg) || 999) - (parseFloat(b.prix_kg) || 999);
    if (sortBy === "note") return b.note - a.note;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Admin data
  const adminAllUsers = [...new Set(dbMessages.flatMap(m => [m.from_name, m.to_name].filter(Boolean) as string[]))];
  const adminShopOwners = [...new Set(products.map(p => p.owner))];
  const adminClients = adminAllUsers.filter(u => !adminShopOwners.includes(u));

  const navTabs: Array<[string, string]> = [
    ["agences","🏢 Agences"],
    ["boutique","🏪 Boutique"],
    ["comparateur","⚖️ Comparer"],
    ["devis","📋 Devis"],
    ["messages","💬 Messages"],
  ];
  if (isOwner) navTabs.push(["admin","⚙️ Admin"]);

  return (
    <main style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#f1f5f9", minHeight:"100vh" }}>

      {/* NAVBAR */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, background:"rgba(8,16,32,0.93)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.07)", height:62, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => { setTab("agences"); setMenuOpen(false); }}>
          <div style={{ width:36, height:36, borderRadius:9, background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, color:"#fff" }}>DM</div>
          <span style={{ fontWeight:900, fontSize:18, color:"#fff", letterSpacing:-0.5 }}>DelivraMaroc</span>
          <span style={{ fontSize:10, color:"#22d3ee", border:"1px solid rgba(34,211,238,0.35)", borderRadius:100, padding:"1px 7px" }}>BETA</span>
        </div>
        <div style={{ display:"flex", gap:2, alignItems:"center" }} className="desktop-nav">
          {navTabs.map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key as typeof tab); if(key==="messages") setUnread({}); }} style={{ padding:"7px 11px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", border:"none", background:tab===key?"rgba(34,211,238,0.12)":"transparent", color:tab===key?"#22d3ee":"#94a3b8", position:"relative", transition:"all 0.2s" }}>
              {label}
              {key==="messages" && totalUnread>0 && <span style={{ position:"absolute", top:1, right:1, background:"#ef4444", color:"#fff", borderRadius:100, fontSize:8, fontWeight:700, padding:"1px 4px" }}>{totalUnread}</span>}
            </button>
          ))}
          {myName && (
            <div style={{ marginLeft:6, display:"flex", alignItems:"center", gap:6, background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:8, padding:"5px 11px" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:connected?"#22c55e":"#f59e0b", display:"inline-block" }}/>
              <span style={{ fontSize:12, color:"#67e8f9", fontWeight:600 }}>{dn}{isOwner?" 👑":""}</span>
            </div>
          )}
          <button onClick={() => { setShowForm(true); setFormType("agence"); setFormStatus("idle"); }} style={{ marginLeft:6, background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", color:"#fff", border:"none", borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>+ Inscrire agence</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="burger" style={{ display:"none", background:"transparent", border:"none", color:"#fff", fontSize:24, cursor:"pointer" }}>☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed", top:62, left:0, right:0, zIndex:299, background:"rgba(8,16,32,0.97)", backdropFilter:"blur(20px)", padding:"12px 1rem", display:"flex", flexDirection:"column" as const, gap:4 }}>
          {navTabs.map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key as typeof tab); setMenuOpen(false); }} style={{ padding:"12px 16px", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer", border:"none", background:tab===key?"rgba(34,211,238,0.12)":"transparent", color:tab===key?"#22d3ee":"#94a3b8", textAlign:"left" as const }}>{label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      {tab==="agences" && (
        <section ref={heroRef} style={{ position:"relative", minHeight:600, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", color:"#fff", textAlign:"center" }}>
          <div style={{ position:"absolute", inset:"-25%", transform:`translateY(${parallax}px)`, filter:`blur(${blurAmount}px)`, transition:"filter 0.1s ease", willChange:"transform,filter" }}>
            <Image src="/hero.png" alt="DelivraMaroc" fill priority style={{ objectFit:"cover", objectPosition:"center" }}/>
          </div>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(3,8,20,0.70) 0%,rgba(3,8,20,0.50) 40%,rgba(3,8,20,0.88) 100%)" }}/>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:820, padding:"140px 2rem 100px", zIndex:10 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(34,211,238,0.10)", border:"1px solid rgba(34,211,238,0.28)", borderRadius:100, padding:"6px 18px", fontSize:13, fontWeight:600, color:"#67e8f9", marginBottom:24, backdropFilter:"blur(10px)" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#22d3ee", display:"inline-block", boxShadow:"0 0 8px #22d3ee" }}/>
              🇲🇦 La 1ère plateforme livraison Maroc–Afrique
            </div>
            <h1 style={{ fontSize:"clamp(2.2rem,5.5vw,4rem)", fontWeight:900, margin:"0 0 6px", lineHeight:1.06, letterSpacing:-2, textShadow:"0 2px 24px rgba(0,0,0,0.6)" }}>Connectez-vous aux</h1>
            <h1 style={{ fontSize:"clamp(2.2rem,5.5vw,4rem)", fontWeight:900, margin:"0 0 22px", lineHeight:1.06, letterSpacing:-2, color:"#22d3ee", textShadow:"0 0 50px rgba(34,211,238,0.4)" }}>meilleures agences de livraison</h1>
            <p style={{ fontSize:17, color:"rgba(255,255,255,0.72)", lineHeight:1.7, maxWidth:560, margin:"0 auto 44px", textShadow:"0 1px 8px rgba(0,0,0,0.5)" }}>Comparez les tarifs · Chattez en direct · Envoyez vos colis vers l&apos;Afrique</p>
            <div style={{ display:"flex", maxWidth:660, margin:"0 auto 48px", borderRadius:14, overflow:"hidden", boxShadow:"0 16px 48px rgba(0,0,0,0.55)", border:"1px solid rgba(34,211,238,0.18)" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Destination, pays, type de colis..." style={{ flex:1, padding:"18px 22px", border:"none", fontSize:15, outline:"none", background:"rgba(255,255,255,0.97)", color:"#0f172a" }} onKeyDown={e=>{if(e.key==="Enter")setTab("comparateur");}}/>
              <button onClick={()=>setTab("comparateur")} style={{ background:"linear-gradient(135deg,#22d3ee,#0369a1)", color:"#fff", border:"none", padding:"18px 30px", fontSize:15, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" }}>COMPARER →</button>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:"2.5rem", flexWrap:"wrap" }}>
              {[{v:"7+",l:"Agences"},{v:"20+",l:"Pays"},{v:"3",l:"Modes"},{v:`${onlineUsers.length+1}`,l:"En ligne"}].map(s=>(
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:30, fontWeight:900, color:"#22d3ee", lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginTop:6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ maxWidth:1200, margin:"0 auto", padding:tab==="agences"?"32px 1.5rem":"82px 1.5rem 32px" }}>

        {/* AGENCES */}
        {tab==="agences" && (
          <>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:28, flexWrap:"wrap" }}>
              {modes.map(m=><button key={m} onClick={()=>setModeFilter(m)} style={{ padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:600, cursor:"pointer", border:"2px solid", background:modeFilter===m?"#0ea5e9":"#fff", color:modeFilter===m?"#fff":"#475569", borderColor:modeFilter===m?"#0ea5e9":"#e2e8f0", transition:"all 0.2s" }}>{m}</button>)}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:22 }}>
              {filtered.map(ag=>(
                <div key={ag.id} style={{ background:"#fff", borderRadius:20, border:ag.featured?"2px solid #0ea5e9":"1px solid #e2e8f0", overflow:"hidden", boxShadow:ag.featured?"0 4px 24px rgba(14,165,233,0.12)":"0 2px 12px rgba(0,0,0,0.05)", transition:"all 0.25s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-5px)";(e.currentTarget as HTMLElement).style.boxShadow="0 20px 48px rgba(0,0,0,0.12)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow=ag.featured?"0 4px 24px rgba(14,165,233,0.12)":"0 2px 12px rgba(0,0,0,0.05)";}}>
                  {ag.featured && <div style={{ background:"linear-gradient(90deg,#0ea5e9,#0369a1)", color:"#fff", fontSize:10, fontWeight:700, textAlign:"center", padding:"5px", letterSpacing:1 }}>⭐ AGENCE RECOMMANDÉE</div>}
                  <div style={{ background:ag.bg, padding:"18px 20px", borderBottom:"1px solid #f1f5f9", display:"flex", gap:14, alignItems:"center" }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:ag.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:16, flexShrink:0 }}>{ag.logo}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:2 }}>
                        <span style={{ fontWeight:800, fontSize:15, color:"#0f172a" }}>{ag.name}</span>
                        {ag.verified && <span style={{ background:"#dcfce7", color:"#166534", fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:100 }}>✓ Vérifié</span>}
                        <span style={{ background:ag.color, color:"#fff", fontSize:9, fontWeight:700, padding:"1px 7px", borderRadius:100 }}>{ag.badge}</span>
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ag.slogan}</div>
                    </div>
                  </div>
                  <div style={{ padding:"16px 20px" }}>
                    <Stars n={ag.note} avis={ag.avis}/>
                    <p style={{ fontSize:12, color:"#64748b", margin:"10px 0", lineHeight:1.5 }}>{ag.description}</p>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
                      {ag.modes.map(m=><span key={m} style={{ background:"#f1f5f9", color:"#475569", fontSize:11, padding:"3px 9px", borderRadius:100, fontWeight:600 }}>{m}</span>)}
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:5, textTransform:"uppercase" as const, letterSpacing:0.6 }}>Destinations</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                        {ag.destinations.slice(0,4).map(d=><span key={d} style={{ background:"#f8fafc", border:"1px solid #e2e8f0", color:"#334155", fontSize:10, padding:"2px 7px", borderRadius:5 }}>{d}</span>)}
                        {ag.destinations.length>4 && <span style={{ background:ag.color, color:"#fff", fontSize:10, padding:"2px 7px", borderRadius:5, fontWeight:700 }}>+{ag.destinations.length-4} pays</span>}
                      </div>
                    </div>
                    {ag.adresse && <div style={{ display:"flex", gap:5, alignItems:"flex-start", marginBottom:6 }}><span>📍</span><span style={{ fontSize:11, color:"#64748b" }}>{ag.adresse}</span></div>}
                    {ag.horaires && <div style={{ display:"flex", gap:5, alignItems:"center", marginBottom:10 }}><span>🕐</span><span style={{ fontSize:11, color:"#64748b" }}>{ag.horaires}</span></div>}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                      <div style={{ background:"#f8fafc", borderRadius:10, padding:"10px", textAlign:"center" as const }}><div style={{ fontSize:9, color:"#94a3b8", fontWeight:700, marginBottom:3, textTransform:"uppercase" as const }}>Tarif</div><div style={{ fontSize:13, fontWeight:800, color:ag.color }}>{ag.prix_kg}</div></div>
                      <div style={{ background:"#f8fafc", borderRadius:10, padding:"10px", textAlign:"center" as const }}><div style={{ fontSize:9, color:"#94a3b8", fontWeight:700, marginBottom:3, textTransform:"uppercase" as const }}>Délai</div><div style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>{ag.delai}</div></div>
                    </div>
                    <button onClick={()=>setShowTarifs(showTarifs===ag.id?null:ag.id)} style={{ width:"100%", padding:"8px", borderRadius:8, border:`1px solid ${ag.color}33`, color:ag.color, background:`${ag.color}08`, fontSize:12, fontWeight:600, cursor:"pointer", marginBottom:10 }}>{showTarifs===ag.id?"▲ Masquer":"📊 Grille tarifaire"}</button>
                    {showTarifs===ag.id && (
                      <div style={{ marginBottom:12, borderRadius:10, overflow:"hidden", border:"1px solid #e2e8f0" }}>
                        <table style={{ width:"100%", borderCollapse:"collapse" as const, fontSize:11 }}>
                          <thead><tr style={{ background:ag.color }}><th style={{ padding:"7px 10px", textAlign:"left" as const, color:"#fff" }}>Service</th><th style={{ padding:"7px 10px", textAlign:"center" as const, color:"#fff" }}>Prix</th><th style={{ padding:"7px 10px", textAlign:"center" as const, color:"#fff" }}>Délai</th></tr></thead>
                          <tbody>{ag.tarifs.map((t,i)=><tr key={i} style={{ background:i%2===0?"#f8fafc":"#fff", borderTop:"1px solid #f1f5f9" }}><td style={{ padding:"6px 10px", color:"#334155" }}>{t.article}</td><td style={{ padding:"6px 10px", textAlign:"center" as const, color:ag.color, fontWeight:700 }}>{t.prix}</td><td style={{ padding:"6px 10px", textAlign:"center" as const, color:"#64748b" }}>{t.delai}</td></tr>)}</tbody>
                        </table>
                        {ag.specials.length>0 && <div style={{ padding:"10px", background:"#fffbeb", borderTop:"1px solid #fde68a" }}><div style={{ fontSize:10, fontWeight:700, color:"#92400e", marginBottom:6 }}>⚠️ Tarifs spéciaux :</div><div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{ag.specials.map((s,i)=><span key={i} style={{ background:"#fff", border:"1px solid #fcd34d", color:"#92400e", fontSize:10, padding:"2px 7px", borderRadius:5 }}>{typeof s==="string"?s:`${s.nom} : ${s.prix}`}</span>)}</div></div>}
                      </div>
                    )}
                    {ag.contacts.slice(0,2).map((c,i)=>(
                      <a key={i} href={`tel:${c.tel}`} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc", border:"1px solid #e2e8f0", color:"#334155", textDecoration:"none", padding:"8px 12px", borderRadius:8, fontSize:11, marginBottom:5 }}>
                        <span style={{ color:"#94a3b8" }}>📞 {c.label}</span><span style={{ fontWeight:700 }}>{c.tel}</span>
                      </a>
                    ))}
                    {ag.contacts.length>2 && <div style={{ fontSize:10, color:"#94a3b8", textAlign:"center" as const, padding:"3px" }}>+{ag.contacts.length-2} autres contacts</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BOUTIQUE */}
        {tab==="boutique" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
              <div>
                <h2 style={{ fontSize:24, fontWeight:800, color:"#0f172a", margin:0 }}>🏪 {isOwner ? (shopName || myName) : "Boutique"}</h2>
                <p style={{ color:"#64748b", fontSize:13, margin:"4px 0 0" }}>{isOwner?"Gérez vos produits · Vos clients vous contactent en direct":"Contactez le vendeur directement via la messagerie"}</p>
              </div>
              {isOwner && (
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>setShowShopEdit(true)} style={{ background:"#f1f5f9", color:"#475569", border:"1px solid #e2e8f0", borderRadius:10, padding:"10px 16px", fontSize:13, fontWeight:600, cursor:"pointer" }}>✏️ Nom boutique</button>
                  <button onClick={()=>setShowAddProd(true)} style={{ background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>＋ Ajouter un produit</button>
                </div>
              )}
            </div>

            {isOwner && (
              <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius:16, padding:"20px 24px", marginBottom:28, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                <div style={{ fontSize:32 }}>👑</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#22d3ee", fontWeight:800, fontSize:15 }}>Mode Propriétaire · {dn}</div>
                  <div style={{ color:"#64748b", fontSize:12, marginTop:3 }}>Nom affiché dans le chat : <strong style={{ color:"#67e8f9" }}>{dn}</strong> · {onlineUsers.length} visiteur(s) connecté(s)</div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {onlineUsers.map(u=>(
                    <button key={u} onClick={()=>openChat(u)} style={{ background:"rgba(34,211,238,0.1)", border:"1px solid rgba(34,211,238,0.25)", color:"#67e8f9", borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer", fontWeight:600 }}>💬 {u}</button>
                  ))}
                </div>
              </div>
            )}

            {products.length===0 ? (
              <div style={{ textAlign:"center", padding:"80px 20px", color:"#94a3b8" }}>
                <div style={{ fontSize:64, marginBottom:16 }}>🏪</div>
                <div style={{ fontSize:18, fontWeight:700, color:"#64748b", marginBottom:8 }}>{isOwner?"Votre boutique est vide":"La boutique est vide pour l'instant"}</div>
                <div style={{ fontSize:13 }}>{isOwner?"Cliquez sur « Ajouter un produit » pour commencer":"Revenez bientôt !"}</div>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
                {products.map(p=>(
                  <div key={p.id} style={{ background:"#fff", borderRadius:18, overflow:"hidden", border:"1px solid #e2e8f0", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", transition:"all 0.25s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLElement).style.boxShadow="0 16px 40px rgba(0,0,0,0.10)";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow="0 2px 12px rgba(0,0,0,0.05)";}}>
                    <div style={{ background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)", height:130, display:"flex", alignItems:"center", justifyContent:"center", fontSize:60 }}>{p.emoji}</div>
                    <div style={{ padding:"16px" }}>
                      <div style={{ fontWeight:800, fontSize:16, color:"#0f172a", marginBottom:2 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:"#94a3b8", marginBottom:6 }}>par {p.owner}</div>
                      {p.description && <div style={{ fontSize:12, color:"#64748b", marginBottom:10, lineHeight:1.5 }}>{p.description}</div>}
                      {p.price && <div style={{ fontSize:20, fontWeight:900, color:"#0ea5e9", marginBottom:12 }}>{p.price}</div>}
                      {isOwner ? (
                        <button onClick={()=>deleteProduct(p.id)} style={{ width:"100%", padding:"9px", borderRadius:8, border:"1px solid #fecaca", background:"#fef2f2", color:"#dc2626", fontSize:12, fontWeight:600, cursor:"pointer" }}>🗑️ Supprimer</button>
                      ) : (
                        <button onClick={()=>{ openChat(p.owner); setTimeout(()=>{},200); }} style={{ width:"100%", padding:"10px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#0ea5e9,#0369a1)", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                          💬 Contacter {p.owner}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* COMPARATEUR */}
        {tab==="comparateur" && (
          <div>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#0f172a", marginBottom:20, marginTop:0 }}>⚖️ Comparateur d&apos;agences</h2>
            <div style={{ background:"#fff", borderRadius:14, padding:"16px", marginBottom:20, border:"1px solid #e2e8f0", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Destination ou pays..." style={{ flex:1, minWidth:180, padding:"9px 14px", borderRadius:9, border:"1px solid #e2e8f0", fontSize:13, outline:"none" }}/>
              {modes.map(m=><button key={m} onClick={()=>setModeFilter(m)} style={{ padding:"7px 13px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", border:"2px solid", background:modeFilter===m?"#0ea5e9":"#fff", color:modeFilter===m?"#fff":"#475569", borderColor:modeFilter===m?"#0ea5e9":"#e2e8f0" }}>{m}</button>)}
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ padding:"8px 12px", borderRadius:9, border:"1px solid #e2e8f0", fontSize:12, outline:"none", background:"#fff", cursor:"pointer" }}>
                <option value="featured">⭐ Recommandés</option>
                <option value="prix">💰 Meilleur prix</option>
                <option value="note">⭐ Meilleures notes</option>
              </select>
            </div>
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e2e8f0", overflow:"auto", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" as const, minWidth:700 }}>
                <thead><tr style={{ background:"#0f172a" }}>{["Agence","Mode","Tarif/kg","Délai","Note","Contact"].map(h=><th key={h} style={{ padding:"13px 16px", textAlign:"left" as const, color:"#64748b", fontSize:11, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase" as const }}>{h}</th>)}</tr></thead>
                <tbody>
                  {filtered.map((a,i)=>(
                    <tr key={a.id} style={{ borderTop:"1px solid #f1f5f9", background:a.featured?"#f0f9ff":i%2===0?"#fff":"#fafafa", transition:"background 0.15s" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="#e0f2fe"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background=a.featured?"#f0f9ff":i%2===0?"#fff":"#fafafa"}>
                      <td style={{ padding:"13px 16px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:36, height:36, borderRadius:9, background:a.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:12, flexShrink:0 }}>{a.logo}</div>
                          <div><div style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>{a.name}{a.verified&&<span style={{ background:"#dcfce7", color:"#166534", fontSize:9, padding:"1px 5px", borderRadius:100, marginLeft:5 }}>✓</span>}</div><div style={{ fontSize:10, color:"#94a3b8" }}>{a.adresse}</div></div>
                        </div>
                      </td>
                      <td style={{ padding:"13px 16px" }}><div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>{a.modes.map(m=><span key={m} style={{ background:"#f1f5f9", color:"#475569", fontSize:10, padding:"2px 6px", borderRadius:100, fontWeight:600 }}>{m}</span>)}</div></td>
                      <td style={{ padding:"13px 16px" }}><span style={{ fontWeight:800, fontSize:14, color:a.color }}>{a.prix_kg}</span></td>
                      <td style={{ padding:"13px 16px", fontSize:12, color:"#475569", fontWeight:600 }}>{a.delai}</td>
                      <td style={{ padding:"13px 16px" }}><Stars n={a.note} avis={a.avis}/></td>
                      <td style={{ padding:"13px 16px" }}><a href={`tel:${a.contacts[0]?.tel}`} style={{ background:a.color, color:"#fff", borderRadius:7, padding:"7px 13px", fontSize:11, fontWeight:700, cursor:"pointer", textDecoration:"none", display:"inline-block" }}>📞 Appeler</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DEVIS */}
        {tab==="devis" && (
          <div style={{ maxWidth:620, margin:"0 auto" }}>
            <div style={{ background:"#fff", borderRadius:20, padding:"36px", border:"1px solid #e2e8f0", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
              {!devisOk ? (
                <>
                  <h2 style={{ fontSize:22, fontWeight:800, color:"#0f172a", marginTop:0, marginBottom:6 }}>📋 Publier une demande de devis</h2>
                  <p style={{ color:"#64748b", fontSize:13, marginBottom:28, lineHeight:1.6 }}>Décrivez votre colis. Les agences vous répondront.</p>
                  <div style={{ display:"flex", flexDirection:"column" as const, gap:15 }}>
                    {[{k:"poids",l:"Poids estimé (kg)",t:"number",p:"Ex: 5"},{k:"dest",l:"Destination",t:"text",p:"Ex: Dakar, Sénégal"},{k:"type",l:"Type de colis",t:"text",p:"Ex: vêtements, cosmétiques..."}].map(f=>(
                      <div key={f.k}><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>{f.l}</label><input type={f.t} placeholder={f.p} value={devis[f.k as keyof typeof devis]} onChange={e=>setDevis({...devis,[f.k]:e.target.value})} style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box" as const }}/></div>
                    ))}
                    <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>Informations complémentaires</label><textarea rows={3} placeholder="Date souhaitée, contraintes..." value={devis.desc} onChange={e=>setDevis({...devis,desc:e.target.value})} style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #e2e8f0", fontSize:13, outline:"none", resize:"none" as const, boxSizing:"border-box" as const }}/></div>
                    <button onClick={()=>{if(devis.poids&&devis.dest)setDevisOk(true);}} style={{ background:"linear-gradient(135deg,#0ea5e9,#0369a1)", color:"#fff", border:"none", borderRadius:12, padding:"14px", fontSize:15, fontWeight:700, cursor:"pointer" }}>📤 Publier ma demande</button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign:"center" as const, padding:"20px 0" }}>
                  <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Demande publiée !</h3>
                  <button onClick={()=>{setTab("messages");setDevisOk(false);setDevis({poids:"",dest:"",type:"",desc:""}); }} style={{ background:"#0ea5e9", color:"#fff", border:"none", borderRadius:10, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer" }}>💬 Aller à la messagerie →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab==="messages" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <h2 style={{ fontSize:22, fontWeight:800, color:"#0f172a", margin:0 }}>💬 Messagerie en direct</h2>
              {myName && (
                <div style={{ fontSize:12, color:"#64748b", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:connected?"#22c55e":"#f59e0b", display:"inline-block" }}/>
                  <strong style={{ color:"#0ea5e9" }}>{dn}{isOwner?" 👑":""}</strong>
                  <span style={{ color:connected?"#22c55e":"#f59e0b" }}>{connected?"· Connecté":"· Connexion…"}</span>
                </div>
              )}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:0, borderRadius:16, overflow:"hidden", border:"1px solid #e2e8f0", boxShadow:"0 4px 24px rgba(0,0,0,0.07)", height:580 }}>
              {/* Sidebar */}
              <div style={{ background:"#fff", borderRight:"1px solid #f1f5f9", display:"flex", flexDirection:"column" as const, overflowY:"auto" as const }}>
                <div style={{ padding:"14px 16px", background:"#0f172a", flexShrink:0 }}>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:13 }}>Conversations</div>
                  <div style={{ color:"#475569", fontSize:11, marginTop:2 }}>🟢 {onlineUsers.length + 1} en ligne</div>
                </div>
                <div onClick={()=>openChat(null)} style={{ padding:"12px 14px", borderBottom:"1px solid #f1f5f9", cursor:"pointer", background:chatWith===null?"#eff6ff":"#fff", display:"flex", gap:10, alignItems:"center" }}
                  onMouseEnter={e=>{if(chatWith!==null)(e.currentTarget as HTMLElement).style.background="#f8fafc";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=chatWith===null?"#eff6ff":"#fff";}}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🌍</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:12, color:"#0f172a" }}>Chat public</div>
                    <div style={{ fontSize:11, color:"#94a3b8" }}>Visible par tous</div>
                  </div>
                  {(unread["__public__"]||0)>0 && <span style={{ background:"#ef4444", color:"#fff", borderRadius:100, fontSize:10, fontWeight:700, padding:"1px 6px" }}>{unread["__public__"]}</span>}
                </div>
                {onlineUsers.length===0 ? (
                  <div style={{ padding:"24px 16px", textAlign:"center" as const, color:"#94a3b8", fontSize:12 }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>👥</div>
                    Personne d&apos;autre en ligne<br/>
                    <span style={{ fontSize:11, marginTop:4, display:"block" }}>Partage le lien Vercel !</span>
                  </div>
                ) : onlineUsers.map(u=>(
                  <div key={u} onClick={()=>openChat(u)} style={{ padding:"12px 14px", borderBottom:"1px solid #f8fafc", cursor:"pointer", background:chatWith===u?"#eff6ff":"#fff", display:"flex", gap:10, alignItems:"center" }}
                    onMouseEnter={e=>{if(chatWith!==u)(e.currentTarget as HTMLElement).style.background="#f8fafc";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=chatWith===u?"#eff6ff":"#fff";}}>
                    <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#7c3aed,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:15, flexShrink:0, position:"relative" }}>
                      {u[0].toUpperCase()}
                      <div style={{ position:"absolute", bottom:-2, right:-2, width:10, height:10, borderRadius:"50%", background:"#22c55e", border:"2px solid #fff" }}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:12, color:"#0f172a" }}>{u}</div>
                      <div style={{ fontSize:11, color:"#22c55e" }}>En ligne</div>
                    </div>
                    {(unread[u]||0)>0 && <span style={{ background:"#ef4444", color:"#fff", borderRadius:100, fontSize:10, fontWeight:700, padding:"1px 6px" }}>{unread[u]}</span>}
                  </div>
                ))}
              </div>

              {/* Zone chat */}
              <div style={{ display:"flex", flexDirection:"column" as const, background:"#f8fafc" }}>
                <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", background:"#fff", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:chatWith===null?"linear-gradient(135deg,#22d3ee,#0ea5e9)":"linear-gradient(135deg,#7c3aed,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:chatWith===null?18:16, color:"#fff", fontWeight:900 }}>
                    {chatWith===null?"🌍":chatWith[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:14, color:"#0f172a" }}>{chatWith===null?"Chat public":chatWith}</div>
                    <div style={{ fontSize:11, color:"#22c55e" }}>{chatWith===null?`${onlineUsers.length+1} participant(s)`:"En ligne · Message privé"}</div>
                  </div>
                </div>
                <div style={{ flex:1, overflowY:"auto" as const, padding:"20px", display:"flex", flexDirection:"column" as const, gap:10 }}>
                  {currentMsgs.length===0 && (
                    <div style={{ textAlign:"center" as const, color:"#94a3b8", marginTop:60 }}>
                      <div style={{ fontSize:40, marginBottom:8, opacity:0.4 }}>💬</div>
                      <div style={{ fontSize:13 }}>Aucun message · Soyez le premier !</div>
                    </div>
                  )}
                  {currentMsgs.map(msg=>(
                    <div key={msg.id} style={{ display:"flex", justifyContent:msg.from_name===dn?"flex-end":"flex-start", alignItems:"flex-end", gap:8 }}>
                      {msg.from_name!==dn && <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#7c3aed,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:11, flexShrink:0 }}>{msg.from_name[0].toUpperCase()}</div>}
                      <div style={{ maxWidth:"70%" }}>
                        {msg.from_name!==dn && <div style={{ fontSize:10, color:"#94a3b8", marginBottom:3, fontWeight:600 }}>{msg.from_name}</div>}
                        <div style={{ background:msg.from_name===dn?"linear-gradient(135deg,#0ea5e9,#0369a1)":"#fff", color:msg.from_name===dn?"#fff":"#334155", borderRadius:msg.from_name===dn?"16px 16px 4px 16px":"16px 16px 16px 4px", padding:"10px 14px", fontSize:13, boxShadow:msg.from_name!==dn?"0 1px 6px rgba(0,0,0,0.08)":"none", lineHeight:1.5 }}>
                          {msg.text}
                          <div style={{ fontSize:10, opacity:0.5, marginTop:4, textAlign:"right" as const }}>{new Date(msg.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef}/>
                </div>
                <div style={{ padding:"6px 16px", background:"#fffbeb", borderTop:"1px solid #fef3c7", fontSize:10, color:"#92400e", textAlign:"center" as const, flexShrink:0 }}>
                  ⚡ Historique sauvegardé · Supabase Realtime
                </div>
                <div style={{ padding:"12px 16px", borderTop:"1px solid #f1f5f9", background:"#fff", display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
                  <input value={rtInput} onChange={e=>setRtInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendRt();}} placeholder={myName?`Message ${chatWith?`privé à ${chatWith}`:"public"}...`:"Connectez-vous d'abord…"} disabled={!myName||!connected} style={{ flex:1, padding:"10px 16px", borderRadius:24, border:"1px solid #e2e8f0", fontSize:14, outline:"none", background:"#f8fafc" }}/>
                  <button onClick={sendRt} disabled={!myName||!rtInput.trim()||!connected} style={{ background:"linear-gradient(135deg,#0ea5e9,#0369a1)", color:"#fff", border:"none", borderRadius:"50%", width:42, height:42, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity:(!myName||!rtInput.trim()||!connected)?0.4:1 }}>➤</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN (localhost seulement) */}
        {tab==="admin" && isOwner && (
          <div>
            <div style={{ marginBottom:28 }}>
              <h2 style={{ fontSize:24, fontWeight:800, color:"#0f172a", margin:"0 0 4px" }}>⚙️ Panel Administrateur</h2>
              <p style={{ color:"#64748b", fontSize:13, margin:0 }}>Vue complète de la plateforme · Accessible uniquement en local</p>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:32 }}>
              {[
                { icon:"💬", label:"Messages total", value:dbMessages.length },
                { icon:"🏪", label:"Boutiques", value:adminShopOwners.length },
                { icon:"👥", label:"Clients", value:adminClients.length },
                { icon:"📦", label:"Produits", value:products.length },
                { icon:"🟢", label:"En ligne", value:onlineUsers.length+1 },
              ].map(s=>(
                <div key={s.label} style={{ background:"#fff", borderRadius:16, padding:"20px", border:"1px solid #e2e8f0", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                  <div style={{ fontSize:28, fontWeight:900, color:"#0ea5e9", lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:4, fontWeight:600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
              {/* Boutiques */}
              <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid #e2e8f0" }}>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#0f172a", margin:"0 0 16px" }}>🏪 Boutiques ({adminShopOwners.length})</h3>
                {adminShopOwners.length===0 ? (
                  <div style={{ color:"#94a3b8", fontSize:13, textAlign:"center" as const, padding:"20px" }}>Aucune boutique</div>
                ) : adminShopOwners.map(owner=>{
                  const ownerProducts = products.filter(p=>p.owner===owner);
                  return (
                    <div key={owner} style={{ padding:"12px", borderRadius:10, border:"1px solid #f1f5f9", marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#0ea5e9,#0369a1)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:14 }}>{owner[0].toUpperCase()}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>{owner}</div>
                        <div style={{ fontSize:11, color:"#64748b" }}>{ownerProducts.length} produit(s)</div>
                      </div>
                      <button onClick={()=>openChat(owner)} style={{ background:"#eff6ff", color:"#0ea5e9", border:"none", borderRadius:8, padding:"6px 10px", fontSize:11, fontWeight:600, cursor:"pointer" }}>💬</button>
                    </div>
                  );
                })}
              </div>

              {/* Clients */}
              <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid #e2e8f0" }}>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#0f172a", margin:"0 0 16px" }}>👥 Clients ({adminClients.length})</h3>
                {adminClients.length===0 ? (
                  <div style={{ color:"#94a3b8", fontSize:13, textAlign:"center" as const, padding:"20px" }}>Aucun client encore</div>
                ) : adminClients.map(client=>{
                  const clientMsgs = dbMessages.filter(m=>m.from_name===client||m.to_name===client);
                  const lastMsg = clientMsgs[clientMsgs.length-1];
                  return (
                    <div key={client} style={{ padding:"12px", borderRadius:10, border:"1px solid #f1f5f9", marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#7c3aed,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:14 }}>{client[0].toUpperCase()}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>{client}</div>
                        {lastMsg && <div style={{ fontSize:11, color:"#94a3b8", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lastMsg.text}</div>}
                        <div style={{ fontSize:10, color:"#cbd5e1" }}>{clientMsgs.length} message(s)</div>
                      </div>
                      <button onClick={()=>openChat(client)} style={{ background:"#faf5ff", color:"#7c3aed", border:"none", borderRadius:8, padding:"6px 10px", fontSize:11, fontWeight:600, cursor:"pointer" }}>💬</button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Historique messages */}
            <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid #e2e8f0", marginTop:24 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:"#0f172a", margin:"0 0 16px" }}>📜 Derniers messages ({dbMessages.length})</h3>
              <div style={{ maxHeight:320, overflowY:"auto" as const }}>
                {dbMessages.slice(-30).reverse().map(m=>(
                  <div key={m.id} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:"1px solid #f8fafc", alignItems:"flex-start" }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#0ea5e9,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:12, flexShrink:0 }}>{m.from_name[0].toUpperCase()}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:2 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>{m.from_name}</span>
                        {m.to_name && <><span style={{ fontSize:10, color:"#94a3b8" }}>→</span><span style={{ fontSize:11, color:"#0ea5e9", fontWeight:600 }}>{m.to_name}</span></>}
                        {!m.to_name && <span style={{ fontSize:9, background:"#e0f2fe", color:"#0369a1", borderRadius:100, padding:"1px 6px", fontWeight:600 }}>PUBLIC</span>}
                        <span style={{ fontSize:10, color:"#cbd5e1", marginLeft:"auto" }}>{new Date(m.created_at).toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit"})}</span>
                      </div>
                      <div style={{ fontSize:12, color:"#475569", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <section style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f)", padding:"60px 2rem", textAlign:"center" as const }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:800, marginBottom:10 }}>Vous êtes une agence de livraison ?</h2>
          <p style={{ color:"#64748b", fontSize:14, marginBottom:28 }}>Rejoignez le réseau · Clients qualifiés · Visibilité gratuite</p>
          <button onClick={()=>{setShowForm(true);setFormType("agence");setFormStatus("idle");}} style={{ background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", color:"#fff", border:"none", borderRadius:12, padding:"13px 32px", fontSize:14, fontWeight:700, cursor:"pointer", marginRight:10, boxShadow:"0 4px 16px rgba(34,211,238,0.3)" }}>Inscrire mon agence →</button>
          <button onClick={()=>{setShowForm(true);setFormType("client");setFormStatus("idle");}} style={{ background:"transparent", color:"#94a3b8", border:"1px solid #334155", borderRadius:12, padding:"13px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Je suis client</button>
        </div>
      </section>

      <footer style={{ background:"#0a1020", color:"#334155", padding:"28px 2rem", textAlign:"center" as const, fontSize:12 }}>
        <div style={{ fontWeight:900, color:"#fff", fontSize:16, marginBottom:4 }}>DelivraMaroc</div>
        <div style={{ color:"#475569" }}>Marketplace de livraison Maroc–Afrique · Casablanca 🇲🇦</div>
        <div style={{ marginTop:6, color:"#1e293b" }}>© 2026 DelivraMaroc</div>
      </footer>

      {/* MODAL NOM BOUTIQUE */}
      {showShopEdit && (
        <div onClick={()=>setShowShopEdit(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(8px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:20, padding:"32px", maxWidth:400, width:"100%", boxShadow:"0 24px 64px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:"0 0 8px" }}>🏪 Nom de ma boutique</h3>
            <p style={{ color:"#64748b", fontSize:13, marginBottom:20 }}>Ce nom apparaîtra dans le chat à la place de votre prénom.</p>
            <input value={shopNameInput} onChange={e=>setShopNameInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")saveShopName();}} placeholder="Ex: Boutique Ivan, ShopMaroc..." autoFocus style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:"2px solid #e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box" as const, marginBottom:14 }}/>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setShowShopEdit(false)} style={{ flex:1, padding:"12px", borderRadius:10, border:"1px solid #e2e8f0", background:"#f8fafc", color:"#64748b", fontSize:14, fontWeight:600, cursor:"pointer" }}>Annuler</button>
              <button onClick={saveShopName} style={{ flex:2, background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", color:"#fff", border:"none", borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Enregistrer ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AJOUTER PRODUIT */}
      {showAddProd && (
        <div onClick={()=>setShowAddProd(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(8px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:20, padding:"32px", maxWidth:420, width:"100%", boxShadow:"0 24px 64px rgba(0,0,0,0.4)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:0 }}>➕ Nouveau produit</h3>
              <button onClick={()=>setShowAddProd(false)} style={{ background:"#f1f5f9", border:"none", borderRadius:"50%", width:32, height:32, fontSize:18, cursor:"pointer", color:"#64748b" }}>×</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column" as const, gap:14 }}>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:8 }}>Icône</label>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {EMOJIS.map(e=><button key={e} onClick={()=>setNewProd(p=>({...p,emoji:e}))} style={{ width:42, height:42, borderRadius:8, border:`2px solid ${newProd.emoji===e?"#0ea5e9":"#e2e8f0"}`, background:newProd.emoji===e?"#eff6ff":"#fff", fontSize:22, cursor:"pointer" }}>{e}</button>)}
                </div>
              </div>
              {[{k:"name",l:"Nom du produit *",p:"Ex: Sac en cuir"},{k:"price",l:"Prix",p:"Ex: 150 DH"},{k:"description",l:"Description",p:"Ex: Fait main, livraison possible"}].map(f=>(
                <div key={f.k}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>{f.l}</label>
                  <input value={newProd[f.k as keyof typeof newProd]} onChange={e=>setNewProd(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={{ width:"100%", padding:"10px 13px", borderRadius:9, border:"1px solid #e2e8f0", fontSize:13, outline:"none", boxSizing:"border-box" as const }}/>
                </div>
              ))}
              <button onClick={addProduct} style={{ background:"linear-gradient(135deg,#0ea5e9,#0369a1)", color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", marginTop:4 }}>Publier le produit ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INSCRIPTION */}
      {showForm && (
        <div onClick={()=>setShowForm(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.78)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(8px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:20, padding:"32px", maxWidth:460, width:"100%", maxHeight:"90vh", overflowY:"auto" as const, boxShadow:"0 24px 64px rgba(0,0,0,0.45)" }}>
            {formStatus==="success" ? (
              <div style={{ textAlign:"center" as const, padding:"20px 0" }}>
                <div style={{ fontSize:60, marginBottom:16 }}>🎉</div>
                <h3 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Inscription envoyée !</h3>
                <p style={{ color:"#64748b", lineHeight:1.6 }}>Notre équipe vous contactera dans les 24h.</p>
                <button onClick={()=>setShowForm(false)} style={{ marginTop:20, background:"#0ea5e9", color:"#fff", border:"none", borderRadius:10, padding:"11px 24px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Fermer</button>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                  <h3 style={{ fontSize:18, fontWeight:800, color:"#0f172a", margin:0 }}>{formType==="agence"?"📦 Inscrire mon agence":"🙋 Devenir client"}</h3>
                  <button onClick={()=>setShowForm(false)} style={{ background:"#f1f5f9", border:"none", borderRadius:"50%", width:32, height:32, fontSize:18, cursor:"pointer", color:"#64748b" }}>×</button>
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                  <button onClick={()=>setFormType("client")} style={{ flex:1, padding:"9px", borderRadius:9, border:"2px solid", borderColor:formType==="client"?"#0ea5e9":"#e2e8f0", background:formType==="client"?"#eff6ff":"#fff", fontWeight:600, cursor:"pointer", fontSize:12 }}>Je suis client</button>
                  <button onClick={()=>setFormType("agence")} style={{ flex:1, padding:"9px", borderRadius:9, border:"2px solid", borderColor:formType==="agence"?"#0ea5e9":"#e2e8f0", background:formType==="agence"?"#eff6ff":"#fff", fontWeight:600, cursor:"pointer", fontSize:12 }}>Je suis une agence</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column" as const, gap:13 }}>
                  {(formType==="agence"?([["Nom de l'agence *","nom"],["Responsable","responsable"],["Téléphone *","tel"],["Email","email"],["Zones desservies","zones"],["Tarif indicatif","tarif"]] as [string,string][]):([["Nom complet *","nom"],["Téléphone *","tel"],["Email","email"],["Ville","zones"]] as [string,string][])).map(([l,k])=>(
                    <div key={k}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>{l}</label>
                      <input value={formData[k as keyof typeof formData]} onChange={e=>setFormData({...formData,[k]:e.target.value})} placeholder={l.replace(" *","")} style={{ width:"100%", padding:"10px 13px", borderRadius:9, border:`1px solid ${formStatus==="error"&&(k==="nom"||k==="tel")&&!formData[k as keyof typeof formData]?"#ef4444":"#e2e8f0"}`, fontSize:13, outline:"none", boxSizing:"border-box" as const }}/>
                    </div>
                  ))}
                </div>
                {formStatus==="error" && <div style={{ marginTop:12, padding:"10px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, fontSize:12, color:"#dc2626" }}>⚠️ Remplissez les champs obligatoires (*)</div>}
                <button onClick={async()=>{
                  if(!formData.nom||!formData.tel){setFormStatus("error");return;}
                  setFormStatus("loading");
                  try{const res=await fetch("/api/inscriptions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...formData,type:formType,created_at:new Date().toISOString()})});if(res.ok){setFormStatus("success");setFormData({nom:"",responsable:"",tel:"",email:"",zones:"",tarif:""});}else setFormStatus("error");}catch{setFormStatus("error");}
                }} disabled={formStatus==="loading"} style={{ width:"100%", background:formStatus==="loading"?"#94a3b8":"linear-gradient(135deg,#0ea5e9,#0369a1)", color:"#fff", border:"none", borderRadius:11, padding:"13px", fontSize:14, fontWeight:700, cursor:formStatus==="loading"?"not-allowed":"pointer", marginTop:18 }}>
                  {formStatus==="loading"?"⏳ Envoi...":formType==="agence"?"Envoyer ma demande ✓":"Trouver une agence →"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL NOM */}
      {showNameModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(3,8,20,0.93)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem", backdropFilter:"blur(12px)" }}>
          <div style={{ background:"#fff", borderRadius:24, padding:"44px 36px", maxWidth:400, width:"100%", textAlign:"center" as const, boxShadow:"0 32px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>👋</div>
            <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", margin:"0 0 8px" }}>Bienvenue sur DelivraMaroc</h2>
            <p style={{ color:"#64748b", fontSize:13, marginBottom:24, lineHeight:1.7 }}>Entrez votre prénom pour rejoindre la plateforme et discuter en temps réel.</p>
            {isOwner && (
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"10px 14px", marginBottom:20, fontSize:12, color:"#166534", fontWeight:600 }}>
                👑 Vous êtes le propriétaire
              </div>
            )}
            <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")joinChat();}} placeholder="Votre prénom..." autoFocus style={{ width:"100%", padding:"14px 18px", borderRadius:12, border:"2px solid #e2e8f0", fontSize:16, outline:"none", boxSizing:"border-box" as const, marginBottom:14, textAlign:"center" as const, fontWeight:600 }}/>
            <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:18, cursor:"pointer", fontSize:13, color:"#64748b" }}>
              <input type="checkbox" checked={rememberMe} onChange={e=>setRememberMe(e.target.checked)} style={{ width:16, height:16, cursor:"pointer" }}/>
              Se souvenir de moi
            </label>
            <button onClick={joinChat} style={{ width:"100%", background:"linear-gradient(135deg,#22d3ee,#0ea5e9)", color:"#fff", border:"none", borderRadius:12, padding:"14px", fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(34,211,238,0.35)" }}>
              Rejoindre la plateforme →
            </button>
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
