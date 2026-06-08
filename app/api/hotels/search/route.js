import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://luxstay-backend-l1kg.onrender.com/api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const backendUrl = `${API_BASE_URL}/hotels/search?${searchParams.toString()}`;

  try {
    const backendResponse = await fetch(backendUrl, { cache: "no-store" });
    const contentType = backendResponse.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await backendResponse.json()
      : { message: await backendResponse.text() };

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Hotel search proxy failed:", error);
    return NextResponse.json(
      {
        message:
          "Unable to reach the hotel search server. Please try again later.",
      },
      { status: 502 }
    );
  }
}
