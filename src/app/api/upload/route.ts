import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(request: Request) {
  // 1. RBAC Check: User must have manage:content or manage:catalog
  const session = await getSession();
  if (!session || (!assertPermission(session, "manage:content") && !assertPermission(session, "manage:catalog"))) {
    return NextResponse.json({ error: "Unauthorized to upload media" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = formData.get("altText") as string || "ExploreX Image";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 4MB limit" }, { status: 400 });
    }

    // 3. MIME validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file format. Only JPEG, PNG, and WebP images are permitted." },
        { status: 400 }
      );
    }

    // 4. Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 5. Secure Random Filename (Prevent path traversal and script execution)
    const randomHex = crypto.randomBytes(8).toString("hex");
    const filename = `img-${Date.now()}-${randomHex}.webp`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const targetPath = path.join(uploadsDir, filename);

    // 6. Compress and convert to WebP using Sharp
    await sharp(buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(targetPath);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      altText,
      size: fs.statSync(targetPath).size,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}

