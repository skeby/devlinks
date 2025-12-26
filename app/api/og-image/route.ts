import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs"; // Sharp requires the Node.js runtime

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing image URL", { status: 400 });
  }

  try {
    // 1. Fetch the original image from Firebase/External source
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // 2. Process with Sharp
    // .resize(600, 600) forces the 1:1 aspect ratio
    // fit: "cover" ensures it fills the square without stretching (crops edges)
    const optimizedBuffer = await sharp(inputBuffer)
      .resize(600, 600, {
        fit: "cover",
        position: "center",
      })
      .jpeg({
        quality: 80, // High quality but small file size for WhatsApp
        progressive: true,
      })
      .toBuffer();

    // 3. Return the optimized image
    return new NextResponse(optimizedBuffer as BufferSource, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=604800, immutable", // Cache for 7 days
      },
    });
  } catch (error: any) {
    console.error("OG Image Error:", error.message);
    return new NextResponse("Error processing image", { status: 500 });
  }
}
