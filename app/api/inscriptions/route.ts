import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // TODO: connecter Supabase ici
    // ex: await supabase.from("inscriptions").insert(data)
    console.log("Nouvelle inscription:", data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
