import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Voeu } from "@/lib/models/Voeu";

export async function GET() {
  try {
    await connectDB();
    const data = await Voeu.find().sort({ date: -1 }).lean();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { nom, message } = body;

    if (!nom || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const voeu = await Voeu.create({ nom, message });
    return NextResponse.json(voeu, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await Voeu.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
