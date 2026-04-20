const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");
const os = require("os");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// État en mémoire
const users = {};        // socketId → nom
let products = [];       // produits de la boutique
let productId = 1;
const messages = [];     // historique messages

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {

    socket.on("join", (name) => {
      users[socket.id] = name;
      io.emit("users", Object.values(users));
      socket.emit("history", messages.slice(-100));
      socket.emit("products", products);
    });

    socket.on("message", ({ to, text }) => {
      const msg = {
        id: Date.now(),
        from: users[socket.id] || "Anonyme",
        to: to || null,
        text,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      };
      messages.push(msg);

      if (to) {
        // Message privé : envoyer uniquement aux deux concernés
        const recipId = Object.entries(users).find(([, n]) => n === to)?.[0];
        socket.emit("message", msg);
        if (recipId) io.to(recipId).emit("message", msg);
      } else {
        // Message public : tout le monde
        io.emit("message", msg);
      }
    });

    socket.on("add_product", (p) => {
      const prod = { ...p, id: productId++, owner: users[socket.id] };
      products.push(prod);
      io.emit("products", products);
    });

    socket.on("delete_product", (id) => {
      products = products.filter((p) => p.id !== id);
      io.emit("products", products);
    });

    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("users", Object.values(users));
    });
  });

  // Trouver l'IP locale du réseau WiFi
  let localIp = "localhost";
  for (const nets of Object.values(os.networkInterfaces())) {
    for (const net of nets) {
      if (net.family === "IPv4" && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }

  httpServer.listen(3000, "0.0.0.0", () => {
    console.log("\n✅  DelivraMaroc est en ligne !\n");
    console.log(`   💻  Toi (propriétaire) : http://localhost:3000`);
    console.log(`   📱  Ton ami (même WiFi) : http://${localIp}:3000\n`);
    console.log("   ← Partage l'adresse réseau avec ton ami !\n");
  });
});
