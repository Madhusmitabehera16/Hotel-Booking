import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://luxstay-backend-l1kg.onrender.com/api";

const AUTH_ACTIONS = new Set(["login", "register", "google"]);

export async function POST(request, { params }) {
  const { action } = await params;

  if (!AUTH_ACTIONS.has(action)) {
    return NextResponse.json({ message: "Unknown auth action" }, { status: 404 });
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(`${API_BASE_URL}/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const contentType = backendResponse.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await backendResponse.json()
      : { message: await backendResponse.text() };

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error(`Auth proxy failed for ${action}:`, error);

    return NextResponse.json(
      {
        message:
          "Unable to reach the authentication server. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
