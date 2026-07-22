import { NextResponse } from "next/server";
import { getPool, ensureSchema } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSchema();
  const { rows } = await getPool().query(
    "SELECT id, title, body, created_at FROM notes ORDER BY id DESC"
  );
  return NextResponse.json(rows);
}

export async function POST(request) {
  await ensureSchema();
  const body = await request.json().catch(() => ({}));
  if (!body?.title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  const { rows } = await getPool().query(
    "INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id, title, body, created_at",
    [body.title, body.body || ""]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
