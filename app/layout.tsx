import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DelivraMaroc — Livraison Maroc–Afrique",
  description: "Comparez les meilleures agences de livraison entre le Maroc et l'Afrique. Tarifs, délais, contact direct.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
