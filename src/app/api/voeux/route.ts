import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/voeux.json");

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
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

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newVoeu = {
      id: Date.now(),
      nom,
      message,
      date: new Date().toISOString(),
    };
    data.push(newVoeu);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newVoeu, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
