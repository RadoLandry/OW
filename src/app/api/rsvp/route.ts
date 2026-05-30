import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/rsvp.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, presence, accompagnants } = body;

    if (!nom || !presence) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newEntry = {
      id: Date.now(),
      nom,
      presence,
      accompagnants: accompagnants || 0,
      date: new Date().toISOString(),
    };
    data.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newEntry, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
