import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("voeux")
      .select("*")
      .order("date", { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, message } = body;

    if (!nom || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("voeux")
      .insert([{ nom, message }])
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erreur serveur", details: err }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    const { error } = await supabase.from("voeux").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
