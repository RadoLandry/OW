import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Rsvp } from "@/lib/models/Rsvp";

export async function GET() {
  try {
    await connectDB();
    const data = await Rsvp.find().sort({ date: 1 }).lean();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { nom, presence, accompagnants } = body;

    if (!nom || !presence) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const rsvp = await Rsvp.create({ nom, presence, accompagnants: accompagnants || 0 });
    return NextResponse.json(rsvp, { status: 201 });
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

    await Rsvp.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
