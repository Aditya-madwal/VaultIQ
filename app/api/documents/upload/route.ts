import { NextRequest, NextResponse } from "next/server";
import { uploadFileToGCS } from "@/app/services/logic/gcs_upload";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check if file size is greater than 500MB
    // 500MB in bytes = 500 * 1024 * 1024
    const MAX_SIZE = 500 * 1024 * 1024;
    
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "you cant ipload more than 500" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadFileToGCS(buffer, file.name, file.type);

    if (!uploadResult) {
      return NextResponse.json(
        { error: "Failed to upload file to storage" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { url: uploadResult.url, gcsObjectId: uploadResult.fileName },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
