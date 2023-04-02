import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const prompt = req.prompt;

  const response = await fetch(
    "https://aigeneraterandomimages.azurewebsites.net/api/generateimage",
    {
      method: "POST",
      headers: {
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify({ prompt }),
    }
  );
  const textData = await response.text();
  return NextResponse.json(textData);
}
