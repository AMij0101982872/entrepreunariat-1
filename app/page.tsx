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

// Design tokens
const G = "#c9a84c"; // gold
const GL = "#f0d98a"; // gold light
const GD = "#8a6b1e"; // gold dark
const N1 = "#0a0f1e"; // navy darkest
const N2 = "#0f1f3d"; // navy dark
const N3 = "#1a3260"; // navy medium
const W = "#ffffff";
const BG = "#f5f6f8"; // background
const BORDER = "#e4e8ef";
const T1 = "#0f1f3d"; // text primary
const T2 = "#5a6b82"; // text secondary
const T3 = "#9aaabb"; // text muted

type DbMsg = { id: number; from_name: string; to_name: string | null; text: string; created_at: string };
type Product = { id: number; name: string; price: string; description: string; emoji: string; owner: string };
type Devis = { id: number; poids: string; destination: string; type_colis: string; description: string; nom: string; created_at: string; reponse: string | null; repondu_par: string | null; statut: string };

function Stars({ n, avis }: { n: number; avis: number }) {
  return (
    <span style={{ fontSize:12, color:T2 }}>
      <span style={{ color:G }}>{"★".repeat(Math.floor(n))}{"☆".repeat(5-Math.floor(n))}</span>
      {" "}{n} <span style={{ opacity:0.6 }}>({avis} avis)</span>
    </span>
  );
}

const EMOJIS = ["🎁","👗","👟","💄","📱","💻","📦","🍎","🌿","🪴","🛒","💍"];

export default function Home() {
  const [tab, setTab] = useState<"agences"|"boutique"|"comparateur"|"devis"|"mesdevis"|"messages"|"admin">("agences");
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

  const [myName, setMyName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [connected, setConnected] = useState(false);

  const [shopName, setShopName] = useState("");
  const [shopNameInput, setShopNameInput] = useState("");
  const [showShopEdit, setShowShopEdit] = useState(false);

  const [dbMessages, setDbMessages] = useState<DbMsg[]>([]);
  const [chatWith, setChatWith] = useState<string|null>(null);
  const [rtInput, setRtInput] = useState("");
  const [unread, setUnread] = useState<Record<string,number>>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [newProd, setNewProd] = useState({ name:"", price:"", description:"", emoji:"📦" });
  const [showAddProd, setShowAddProd] = useState(false);

  const [allDevis, setAllDevis] = useState<Devis[]>([]);
  const [replyDevis, setReplyDevis] = useState<Devis|null>(null);
  const [replyText, setReplyText] = useState("");

  const channelRef = useRef<ReturnType<typeof supabase.channel>|null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const displayName = (isOwner && shopName) ? shopName : myName;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [dbMessages, chatWith]);

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

  useEffect(() => {
    supabase.from("devis").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setAllDevis(data as Devis[]);
    });
    const devisSub = supabase.channel("devis-db")
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"devis" }, ({ new: d }) => {
        setAllDevis(prev => [d as Devis, ...prev]);
      }).subscribe();
    return () => { supabase.removeChannel(devisSub); };
  }, []);

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

  useEffect(() => {
    if (!myName) return;
    supabase.from("messages").select("*").order("created_at").limit(500)
      .then(({ data }) => { if (data) setDbMessages(data as DbMsg[]); });
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
    await supabase.from("messages").insert({ from_name: dn, to_name: chatWith, text: rtInput.trim() });
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
    await supabase.from("products").insert({ ...newProd, owner: displayName || myName });
    setNewProd({ name:"", price:"", description:"", emoji:"📦" });
    setShowAddProd(false);
  };

  const deleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("id", id);
  };

  const dn = displayName || myName;
  const currentMsgs = dbMessages.filter(msg => {
    if (chatWith === null) return msg.to_name === null;
    return (msg.from_name === dn && msg.to_name === chatWith) || (msg.from_name === chatWith && msg.to_name === dn);
  });

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);
  const parallax = scrollY * 0.3;
  const blurAmount = Math.min(scrollY / 25, 8);
  const modes = ["Tous","✈️ Aérien","🚢 Maritime","🚛 Routier"];

  const filtered = agencies.filter(a => {
    const q = search.toLowerCase();
    return (!search || a.name.toLowerCase().includes(q) || a.destinations.some(d => d.toLowerCase().includes(q)) || a.type.toLowerCase().includes(q)) && (modeFilter === "Tous" || a.modes.includes(modeFilter));
  }).sort((a, b) => {
    if (sortBy === "prix") return (parseFloat(a.prix_kg) || 999) - (parseFloat(b.prix_kg) || 999);
    if (sortBy === "note") return b.note - a.note;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const adminAllUsers = [...new Set(dbMessages.flatMap(m => [m.from_name, m.to_name].filter(Boolean) as string[]))];
  const adminShopOwners = [...new Set(products.map(p => p.owner))];
  const adminClients = adminAllUsers.filter(u => !adminShopOwners.includes(u));

  // Analytics
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const msgsThisMonth = dbMessages.filter(m => new Date(m.created_at) >= monthStart);
  const msgsLastMonth = dbMessages.filter(m => { const d = new Date(m.created_at); return d >= prevMonthStart && d < monthStart; });
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const msgsByDay = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, count: msgsThisMonth.filter(m => new Date(m.created_at).getDate() === i + 1).length }));
  const maxDay = Math.max(...msgsByDay.map(d => d.count), 1);
  const destKeywords = ["Côte d'Ivoire","Cameroun","Sénégal","Mali","Guinée","Burkina Faso","Congo","Togo","Niger","Ghana","Nigéria","Gabon","Dakar","Abidjan","Mauritanie","Maroc","Casablanca","Rabat"];
  const destCounts: Record<string, number> = {};
  dbMessages.forEach(m => { destKeywords.forEach(dest => { if (m.text.toLowerCase().includes(dest.toLowerCase())) destCounts[dest] = (destCounts[dest] || 0) + 1; }); });
  const topDests = Object.entries(destCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxDest = Math.max(...topDests.map(d => d[1]), 1);
  const boutiqueActivity = adminShopOwners.map(owner => ({ owner, messages: dbMessages.filter(m => m.from_name === owner || m.to_name === owner).length, products: products.filter(p => p.owner === owner).length })).sort((a, b) => b.messages - a.messages);
  const maxBoutiqueMsg = Math.max(...boutiqueActivity.map(b => b.messages), 1);
  const monthGrowth = msgsLastMonth.length > 0 ? Math.round(((msgsThisMonth.length - msgsLastMonth.length) / msgsLastMonth.length) * 100) : msgsThisMonth.length > 0 ? 100 : 0;

  const navTabs: Array<[string, string]> = [
    ["agences","Agences"],
    ["boutique","Boutique"],
    ["comparateur","Comparer"],
    ["devis","Devis"],
    ["mesdevis","Mes Devis"],
    ["messages","Messages"],
  ];
  if (isOwner) navTabs.push(["admin","Admin"]);

  const btnStyle = (active: boolean) => ({
    padding:"8px 16px", borderRadius:6, fontSize:13, fontWeight:600, cursor:"pointer" as const,
    border:"none", transition:"all 0.2s",
    background: active ? G : "transparent",
    color: active ? N1 : T3,
    letterSpacing:"0.02em",
  });

  return (
    <main style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:BG, minHeight:"100vh" }}>

      {/* NAVBAR */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, background:N1, borderBottom:`1px solid rgba(201,168,76,0.15)`, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 2rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => { setTab("agences"); setMenuOpen(false); }}>
          <div style={{ width:38, height:38, borderRadius:8, background:`linear-gradient(135deg,${G},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, color:N1, letterSpacing:"-0.5px" }}>DM</div>
          <div>
            <div style={{ fontWeight:800, fontSize:16, color:W, letterSpacing:"-0.3px", lineHeight:1 }}>DelivraMaroc</div>
            <div style={{ fontSize:9, color:G, letterSpacing:"2px", fontWeight:700, textTransform:"uppercase" as const }}>Logistics Platform</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:1, alignItems:"center" }} className="desktop-nav">
          {navTabs.map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key as typeof tab); if(key==="messages") setUnread({}); }} style={{ ...btnStyle(tab===key), position:"relative" }}>
              {label}
              {key==="messages" && totalUnread>0 && <span style={{ position:"absolute", top:2, right:2, background:"#ef4444", color:W, borderRadius:100, fontSize:8, fontWeight:700, padding:"1px 4px" }}>{totalUnread}</span>}
            </button>
          ))}
          {myName && (
            <div style={{ marginLeft:12, display:"flex", alignItems:"center", gap:8, background:"rgba(201,168,76,0.08)", border:`1px solid rgba(201,168,76,0.2)`, borderRadius:6, padding:"5px 12px" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:connected?"#22c55e":"#f59e0b", display:"inline-block" }}/>
              <span style={{ fontSize:12, color:G, fontWeight:700, letterSpacing:"0.02em" }}>{dn}{isOwner?" ★":""}</span>
            </div>
          )}
          <button onClick={() => { setShowForm(true); setFormType("agence"); setFormStatus("idle"); }} style={{ marginLeft:10, background:G, color:N1, border:"none", borderRadius:6, padding:"9px 18px", fontSize:12, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap", letterSpacing:"0.03em" }}>INSCRIRE MON AGENCE</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="burger" style={{ display:"none", background:"transparent", border:`1px solid rgba(201,168,76,0.3)`, color:G, fontSize:18, cursor:"pointer", borderRadius:6, padding:"6px 10px" }}>☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed", top:64, left:0, right:0, zIndex:299, background:N1, borderBottom:`1px solid rgba(201,168,76,0.15)`, padding:"12px 1.5rem", display:"flex", flexDirection:"column" as const, gap:2 }}>
          {navTabs.map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key as typeof tab); setMenuOpen(false); }} style={{ ...btnStyle(tab===key), textAlign:"left" as const, padding:"12px 16px" }}>{label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      {tab==="agences" && (
        <section ref={heroRef} style={{ position:"relative", minHeight:620, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", color:W, textAlign:"center" }}>
          <div style={{ position:"absolute", inset:"-25%", transform:`translateY(${parallax}px)`, filter:`blur(${blurAmount}px)`, transition:"filter 0.1s", willChange:"transform,filter" }}>
            <Image src="/hero.png" alt="DelivraMaroc" fill priority style={{ objectFit:"cover", objectPosition:"center" }}/>
          </div>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,rgba(10,15,30,0.82) 0%,rgba(10,15,30,0.55) 40%,rgba(10,15,30,0.92) 100%)` }}/>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:860, padding:"150px 2rem 110px", zIndex:10 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(201,168,76,0.10)", border:`1px solid rgba(201,168,76,0.30)`, borderRadius:4, padding:"6px 16px", fontSize:11, fontWeight:700, color:GL, marginBottom:28, backdropFilter:"blur(10px)", letterSpacing:"2px", textTransform:"uppercase" as const }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:G, display:"inline-block" }}/>
              Plateforme Logistique · Maroc — Afrique
            </div>
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,4.2rem)", fontWeight:900, margin:"0 0 8px", lineHeight:1.05, letterSpacing:"-2px" }}>La référence de la livraison</h1>
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,4.2rem)", fontWeight:900, margin:"0 0 24px", lineHeight:1.05, letterSpacing:"-2px", color:G }}>Maroc — Afrique</h1>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.65)", lineHeight:1.8, maxWidth:540, margin:"0 auto 48px", fontWeight:400 }}>Comparez les meilleures agences · Négociez vos tarifs · Expédiez en toute confiance</p>
            <div style={{ display:"flex", maxWidth:640, margin:"0 auto 52px", borderRadius:8, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.5)", border:`1px solid rgba(201,168,76,0.2)` }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Destination, pays, type de colis..." style={{ flex:1, padding:"18px 24px", border:"none", fontSize:14, outline:"none", background:W, color:T1, fontWeight:500 }} onKeyDown={e=>{if(e.key==="Enter")setTab("comparateur");}}/>
              <button onClick={()=>setTab("comparateur")} style={{ background:G, color:N1, border:"none", padding:"18px 28px", fontSize:13, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap", letterSpacing:"1px" }}>COMPARER →</button>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:"3rem", flexWrap:"wrap" }}>
              {[{v:"7+",l:"Agences partenaires"},{v:"20+",l:"Pays desservis"},{v:"3",l:"Modes de transport"},{v:`${onlineUsers.length+1}`,l:"Utilisateurs en ligne"}].map(s=>(
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:32, fontWeight:900, color:G, lineHeight:1, letterSpacing:"-1px" }}>{s.v}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", marginTop:8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ maxWidth:1240, margin:"0 auto", padding:tab==="agences"?"32px 1.5rem":"88px 1.5rem 40px" }}>

        {/* AGENCES */}
        {tab==="agences" && (
          <>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:32, flexWrap:"wrap" }}>
              {modes.map(m=>(
                <button key={m} onClick={()=>setModeFilter(m)} style={{ padding:"9px 20px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", border:`1.5px solid`, background:modeFilter===m?G:W, color:modeFilter===m?N1:T2, borderColor:modeFilter===m?G:BORDER, transition:"all 0.2s", letterSpacing:"0.5px" }}>{m}</button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))", gap:24 }}>
              {filtered.map(ag=>(
                <div key={ag.id} style={{ background:W, borderRadius:12, border:`1px solid ${ag.featured?G:BORDER}`, overflow:"hidden", boxShadow:ag.featured?`0 4px 24px rgba(201,168,76,0.12)`:"0 2px 12px rgba(0,0,0,0.04)", transition:"all 0.25s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLElement).style.boxShadow="0 16px 48px rgba(0,0,0,0.10)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow=ag.featured?`0 4px 24px rgba(201,168,76,0.12)`:"0 2px 12px rgba(0,0,0,0.04)";}}>
                  {ag.featured && <div style={{ background:`linear-gradient(90deg,${N2},${N3})`, color:G, fontSize:9, fontWeight:800, textAlign:"center", padding:"6px", letterSpacing:"2px", textTransform:"uppercase" as const, borderBottom:`1px solid rgba(201,168,76,0.2)` }}>★ PARTENAIRE PREMIUM</div>}
                  <div style={{ padding:"20px 22px", borderBottom:`1px solid ${BG}`, display:"flex", gap:16, alignItems:"center" }}>
                    <div style={{ width:52, height:52, borderRadius:10, background:ag.color, display:"flex", alignItems:"center", justifyContent:"center", color:W, fontWeight:900, fontSize:16, flexShrink:0, letterSpacing:"-0.5px" }}>{ag.logo}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:3 }}>
                        <span style={{ fontWeight:800, fontSize:15, color:T1 }}>{ag.name}</span>
                        {ag.verified && <span style={{ background:"#f0fdf4", color:"#166534", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:4, letterSpacing:"0.5px" }}>✓ VÉRIFIÉ</span>}
                        <span style={{ background:N1, color:G, fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:4, letterSpacing:"1px" }}>{ag.badge}</span>
                      </div>
                      <div style={{ fontSize:11, color:T2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ag.slogan}</div>
                    </div>
                  </div>
                  <div style={{ padding:"18px 22px" }}>
                    <Stars n={ag.note} avis={ag.avis}/>
                    <p style={{ fontSize:12, color:T2, margin:"10px 0", lineHeight:1.6 }}>{ag.description}</p>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
                      {ag.modes.map(m=><span key={m} style={{ background:BG, color:T2, fontSize:11, padding:"4px 10px", borderRadius:4, fontWeight:600, border:`1px solid ${BORDER}` }}>{m}</span>)}
                    </div>
                    <div style={{ marginBottom:12 }}>
                      <div style={{ fontSize:10, fontWeight:700, color:T3, marginBottom:6, textTransform:"uppercase" as const, letterSpacing:"1px" }}>Destinations</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                        {ag.destinations.slice(0,4).map(d=><span key={d} style={{ background:BG, border:`1px solid ${BORDER}`, color:T2, fontSize:10, padding:"2px 8px", borderRadius:4 }}>{d}</span>)}
                        {ag.destinations.length>4 && <span style={{ background:N1, color:G, fontSize:10, padding:"2px 8px", borderRadius:4, fontWeight:700 }}>+{ag.destinations.length-4} pays</span>}
                      </div>
                    </div>
                    {ag.adresse && <div style={{ display:"flex", gap:6, alignItems:"flex-start", marginBottom:6 }}><span style={{ color:T3 }}>📍</span><span style={{ fontSize:11, color:T2 }}>{ag.adresse}</span></div>}
                    {ag.horaires && <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:12 }}><span style={{ color:T3 }}>🕐</span><span style={{ fontSize:11, color:T2 }}>{ag.horaires}</span></div>}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                      <div style={{ background:BG, borderRadius:8, padding:"12px", textAlign:"center" as const, border:`1px solid ${BORDER}` }}><div style={{ fontSize:9, color:T3, fontWeight:700, marginBottom:4, textTransform:"uppercase" as const, letterSpacing:"1px" }}>Tarif/kg</div><div style={{ fontSize:14, fontWeight:800, color:G }}>{ag.prix_kg}</div></div>
                      <div style={{ background:BG, borderRadius:8, padding:"12px", textAlign:"center" as const, border:`1px solid ${BORDER}` }}><div style={{ fontSize:9, color:T3, fontWeight:700, marginBottom:4, textTransform:"uppercase" as const, letterSpacing:"1px" }}>Délai</div><div style={{ fontSize:12, fontWeight:700, color:T1 }}>{ag.delai}</div></div>
                    </div>
                    <button onClick={()=>setShowTarifs(showTarifs===ag.id?null:ag.id)} style={{ width:"100%", padding:"9px", borderRadius:6, border:`1px solid ${BORDER}`, color:T2, background:BG, fontSize:12, fontWeight:600, cursor:"pointer", marginBottom:12, letterSpacing:"0.3px" }}>{showTarifs===ag.id?"▲ Masquer les tarifs":"▼ Grille tarifaire complète"}</button>
                    {showTarifs===ag.id && (
                      <div style={{ marginBottom:14, borderRadius:8, overflow:"hidden", border:`1px solid ${BORDER}` }}>
                        <table style={{ width:"100%", borderCollapse:"collapse" as const, fontSize:11 }}>
                          <thead><tr style={{ background:N1 }}><th style={{ padding:"8px 12px", textAlign:"left" as const, color:G, fontWeight:700, letterSpacing:"0.5px" }}>Service</th><th style={{ padding:"8px 12px", textAlign:"center" as const, color:G, fontWeight:700 }}>Prix</th><th style={{ padding:"8px 12px", textAlign:"center" as const, color:G, fontWeight:700 }}>Délai</th></tr></thead>
                          <tbody>{ag.tarifs.map((t,i)=><tr key={i} style={{ background:i%2===0?BG:W, borderTop:`1px solid ${BORDER}` }}><td style={{ padding:"7px 12px", color:T1 }}>{t.article}</td><td style={{ padding:"7px 12px", textAlign:"center" as const, color:G, fontWeight:700 }}>{t.prix}</td><td style={{ padding:"7px 12px", textAlign:"center" as const, color:T2 }}>{t.delai}</td></tr>)}</tbody>
                        </table>
                        {ag.specials.length>0 && <div style={{ padding:"10px 12px", background:"#fffbeb", borderTop:`1px solid #fde68a` }}><div style={{ fontSize:10, fontWeight:700, color:"#92400e", marginBottom:6, letterSpacing:"0.5px" }}>⚠ TARIFS SPÉCIAUX</div><div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{ag.specials.map((s,i)=><span key={i} style={{ background:W, border:"1px solid #fcd34d", color:"#92400e", fontSize:10, padding:"2px 7px", borderRadius:4 }}>{typeof s==="string"?s:`${s.nom} : ${s.prix}`}</span>)}</div></div>}
                      </div>
                    )}
                    {ag.contacts.slice(0,2).map((c,i)=>(
                      <a key={i} href={`tel:${c.tel}`} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:BG, border:`1px solid ${BORDER}`, color:T1, textDecoration:"none", padding:"9px 14px", borderRadius:6, fontSize:11, marginBottom:6, transition:"all 0.2s" }}>
                        <span style={{ color:T3, fontWeight:600 }}>📞 {c.label}</span><span style={{ fontWeight:800, color:T1 }}>{c.tel}</span>
                      </a>
                    ))}
                    {ag.contacts.length>2 && <div style={{ fontSize:10, color:T3, textAlign:"center" as const, padding:"4px" }}>+{ag.contacts.length-2} contacts supplémentaires</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BOUTIQUE */}
        {tab==="boutique" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, flexWrap:"wrap", gap:12 }}>
              <div>
                <h2 style={{ fontSize:26, fontWeight:800, color:T1, margin:0, letterSpacing:"-0.5px" }}>{isOwner ? (shopName || myName) : "Boutique"}</h2>
                <p style={{ color:T2, fontSize:13, margin:"5px 0 0" }}>{isOwner?"Gérez vos produits · Vos clients vous contactent directement":"Parcourez les produits disponibles"}</p>
              </div>
              {isOwner && (
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>setShowShopEdit(true)} style={{ background:W, color:T2, border:`1px solid ${BORDER}`, borderRadius:6, padding:"10px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>✏ Nom boutique</button>
                  <button onClick={()=>setShowAddProd(true)} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"10px 20px", fontSize:12, fontWeight:800, cursor:"pointer", letterSpacing:"0.5px" }}>+ AJOUTER UN PRODUIT</button>
                </div>
              )}
            </div>

            {isOwner && (
              <div style={{ background:N2, borderRadius:10, padding:"20px 24px", marginBottom:28, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", border:`1px solid rgba(201,168,76,0.2)` }}>
                <div style={{ width:44, height:44, borderRadius:8, background:`linear-gradient(135deg,${G},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>★</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:G, fontWeight:800, fontSize:14, letterSpacing:"0.3px" }}>Mode Propriétaire · {dn}</div>
                  <div style={{ color:T3, fontSize:12, marginTop:3 }}>Nom dans le chat : <strong style={{ color:GL }}>{dn}</strong> · {onlineUsers.length} visiteur(s) connecté(s)</div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {onlineUsers.map(u=>(
                    <button key={u} onClick={()=>openChat(u)} style={{ background:"rgba(201,168,76,0.1)", border:`1px solid rgba(201,168,76,0.25)`, color:GL, borderRadius:6, padding:"7px 14px", fontSize:12, cursor:"pointer", fontWeight:600 }}>✉ {u}</button>
                  ))}
                </div>
              </div>
            )}

            {products.length===0 ? (
              <div style={{ textAlign:"center", padding:"80px 20px", color:T3 }}>
                <div style={{ fontSize:56, marginBottom:16, opacity:0.4 }}>🛍</div>
                <div style={{ fontSize:18, fontWeight:700, color:T2, marginBottom:8 }}>{isOwner?"Votre boutique est vide":"Boutique vide pour l'instant"}</div>
                <div style={{ fontSize:13 }}>{isOwner?"Ajoutez votre premier produit":"Revenez bientôt !"}</div>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:22 }}>
                {products.map(p=>(
                  <div key={p.id} style={{ background:W, borderRadius:12, overflow:"hidden", border:`1px solid ${BORDER}`, boxShadow:"0 2px 12px rgba(0,0,0,0.04)", transition:"all 0.25s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLElement).style.boxShadow="0 12px 36px rgba(0,0,0,0.08)";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow="0 2px 12px rgba(0,0,0,0.04)";}}>
                    <div style={{ background:`linear-gradient(135deg,${BG},#eaecf0)`, height:120, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52 }}>{p.emoji}</div>
                    <div style={{ padding:"16px 18px" }}>
                      <div style={{ fontWeight:800, fontSize:15, color:T1, marginBottom:2 }}>{p.name}</div>
                      <div style={{ fontSize:10, color:T3, marginBottom:6, fontWeight:600, letterSpacing:"0.5px", textTransform:"uppercase" as const }}>par {p.owner}</div>
                      {p.description && <div style={{ fontSize:12, color:T2, marginBottom:10, lineHeight:1.6 }}>{p.description}</div>}
                      {p.price && <div style={{ fontSize:22, fontWeight:900, color:G, marginBottom:14, letterSpacing:"-0.5px" }}>{p.price}</div>}
                      {isOwner ? (
                        <button onClick={()=>deleteProduct(p.id)} style={{ width:"100%", padding:"9px", borderRadius:6, border:`1px solid #fecaca`, background:"#fef2f2", color:"#dc2626", fontSize:12, fontWeight:600, cursor:"pointer" }}>Supprimer</button>
                      ) : (
                        <button onClick={()=>openChat(p.owner)} style={{ width:"100%", padding:"11px", borderRadius:6, border:"none", background:N1, color:G, fontSize:12, fontWeight:800, cursor:"pointer", letterSpacing:"0.5px" }}>
                          CONTACTER {p.owner.toUpperCase()}
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
            <h2 style={{ fontSize:24, fontWeight:800, color:T1, marginBottom:22, marginTop:0, letterSpacing:"-0.5px" }}>Comparateur d&apos;agences</h2>
            <div style={{ background:W, borderRadius:10, padding:"16px 20px", marginBottom:22, border:`1px solid ${BORDER}`, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Destination, pays..." style={{ flex:1, minWidth:180, padding:"10px 16px", borderRadius:6, border:`1px solid ${BORDER}`, fontSize:13, outline:"none", color:T1 }}/>
              {modes.map(m=><button key={m} onClick={()=>setModeFilter(m)} style={{ padding:"8px 14px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", border:`1.5px solid`, background:modeFilter===m?G:W, color:modeFilter===m?N1:T2, borderColor:modeFilter===m?G:BORDER }}>{m}</button>)}
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ padding:"9px 14px", borderRadius:6, border:`1px solid ${BORDER}`, fontSize:12, outline:"none", background:W, cursor:"pointer", color:T1, fontWeight:600 }}>
                <option value="featured">★ Recommandés</option>
                <option value="prix">Meilleur prix</option>
                <option value="note">Meilleures notes</option>
              </select>
            </div>
            <div style={{ background:W, borderRadius:12, border:`1px solid ${BORDER}`, overflow:"auto", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" as const, minWidth:700 }}>
                <thead><tr style={{ background:N1 }}>{["Agence","Mode","Tarif/kg","Délai","Note","Contact"].map(h=><th key={h} style={{ padding:"14px 18px", textAlign:"left" as const, color:G, fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" as const }}>{h}</th>)}</tr></thead>
                <tbody>
                  {filtered.map((a,i)=>(
                    <tr key={a.id} style={{ borderTop:`1px solid ${BORDER}`, background:i%2===0?W:BG, transition:"background 0.15s" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="#f0f4ff"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background=i%2===0?W:BG}>
                      <td style={{ padding:"14px 18px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                          <div style={{ width:38, height:38, borderRadius:8, background:a.color, display:"flex", alignItems:"center", justifyContent:"center", color:W, fontWeight:900, fontSize:12, flexShrink:0 }}>{a.logo}</div>
                          <div><div style={{ fontWeight:700, fontSize:13, color:T1 }}>{a.name}{a.verified&&<span style={{ background:"#f0fdf4", color:"#166534", fontSize:9, padding:"1px 6px", borderRadius:4, marginLeft:6, fontWeight:700 }}>✓</span>}</div><div style={{ fontSize:10, color:T3 }}>{a.adresse}</div></div>
                        </div>
                      </td>
                      <td style={{ padding:"14px 18px" }}><div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>{a.modes.map(m=><span key={m} style={{ background:BG, color:T2, fontSize:10, padding:"3px 8px", borderRadius:4, fontWeight:600, border:`1px solid ${BORDER}` }}>{m}</span>)}</div></td>
                      <td style={{ padding:"14px 18px" }}><span style={{ fontWeight:800, fontSize:14, color:G }}>{a.prix_kg}</span></td>
                      <td style={{ padding:"14px 18px", fontSize:12, color:T2, fontWeight:600 }}>{a.delai}</td>
                      <td style={{ padding:"14px 18px" }}><Stars n={a.note} avis={a.avis}/></td>
                      <td style={{ padding:"14px 18px" }}><a href={`tel:${a.contacts[0]?.tel}`} style={{ background:N1, color:G, borderRadius:6, padding:"8px 14px", fontSize:11, fontWeight:700, cursor:"pointer", textDecoration:"none", display:"inline-block", letterSpacing:"0.5px" }}>APPELER</a></td>
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
            <div style={{ background:W, borderRadius:12, padding:"40px", border:`1px solid ${BORDER}`, boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              {!devisOk ? (
                <>
                  <h2 style={{ fontSize:22, fontWeight:800, color:T1, marginTop:0, marginBottom:8, letterSpacing:"-0.5px" }}>Demande de devis</h2>
                  <p style={{ color:T2, fontSize:13, marginBottom:32, lineHeight:1.7 }}>Décrivez votre envoi. Les agences partenaires vous répondront sous 24h.</p>
                  <div style={{ display:"flex", flexDirection:"column" as const, gap:18 }}>
                    {[{k:"poids",l:"Poids estimé (kg)",t:"number",p:"Ex : 5 kg"},{k:"dest",l:"Destination",t:"text",p:"Ex : Dakar, Sénégal"},{k:"type",l:"Nature du colis",t:"text",p:"Ex : vêtements, cosmétiques..."}].map(f=>(
                      <div key={f.k}>
                        <label style={{ fontSize:11, fontWeight:700, color:T2, display:"block", marginBottom:7, textTransform:"uppercase" as const, letterSpacing:"1px" }}>{f.l}</label>
                        <input type={f.t} placeholder={f.p} value={devis[f.k as keyof typeof devis]} onChange={e=>setDevis({...devis,[f.k]:e.target.value})} style={{ width:"100%", padding:"12px 16px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:14, outline:"none", boxSizing:"border-box" as const, color:T1, fontWeight:500 }}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:T2, display:"block", marginBottom:7, textTransform:"uppercase" as const, letterSpacing:"1px" }}>Informations complémentaires</label>
                      <textarea rows={3} placeholder="Date souhaitée, contraintes particulières..." value={devis.desc} onChange={e=>setDevis({...devis,desc:e.target.value})} style={{ width:"100%", padding:"12px 16px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:13, outline:"none", resize:"none" as const, boxSizing:"border-box" as const, color:T1 }}/>
                    </div>
                    <button onClick={async ()=>{ if(devis.poids&&devis.dest){ await supabase.from("devis").insert({ poids:devis.poids, destination:devis.dest, type_colis:devis.type, description:devis.desc, nom:dn||"Anonyme", statut:"en_attente" }); setDevisOk(true); }}} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"15px", fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:"1px", marginTop:4 }}>SOUMETTRE MA DEMANDE →</button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign:"center" as const, padding:"24px 0" }}>
                  <div style={{ width:64, height:64, borderRadius:12, background:`linear-gradient(135deg,${G},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 20px" }}>✓</div>
                  <h3 style={{ fontSize:20, fontWeight:800, color:T1, marginBottom:10, letterSpacing:"-0.5px" }}>Demande transmise avec succès</h3>
                  <p style={{ color:T2, fontSize:13, marginBottom:24 }}>Les agences partenaires vous contacteront prochainement.</p>
                  <button onClick={()=>{setTab("mesdevis");setDevisOk(false);setDevis({poids:"",dest:"",type:"",desc:""});}} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"12px 28px", fontSize:13, fontWeight:700, cursor:"pointer", letterSpacing:"0.5px" }}>VOIR MES DEVIS →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MES DEVIS — CLIENT : suit ses demandes */}
        {tab==="mesdevis" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
              <div>
                <h2 style={{ fontSize:24, fontWeight:800, color:T1, margin:"0 0 4px", letterSpacing:"-0.5px" }}>
                  {adminShopOwners.includes(dn) ? "Devis disponibles" : "Mes demandes de devis"}
                </h2>
                <p style={{ color:T2, fontSize:13, margin:0 }}>
                  {adminShopOwners.includes(dn) ? "Acceptez les demandes des clients" : "Suivez l\u2019état de vos demandes"}
                </p>
              </div>
            </div>

            {/* VUE BOUTIQUE : liste tous les devis en attente pour qu'elle puisse accepter */}
            {adminShopOwners.includes(dn) ? (
              <div style={{ display:"flex", flexDirection:"column" as const, gap:14 }}>
                {allDevis.length === 0 && <div style={{ textAlign:"center" as const, padding:"60px", color:T3 }}>Aucune demande reçue pour l&apos;instant</div>}
                {allDevis.map(d => (
                  <div key={d.id} style={{ background:W, borderRadius:12, border:`1.5px solid ${d.statut==="accepte"&&d.repondu_par===dn?"#22c55e":BORDER}`, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
                    <div style={{ padding:"16px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:40, height:40, borderRadius:8, background:`linear-gradient(135deg,#4c1d95,#6d28d9)`, display:"flex", alignItems:"center", justifyContent:"center", color:W, fontWeight:900, fontSize:14 }}>{d.nom[0].toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight:800, fontSize:14, color:T1 }}>{d.nom} <span style={{ fontWeight:400, color:T3, fontSize:12 }}>→ {d.destination}</span></div>
                          <div style={{ fontSize:11, color:T3, marginTop:2 }}>{d.poids} kg · {d.type_colis||"Standard"} · {new Date(d.created_at).toLocaleDateString("fr-FR")}</div>
                        </div>
                      </div>
                      {d.statut==="accepte" ? (
                        <span style={{ padding:"6px 14px", borderRadius:20, fontSize:11, fontWeight:700, background: d.repondu_par===dn?"#f0fdf4":"#f5f6f8", color: d.repondu_par===dn?"#166534":T3, border:`1px solid ${d.repondu_par===dn?"#bbf7d0":BORDER}` }}>
                          {d.repondu_par===dn ? "✓ Accepté par vous" : `Accepté par ${d.repondu_par}`}
                        </span>
                      ) : (
                        <button onClick={()=>{setReplyDevis(d);setReplyText("");}} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"9px 20px", fontSize:12, fontWeight:800, cursor:"pointer", letterSpacing:"0.5px" }}>ACCEPTER CE DEVIS</button>
                      )}
                    </div>
                    {d.description && <div style={{ padding:"8px 22px 12px", fontSize:12, color:T2 }}>{d.description}</div>}
                  </div>
                ))}
              </div>
            ) : (
              /* VUE CLIENT : voit ses propres devis et leur statut */
              (() => {
                const myDevis = allDevis.filter(d => d.nom === (dn||myName));
                if (myDevis.length === 0) return (
                  <div style={{ textAlign:"center" as const, padding:"80px 20px" }}>
                    <div style={{ fontSize:52, marginBottom:16, opacity:0.3 }}>📋</div>
                    <div style={{ fontSize:18, fontWeight:700, color:T2, marginBottom:10 }}>Aucune demande envoyée</div>
                    <button onClick={()=>setTab("devis")} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"12px 28px", fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:"0.5px" }}>FAIRE UNE DEMANDE →</button>
                  </div>
                );
                return (
                  <div style={{ display:"flex", flexDirection:"column" as const, gap:16 }}>
                    {myDevis.map(d => (
                      <div key={d.id} style={{ background:W, borderRadius:12, border:`1.5px solid ${d.statut==="accepte"?"#22c55e":BORDER}`, boxShadow:"0 2px 12px rgba(0,0,0,0.04)", overflow:"hidden" }}>
                        <div style={{ padding:"18px 22px", borderBottom:`1px solid ${BG}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                            <div style={{ width:42, height:42, borderRadius:8, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📦</div>
                            <div>
                              <div style={{ fontWeight:800, fontSize:15, color:T1 }}>{d.destination}</div>
                              <div style={{ fontSize:11, color:T3, marginTop:2 }}>{d.poids} kg · {d.type_colis||"Colis standard"} · {new Date(d.created_at).toLocaleDateString("fr-FR")}</div>
                            </div>
                          </div>
                          <span style={{ padding:"6px 16px", borderRadius:20, fontSize:11, fontWeight:700, background: d.statut==="accepte"?"#f0fdf4":"#fffbeb", color: d.statut==="accepte"?"#166534":"#92400e", border:`1px solid ${d.statut==="accepte"?"#bbf7d0":"#fde68a"}` }}>
                            {d.statut==="accepte" ? "✓ ACCEPTÉ" : "⏳ EN ATTENTE"}
                          </span>
                        </div>
                        {d.description && <div style={{ padding:"10px 22px", fontSize:12, color:T2, background:BG, borderBottom:`1px solid ${BORDER}` }}>{d.description}</div>}
                        {d.statut==="accepte" && d.reponse ? (
                          <div style={{ padding:"18px 22px" }}>
                            <div style={{ fontSize:10, fontWeight:700, color:"#166534", marginBottom:8, textTransform:"uppercase" as const, letterSpacing:"1px" }}>✓ Pris en charge par {d.repondu_par}</div>
                            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"14px 18px", fontSize:13, color:"#166534", lineHeight:1.7 }}>{d.reponse}</div>
                          </div>
                        ) : (
                          <div style={{ padding:"14px 22px", display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:8, height:8, borderRadius:"50%", background:"#f59e0b", flexShrink:0, animation:"pulse 2s infinite" }}/>
                            <span style={{ fontSize:12, color:T3 }}>Demande reçue — en attente qu&apos;une boutique l&apos;accepte</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* MESSAGES */}
        {tab==="messages" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:10 }}>
              <div>
                <h2 style={{ fontSize:24, fontWeight:800, color:T1, margin:0, letterSpacing:"-0.5px" }}>Messagerie</h2>
                <p style={{ color:T2, fontSize:12, margin:"4px 0 0" }}>Communication en temps réel · Historique sauvegardé</p>
              </div>
              {myName && (
                <div style={{ fontSize:12, color:T2, display:"flex", alignItems:"center", gap:7, background:W, border:`1px solid ${BORDER}`, borderRadius:6, padding:"7px 14px" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:connected?"#22c55e":"#f59e0b", display:"inline-block" }}/>
                  <strong style={{ color:G }}>{dn}{isOwner?" ★":""}</strong>
                  <span style={{ color:connected?"#22c55e":"#f59e0b" }}>{connected?"Connecté":"Connexion..."}</span>
                </div>
              )}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"270px 1fr", gap:0, borderRadius:12, overflow:"hidden", border:`1px solid ${BORDER}`, boxShadow:"0 4px 24px rgba(0,0,0,0.06)", height:580 }}>
              <div style={{ background:W, borderRight:`1px solid ${BORDER}`, display:"flex", flexDirection:"column" as const, overflowY:"auto" as const }}>
                <div style={{ padding:"14px 18px", background:N1, flexShrink:0 }}>
                  <div style={{ color:G, fontWeight:700, fontSize:12, letterSpacing:"1px", textTransform:"uppercase" as const }}>Conversations</div>
                  <div style={{ color:T3, fontSize:11, marginTop:3 }}>● {onlineUsers.length + 1} en ligne</div>
                </div>
                <div onClick={()=>openChat(null)} style={{ padding:"13px 16px", borderBottom:`1px solid ${BG}`, cursor:"pointer", background:chatWith===null?`rgba(201,168,76,0.06)`:W, display:"flex", gap:10, alignItems:"center" }}
                  onMouseEnter={e=>{if(chatWith!==null)(e.currentTarget as HTMLElement).style.background=BG;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=chatWith===null?`rgba(201,168,76,0.06)`:W;}}>
                  <div style={{ width:38, height:38, borderRadius:8, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0, border:`1px solid rgba(201,168,76,0.2)` }}>🌐</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:12, color:T1 }}>Canal public</div>
                    <div style={{ fontSize:11, color:T3 }}>Tous les utilisateurs</div>
                  </div>
                  {(unread["__public__"]||0)>0 && <span style={{ background:"#ef4444", color:W, borderRadius:100, fontSize:10, fontWeight:700, padding:"1px 6px" }}>{unread["__public__"]}</span>}
                </div>
                {onlineUsers.length===0 ? (
                  <div style={{ padding:"28px 16px", textAlign:"center" as const, color:T3, fontSize:12 }}>
                    <div style={{ fontSize:28, marginBottom:8, opacity:0.3 }}>👥</div>
                    Aucun autre utilisateur<br/>
                    <span style={{ fontSize:11, marginTop:6, display:"block", color:T3 }}>Partagez votre lien Vercel</span>
                  </div>
                ) : onlineUsers.map(u=>(
                  <div key={u} onClick={()=>openChat(u)} style={{ padding:"13px 16px", borderBottom:`1px solid ${BG}`, cursor:"pointer", background:chatWith===u?`rgba(201,168,76,0.06)`:W, display:"flex", gap:10, alignItems:"center" }}
                    onMouseEnter={e=>{if(chatWith!==u)(e.currentTarget as HTMLElement).style.background=BG;}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=chatWith===u?`rgba(201,168,76,0.06)`:W;}}>
                    <div style={{ width:38, height:38, borderRadius:8, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", color:G, fontWeight:900, fontSize:14, flexShrink:0, position:"relative", border:`1px solid rgba(201,168,76,0.2)` }}>
                      {u[0].toUpperCase()}
                      <div style={{ position:"absolute", bottom:-2, right:-2, width:10, height:10, borderRadius:"50%", background:"#22c55e", border:`2px solid ${W}` }}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:12, color:T1 }}>{u}</div>
                      <div style={{ fontSize:11, color:"#22c55e", fontWeight:600 }}>En ligne</div>
                    </div>
                    {(unread[u]||0)>0 && <span style={{ background:"#ef4444", color:W, borderRadius:100, fontSize:10, fontWeight:700, padding:"1px 6px" }}>{unread[u]}</span>}
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", flexDirection:"column" as const, background:BG }}>
                <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BORDER}`, background:W, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                  <div style={{ width:38, height:38, borderRadius:8, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:chatWith===null?16:14, color:G, fontWeight:900, border:`1px solid rgba(201,168,76,0.2)` }}>
                    {chatWith===null?"🌐":chatWith[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:14, color:T1 }}>{chatWith===null?"Canal public":chatWith}</div>
                    <div style={{ fontSize:11, color:T2 }}>{chatWith===null?`${onlineUsers.length+1} participant(s)`:"Message privé · En ligne"}</div>
                  </div>
                </div>
                <div style={{ flex:1, overflowY:"auto" as const, padding:"20px", display:"flex", flexDirection:"column" as const, gap:10 }}>
                  {currentMsgs.length===0 && (
                    <div style={{ textAlign:"center" as const, color:T3, marginTop:60 }}>
                      <div style={{ fontSize:36, marginBottom:10, opacity:0.3 }}>✉</div>
                      <div style={{ fontSize:13, fontWeight:600 }}>Aucun message pour l&apos;instant</div>
                    </div>
                  )}
                  {currentMsgs.map(msg=>(
                    <div key={msg.id} style={{ display:"flex", justifyContent:msg.from_name===dn?"flex-end":"flex-start", alignItems:"flex-end", gap:8 }}>
                      {msg.from_name!==dn && <div style={{ width:28, height:28, borderRadius:6, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", color:G, fontWeight:900, fontSize:11, flexShrink:0 }}>{msg.from_name[0].toUpperCase()}</div>}
                      <div style={{ maxWidth:"70%" }}>
                        {msg.from_name!==dn && <div style={{ fontSize:10, color:T3, marginBottom:3, fontWeight:700, letterSpacing:"0.3px" }}>{msg.from_name}</div>}
                        <div style={{ background:msg.from_name===dn?N1:W, color:msg.from_name===dn?G:T1, borderRadius:msg.from_name===dn?"10px 10px 2px 10px":"10px 10px 10px 2px", padding:"10px 14px", fontSize:13, boxShadow:msg.from_name!==dn?"0 1px 4px rgba(0,0,0,0.06)":"none", lineHeight:1.5, border:msg.from_name===dn?`1px solid rgba(201,168,76,0.15)`:`1px solid ${BORDER}` }}>
                          {msg.text}
                          <div style={{ fontSize:10, opacity:0.4, marginTop:4, textAlign:"right" as const }}>{new Date(msg.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef}/>
                </div>
                <div style={{ padding:"12px 16px", borderTop:`1px solid ${BORDER}`, background:W, display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
                  <input value={rtInput} onChange={e=>setRtInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendRt();}} placeholder={myName?`Message ${chatWith?`privé à ${chatWith}`:"public"}...`:"Identifiez-vous d'abord…"} disabled={!myName||!connected} style={{ flex:1, padding:"11px 18px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:13, outline:"none", background:BG, color:T1 }}/>
                  <button onClick={sendRt} disabled={!myName||!rtInput.trim()||!connected} style={{ background:G, color:N1, border:"none", borderRadius:6, width:44, height:44, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity:(!myName||!rtInput.trim()||!connected)?0.4:1, fontWeight:900 }}>→</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab==="admin" && isOwner && (
          <div>
            <div style={{ marginBottom:28 }}>
              <h2 style={{ fontSize:24, fontWeight:800, color:T1, margin:"0 0 4px", letterSpacing:"-0.5px" }}>Panel Administrateur</h2>
              <p style={{ color:T2, fontSize:13, margin:0 }}>Vue consolidée de la plateforme · Accès restreint</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:32 }}>
              {[{icon:"✉",label:"Messages",value:dbMessages.length},{icon:"🛍",label:"Boutiques",value:adminShopOwners.length},{icon:"👤",label:"Clients",value:adminClients.length},{icon:"📦",label:"Produits",value:products.length},{icon:"●",label:"En ligne",value:onlineUsers.length+1}].map(s=>(
                <div key={s.label} style={{ background:W, borderRadius:10, padding:"20px", border:`1px solid ${BORDER}`, boxShadow:"0 2px 8px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize:24, marginBottom:10, color:G }}>{s.icon}</div>
                  <div style={{ fontSize:30, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-1px" }}>{s.value}</div>
                  <div style={{ fontSize:11, color:T3, marginTop:5, fontWeight:600, letterSpacing:"0.5px", textTransform:"uppercase" as const }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
              <div style={{ background:W, borderRadius:12, padding:"24px", border:`1px solid ${BORDER}` }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:T1, margin:"0 0 18px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Boutiques ({adminShopOwners.length})</h3>
                {adminShopOwners.length===0 ? <div style={{ color:T3, fontSize:13, textAlign:"center" as const, padding:"20px" }}>Aucune boutique</div> : adminShopOwners.map(owner=>{
                  const ownerProducts = products.filter(p=>p.owner===owner);
                  return (
                    <div key={owner} style={{ padding:"12px", borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:8, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", color:G, fontWeight:900, fontSize:14 }}>{owner[0].toUpperCase()}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:T1 }}>{owner}</div>
                        <div style={{ fontSize:11, color:T3 }}>{ownerProducts.length} produit(s)</div>
                      </div>
                      <button onClick={()=>openChat(owner)} style={{ background:BG, color:T2, border:`1px solid ${BORDER}`, borderRadius:6, padding:"6px 10px", fontSize:11, fontWeight:600, cursor:"pointer" }}>✉</button>
                    </div>
                  );
                })}
              </div>
              <div style={{ background:W, borderRadius:12, padding:"24px", border:`1px solid ${BORDER}` }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:T1, margin:"0 0 18px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Clients ({adminClients.length})</h3>
                {adminClients.length===0 ? <div style={{ color:T3, fontSize:13, textAlign:"center" as const, padding:"20px" }}>Aucun client encore</div> : adminClients.map(client=>{
                  const clientMsgs = dbMessages.filter(m=>m.from_name===client||m.to_name===client);
                  const lastMsg = clientMsgs[clientMsgs.length-1];
                  return (
                    <div key={client} style={{ padding:"12px", borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:8, background:`linear-gradient(135deg,#4c1d95,#6d28d9)`, display:"flex", alignItems:"center", justifyContent:"center", color:W, fontWeight:900, fontSize:14 }}>{client[0].toUpperCase()}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:T1 }}>{client}</div>
                        {lastMsg && <div style={{ fontSize:11, color:T3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lastMsg.text}</div>}
                        <div style={{ fontSize:10, color:T3 }}>{clientMsgs.length} message(s)</div>
                      </div>
                      <button onClick={()=>openChat(client)} style={{ background:BG, color:T2, border:`1px solid ${BORDER}`, borderRadius:6, padding:"6px 10px", fontSize:11, fontWeight:600, cursor:"pointer" }}>✉</button>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ANALYTICS */}
            <div style={{ marginTop:32, marginBottom:4 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`linear-gradient(135deg,${G},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>📊</div>
                <div>
                  <h3 style={{ fontSize:16, fontWeight:800, color:T1, margin:0, letterSpacing:"-0.3px" }}>Analytics & Audit</h3>
                  <div style={{ fontSize:11, color:T3, marginTop:2, fontWeight:600, letterSpacing:"0.5px" }}>DONNÉES DU MOIS EN COURS · CONFIDENTIEL</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:14, marginBottom:24 }}>
                {[
                  { label:"Messages ce mois", value: msgsThisMonth.length, sub: monthGrowth >= 0 ? `+${monthGrowth}% vs mois préc.` : `${monthGrowth}% vs mois préc.`, color: monthGrowth >= 0 ? "#22c55e" : "#ef4444" },
                  { label:"Mois précédent", value: msgsLastMonth.length, sub:"messages", color: T3 },
                  { label:"Boutiques actives", value: boutiqueActivity.filter(b=>b.messages>0).length, sub:`sur ${adminShopOwners.length} total`, color: G },
                  { label:"Nouvelles destinations", value: topDests.length, sub:"détectées dans chats", color: "#60a5fa" },
                  { label:"Demandes de devis", value: allDevis.length, sub:`${allDevis.filter(d=>new Date(d.created_at)>=monthStart).length} ce mois`, color: G },
                ].map(s => (
                  <div key={s.label} style={{ background:W, borderRadius:10, padding:"18px 16px", border:`1px solid ${BORDER}`, boxShadow:"0 2px 8px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize:28, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-1px", marginBottom:6 }}>{s.value}</div>
                    <div style={{ fontSize:10, color:T2, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:"0.5px", marginBottom:4 }}>{s.label}</div>
                    <div style={{ fontSize:10, color: s.color, fontWeight:600 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
                <div style={{ background:W, borderRadius:12, padding:"22px 24px", border:`1px solid ${BORDER}` }}>
                  <h4 style={{ fontSize:12, fontWeight:800, color:T1, margin:"0 0 18px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Activité jour par jour — {now.toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}</h4>
                  {msgsThisMonth.length === 0 ? (
                    <div style={{ color:T3, fontSize:12, textAlign:"center" as const, padding:"24px 0" }}>Aucun message ce mois</div>
                  ) : (
                    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:80, paddingBottom:4 }}>
                      {msgsByDay.map(d => (
                        <div key={d.day} style={{ flex:1, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:2 }}>
                          <div title={`${d.day}/${now.getMonth()+1} : ${d.count} msg`} style={{ width:"100%", height: d.count === 0 ? 2 : Math.max(4, Math.round((d.count / maxDay) * 72)), background: d.count === 0 ? BORDER : d.day === now.getDate() ? G : `rgba(201,168,76,${0.3 + 0.7 * (d.count / maxDay)})`, borderRadius:"2px 2px 0 0", cursor:"default", transition:"all 0.2s" }}/>
                          {(d.day === 1 || d.day === 10 || d.day === 20 || d.day === now.getDate()) && <div style={{ fontSize:8, color:T3, fontWeight:600 }}>{d.day}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ background:W, borderRadius:12, padding:"22px 24px", border:`1px solid ${BORDER}` }}>
                  <h4 style={{ fontSize:12, fontWeight:800, color:T1, margin:"0 0 18px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Destinations les plus demandées</h4>
                  {topDests.length === 0 ? (
                    <div style={{ color:T3, fontSize:12, textAlign:"center" as const, padding:"24px 0" }}>Aucune destination détectée</div>
                  ) : topDests.map(([dest, count], i) => (
                    <div key={dest} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ fontSize:11, fontWeight:800, color:T3, width:16, textAlign:"right" as const }}>{i+1}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:T1, width:110, flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{dest}</div>
                      <div style={{ flex:1, background:BG, borderRadius:4, height:8, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${(count/maxDest)*100}%`, background:`linear-gradient(90deg,${G},${GL})`, borderRadius:4, transition:"width 0.5s" }}/>
                      </div>
                      <div style={{ fontSize:11, fontWeight:800, color:G, width:24, textAlign:"right" as const }}>{count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background:W, borderRadius:12, padding:"22px 24px", border:`1px solid ${BORDER}`, marginBottom:20 }}>
                <h4 style={{ fontSize:12, fontWeight:800, color:T1, margin:"0 0 18px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Performance des boutiques</h4>
                {boutiqueActivity.length === 0 ? (
                  <div style={{ color:T3, fontSize:12, textAlign:"center" as const, padding:"20px" }}>Aucune boutique enregistrée</div>
                ) : boutiqueActivity.map((b, i) => (
                  <div key={b.owner} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12, padding:"12px 14px", borderRadius:8, background: i===0 ? `rgba(201,168,76,0.05)` : BG, border:`1px solid ${i===0?`rgba(201,168,76,0.2)`:BORDER}` }}>
                    <div style={{ fontSize:11, fontWeight:800, color: i===0?G:T3, width:20, textAlign:"center" as const }}>{i===0?"★":`#${i+1}`}</div>
                    <div style={{ width:36, height:36, borderRadius:8, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", color:G, fontWeight:900, fontSize:14, flexShrink:0 }}>{b.owner[0].toUpperCase()}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:13, color:T1, marginBottom:2 }}>{b.owner}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <div style={{ flex:1, background:"#e4e8ef", borderRadius:4, height:6, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${(b.messages/maxBoutiqueMsg)*100}%`, background:`linear-gradient(90deg,${N2},${N3})`, borderRadius:4 }}/>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" as const, flexShrink:0 }}>
                      <div style={{ fontSize:14, fontWeight:900, color:T1 }}>{b.messages}</div>
                      <div style={{ fontSize:9, color:T3, fontWeight:600, textTransform:"uppercase" as const }}>messages</div>
                    </div>
                    <div style={{ textAlign:"right" as const, flexShrink:0, borderLeft:`1px solid ${BORDER}`, paddingLeft:14 }}>
                      <div style={{ fontSize:14, fontWeight:900, color:G }}>{b.products}</div>
                      <div style={{ fontSize:9, color:T3, fontWeight:600, textTransform:"uppercase" as const }}>produits</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:W, borderRadius:12, padding:"24px", border:`1px solid ${BORDER}`, marginTop:22 }}>
              <h3 style={{ fontSize:14, fontWeight:800, color:T1, margin:"0 0 4px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Demandes de devis ({allDevis.length})</h3>
              <p style={{ color:T3, fontSize:11, margin:"0 0 18px", fontWeight:600 }}>Soumises par les clients via le formulaire</p>
              {allDevis.length === 0 ? (
                <div style={{ color:T3, fontSize:13, textAlign:"center" as const, padding:"28px" }}>Aucune demande reçue</div>
              ) : (
                <div style={{ maxHeight:300, overflowY:"auto" as const }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" as const, fontSize:12 }}>
                    <thead><tr style={{ background:N1, position:"sticky" as const, top:0 }}>{["Client","Poids","Destination","Type","Statut","Accepté par","Date"].map(h=><th key={h} style={{ padding:"10px 14px", textAlign:"left" as const, color:G, fontSize:10, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase" as const }}>{h}</th>)}</tr></thead>
                    <tbody>{allDevis.map((d,i)=>(
                      <tr key={d.id} style={{ borderTop:`1px solid ${BORDER}`, background:i%2===0?W:BG }}>
                        <td style={{ padding:"10px 14px", fontWeight:700, color:T1 }}>{d.nom}</td>
                        <td style={{ padding:"10px 14px", color:G, fontWeight:700 }}>{d.poids} kg</td>
                        <td style={{ padding:"10px 14px", color:T1 }}>{d.destination}</td>
                        <td style={{ padding:"10px 14px", color:T2 }}>{d.type_colis||"—"}</td>
                        <td style={{ padding:"10px 14px" }}><span style={{ padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:700, background:d.statut==="accepte"?"#f0fdf4":BG, color:d.statut==="accepte"?"#166534":T3 }}>{d.statut==="accepte"?"✓ Accepté":"⏳ En attente"}</span></td>
                        <td style={{ padding:"10px 14px", color:G, fontWeight:600 }}>{d.repondu_par||"—"}</td>
                        <td style={{ padding:"10px 14px", color:T3 }}>{new Date(d.created_at).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"2-digit"})}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
            <div style={{ background:W, borderRadius:12, padding:"24px", border:`1px solid ${BORDER}`, marginTop:22 }}>
              <h3 style={{ fontSize:14, fontWeight:800, color:T1, margin:"0 0 18px", textTransform:"uppercase" as const, letterSpacing:"1px" }}>Historique ({dbMessages.length} messages)</h3>
              <div style={{ maxHeight:320, overflowY:"auto" as const }}>
                {dbMessages.slice(-30).reverse().map(m=>(
                  <div key={m.id} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:`1px solid ${BG}`, alignItems:"flex-start" }}>
                    <div style={{ width:32, height:32, borderRadius:6, background:`linear-gradient(135deg,${N2},${N3})`, display:"flex", alignItems:"center", justifyContent:"center", color:G, fontWeight:900, fontSize:12, flexShrink:0 }}>{m.from_name[0].toUpperCase()}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:2, flexWrap:"wrap" }}>
                        <span style={{ fontSize:12, fontWeight:700, color:T1 }}>{m.from_name}</span>
                        {m.to_name && <><span style={{ fontSize:10, color:T3 }}>→</span><span style={{ fontSize:11, color:G, fontWeight:600 }}>{m.to_name}</span></>}
                        {!m.to_name && <span style={{ fontSize:9, background:BG, color:T2, border:`1px solid ${BORDER}`, borderRadius:4, padding:"1px 6px", fontWeight:700, letterSpacing:"0.5px" }}>PUBLIC</span>}
                        <span style={{ fontSize:10, color:T3, marginLeft:"auto" }}>{new Date(m.created_at).toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit"})}</span>
                      </div>
                      <div style={{ fontSize:12, color:T2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <section style={{ background:N1, padding:"64px 2rem", textAlign:"center" as const, borderTop:`1px solid rgba(201,168,76,0.12)` }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <div style={{ fontSize:11, color:G, letterSpacing:"3px", fontWeight:700, textTransform:"uppercase" as const, marginBottom:16 }}>Rejoignez le réseau</div>
          <h2 style={{ color:W, fontSize:28, fontWeight:800, marginBottom:12, letterSpacing:"-0.5px" }}>Vous êtes une agence de livraison ?</h2>
          <p style={{ color:T3, fontSize:14, marginBottom:32, lineHeight:1.7 }}>Accédez à des clients qualifiés · Visibilité gratuite · Croissance immédiate</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>{setShowForm(true);setFormType("agence");setFormStatus("idle");}} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"14px 32px", fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:"1px" }}>INSCRIRE MON AGENCE →</button>
            <button onClick={()=>{setShowForm(true);setFormType("client");setFormStatus("idle");}} style={{ background:"transparent", color:T2, border:`1px solid rgba(255,255,255,0.1)`, borderRadius:6, padding:"14px 24px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Je suis client</button>
          </div>
        </div>
      </section>

      <footer style={{ background:"#050a14", color:T3, padding:"28px 2rem", textAlign:"center" as const, fontSize:11 }}>
        <div style={{ fontWeight:900, color:G, fontSize:14, marginBottom:5, letterSpacing:"1px" }}>DELIVRAMAROC</div>
        <div style={{ color:"#2a3545" }}>Plateforme logistique Maroc–Afrique · Casablanca 🇲🇦</div>
        <div style={{ marginTop:6, color:"#1a2535", fontWeight:600 }}>© 2026 DelivraMaroc · Tous droits réservés</div>
      </footer>

      {/* MODAL RÉPONSE DEVIS */}
      {replyDevis && (
        <div onClick={()=>setReplyDevis(null)} style={{ position:"fixed", inset:0, background:"rgba(5,10,20,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(10px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:W, borderRadius:12, padding:"36px", maxWidth:480, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <h3 style={{ fontSize:18, fontWeight:800, color:T1, margin:0 }}>Répondre au devis</h3>
              <button onClick={()=>setReplyDevis(null)} style={{ background:BG, border:"none", borderRadius:6, width:32, height:32, fontSize:18, cursor:"pointer", color:T2 }}>×</button>
            </div>
            <div style={{ background:BG, borderRadius:8, padding:"12px 16px", marginBottom:20, fontSize:12, color:T2 }}>
              <strong style={{ color:T1 }}>{replyDevis.nom}</strong> · {replyDevis.poids} kg → <strong style={{ color:G }}>{replyDevis.destination}</strong> · {replyDevis.type_colis||"Standard"}
              {replyDevis.description && <div style={{ marginTop:6, color:T3 }}>{replyDevis.description}</div>}
            </div>
            <label style={{ fontSize:11, fontWeight:700, color:T2, display:"block", marginBottom:8, textTransform:"uppercase" as const, letterSpacing:"1px" }}>Votre message au client (tarif, délai, contact...)</label>
            <textarea rows={4} value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Ex : Bonjour, nous acceptons votre envoi. Tarif 65 DH/kg, délai 3-5 jours. Appelez-nous au +212 6XX XXX XXX." autoFocus style={{ width:"100%", padding:"13px 16px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:13, outline:"none", resize:"none" as const, boxSizing:"border-box" as const, color:T1, lineHeight:1.6, marginBottom:16 }}/>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setReplyDevis(null)} style={{ flex:1, padding:"12px", borderRadius:6, border:`1px solid ${BORDER}`, background:BG, color:T2, fontSize:13, fontWeight:600, cursor:"pointer" }}>Annuler</button>
              <button onClick={async()=>{ if(!replyText.trim()) return; await supabase.from("devis").update({ reponse:replyText.trim(), repondu_par:dn, statut:"accepte" }).eq("id",replyDevis.id); setAllDevis(prev=>prev.map(x=>x.id===replyDevis.id?{...x,reponse:replyText.trim(),repondu_par:dn,statut:"accepte"}:x)); setReplyDevis(null); setReplyText(""); }} style={{ flex:2, background:"#22c55e", color:W, border:"none", borderRadius:6, padding:"12px", fontSize:13, fontWeight:800, cursor:"pointer" }}>✓ ACCEPTER CE DEVIS</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NOM BOUTIQUE */}
      {showShopEdit && (
        <div onClick={()=>setShowShopEdit(false)} style={{ position:"fixed", inset:0, background:"rgba(5,10,20,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(10px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:W, borderRadius:12, padding:"36px", maxWidth:420, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontSize:18, fontWeight:800, color:T1, margin:"0 0 8px", letterSpacing:"-0.3px" }}>Nom de ma boutique</h3>
            <p style={{ color:T2, fontSize:13, marginBottom:24, lineHeight:1.6 }}>Ce nom s&apos;affichera dans le chat à la place de votre prénom.</p>
            <input value={shopNameInput} onChange={e=>setShopNameInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")saveShopName();}} placeholder="Ex : Boutique Ivan, MarocShop..." autoFocus style={{ width:"100%", padding:"13px 16px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:15, outline:"none", boxSizing:"border-box" as const, marginBottom:16, color:T1, fontWeight:600 }}/>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setShowShopEdit(false)} style={{ flex:1, padding:"12px", borderRadius:6, border:`1px solid ${BORDER}`, background:BG, color:T2, fontSize:13, fontWeight:600, cursor:"pointer" }}>Annuler</button>
              <button onClick={saveShopName} style={{ flex:2, background:G, color:N1, border:"none", borderRadius:6, padding:"12px", fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:"0.5px" }}>ENREGISTRER ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AJOUTER PRODUIT */}
      {showAddProd && (
        <div onClick={()=>setShowAddProd(false)} style={{ position:"fixed", inset:0, background:"rgba(5,10,20,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(10px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:W, borderRadius:12, padding:"36px", maxWidth:440, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h3 style={{ fontSize:18, fontWeight:800, color:T1, margin:0, letterSpacing:"-0.3px" }}>Nouveau produit</h3>
              <button onClick={()=>setShowAddProd(false)} style={{ background:BG, border:"none", borderRadius:6, width:32, height:32, fontSize:16, cursor:"pointer", color:T2 }}>×</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column" as const, gap:16 }}>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:T2, display:"block", marginBottom:8, textTransform:"uppercase" as const, letterSpacing:"1px" }}>Icône</label>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {EMOJIS.map(e=><button key={e} onClick={()=>setNewProd(p=>({...p,emoji:e}))} style={{ width:42, height:42, borderRadius:6, border:`2px solid ${newProd.emoji===e?G:BORDER}`, background:newProd.emoji===e?"rgba(201,168,76,0.08)":W, fontSize:20, cursor:"pointer" }}>{e}</button>)}
                </div>
              </div>
              {[{k:"name",l:"Nom du produit *",p:"Ex : Sac en cuir"},{k:"price",l:"Prix",p:"Ex : 150 DH"},{k:"description",l:"Description",p:"Ex : Fait main, disponible"}].map(f=>(
                <div key={f.k}>
                  <label style={{ fontSize:11, fontWeight:700, color:T2, display:"block", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:"1px" }}>{f.l}</label>
                  <input value={newProd[f.k as keyof typeof newProd]} onChange={e=>setNewProd(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={{ width:"100%", padding:"11px 14px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:13, outline:"none", boxSizing:"border-box" as const, color:T1 }}/>
                </div>
              ))}
              <button onClick={addProduct} style={{ background:G, color:N1, border:"none", borderRadius:6, padding:"14px", fontSize:13, fontWeight:800, cursor:"pointer", marginTop:4, letterSpacing:"0.5px" }}>PUBLIER LE PRODUIT ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INSCRIPTION */}
      {showForm && (
        <div onClick={()=>setShowForm(false)} style={{ position:"fixed", inset:0, background:"rgba(5,10,20,0.88)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem", backdropFilter:"blur(10px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:W, borderRadius:12, padding:"36px", maxWidth:460, width:"100%", maxHeight:"90vh", overflowY:"auto" as const, boxShadow:"0 32px 80px rgba(0,0,0,0.5)" }}>
            {formStatus==="success" ? (
              <div style={{ textAlign:"center" as const, padding:"24px 0" }}>
                <div style={{ width:60, height:60, borderRadius:10, background:`linear-gradient(135deg,${G},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 20px" }}>✓</div>
                <h3 style={{ fontSize:20, fontWeight:800, color:T1, marginBottom:8 }}>Inscription transmise !</h3>
                <p style={{ color:T2, lineHeight:1.7, fontSize:13 }}>Notre équipe vous contactera dans les 24h ouvrées.</p>
                <button onClick={()=>setShowForm(false)} style={{ marginTop:20, background:G, color:N1, border:"none", borderRadius:6, padding:"11px 24px", fontSize:13, fontWeight:800, cursor:"pointer" }}>Fermer</button>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
                  <h3 style={{ fontSize:18, fontWeight:800, color:T1, margin:0 }}>{formType==="agence"?"Inscrire mon agence":"Devenir client"}</h3>
                  <button onClick={()=>setShowForm(false)} style={{ background:BG, border:"none", borderRadius:6, width:32, height:32, fontSize:16, cursor:"pointer", color:T2 }}>×</button>
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:22 }}>
                  <button onClick={()=>setFormType("client")} style={{ flex:1, padding:"9px", borderRadius:6, border:`1.5px solid`, borderColor:formType==="client"?G:BORDER, background:formType==="client"?"rgba(201,168,76,0.06)":W, fontWeight:700, cursor:"pointer", fontSize:12, color:formType==="client"?GD:T2 }}>Client</button>
                  <button onClick={()=>setFormType("agence")} style={{ flex:1, padding:"9px", borderRadius:6, border:`1.5px solid`, borderColor:formType==="agence"?G:BORDER, background:formType==="agence"?"rgba(201,168,76,0.06)":W, fontWeight:700, cursor:"pointer", fontSize:12, color:formType==="agence"?GD:T2 }}>Agence</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column" as const, gap:14 }}>
                  {(formType==="agence"?([["Nom de l'agence *","nom"],["Responsable","responsable"],["Téléphone *","tel"],["Email","email"],["Zones desservies","zones"],["Tarif indicatif","tarif"]] as [string,string][]):([["Nom complet *","nom"],["Téléphone *","tel"],["Email","email"],["Ville","zones"]] as [string,string][])).map(([l,k])=>(
                    <div key={k}>
                      <label style={{ fontSize:11, fontWeight:700, color:T2, display:"block", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:"0.8px" }}>{l}</label>
                      <input value={formData[k as keyof typeof formData]} onChange={e=>setFormData({...formData,[k]:e.target.value})} placeholder={l.replace(" *","")} style={{ width:"100%", padding:"11px 14px", borderRadius:6, border:`1.5px solid ${formStatus==="error"&&(k==="nom"||k==="tel")&&!formData[k as keyof typeof formData]?"#ef4444":BORDER}`, fontSize:13, outline:"none", boxSizing:"border-box" as const, color:T1 }}/>
                    </div>
                  ))}
                </div>
                {formStatus==="error" && <div style={{ marginTop:12, padding:"10px 14px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:6, fontSize:12, color:"#dc2626", fontWeight:600 }}>Veuillez remplir les champs obligatoires (*)</div>}
                <button onClick={async()=>{
                  if(!formData.nom||!formData.tel){setFormStatus("error");return;}
                  setFormStatus("loading");
                  try{const res=await fetch("/api/inscriptions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...formData,type:formType,created_at:new Date().toISOString()})});if(res.ok){setFormStatus("success");setFormData({nom:"",responsable:"",tel:"",email:"",zones:"",tarif:""});}else setFormStatus("error");}catch{setFormStatus("error");}
                }} disabled={formStatus==="loading"} style={{ width:"100%", background:formStatus==="loading"?T3:G, color:N1, border:"none", borderRadius:6, padding:"14px", fontSize:13, fontWeight:800, cursor:formStatus==="loading"?"not-allowed":"pointer", marginTop:20, letterSpacing:"0.5px" }}>
                  {formStatus==="loading"?"Envoi en cours...":formType==="agence"?"SOUMETTRE MA CANDIDATURE →":"TROUVER UNE AGENCE →"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL NOM */}
      {showNameModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(5,10,20,0.95)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, padding:"1rem", backdropFilter:"blur(16px)" }}>
          <div style={{ background:W, borderRadius:12, padding:"48px 40px", maxWidth:420, width:"100%", textAlign:"center" as const, boxShadow:"0 40px 100px rgba(0,0,0,0.6)" }}>
            <div style={{ width:56, height:56, borderRadius:10, background:`linear-gradient(135deg,${G},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 20px" }}>DM</div>
            <h2 style={{ fontSize:22, fontWeight:900, color:T1, margin:"0 0 10px", letterSpacing:"-0.5px" }}>Bienvenue sur DelivraMaroc</h2>
            <p style={{ color:T2, fontSize:13, marginBottom:28, lineHeight:1.8 }}>Entrez votre prénom pour accéder à la plateforme et communiquer en temps réel.</p>
            {isOwner && (
              <div style={{ background:"rgba(201,168,76,0.06)", border:`1px solid rgba(201,168,76,0.2)`, borderRadius:6, padding:"10px 16px", marginBottom:22, fontSize:12, color:GD, fontWeight:700, letterSpacing:"0.5px" }}>
                ★ ACCÈS PROPRIÉTAIRE
              </div>
            )}
            <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")joinChat();}} placeholder="Votre prénom..." autoFocus style={{ width:"100%", padding:"14px 18px", borderRadius:6, border:`1.5px solid ${BORDER}`, fontSize:16, outline:"none", boxSizing:"border-box" as const, marginBottom:14, textAlign:"center" as const, fontWeight:700, color:T1 }}/>
            <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:20, cursor:"pointer", fontSize:13, color:T2 }}>
              <input type="checkbox" checked={rememberMe} onChange={e=>setRememberMe(e.target.checked)} style={{ width:15, height:15, cursor:"pointer", accentColor:G }}/>
              Se souvenir de moi
            </label>
            <button onClick={joinChat} style={{ width:"100%", background:G, color:N1, border:"none", borderRadius:6, padding:"15px", fontSize:14, fontWeight:800, cursor:"pointer", letterSpacing:"1px" }}>
              ACCÉDER À LA PLATEFORME →
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
