import { NextRequest, NextResponse } from "next/server";
import { getDownloadUrl } from "@/app/services/logic/gcs_upload";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    const downloadUrl = await getDownloadUrl(fileId);

    if (!downloadUrl) {
      return NextResponse.json(
        { error: "File not found or could not generate download URL" },
        { status: 404 }
      );
    }

    // Return the URL so the client can initiate the download
    return NextResponse.json({ url: downloadUrl }, { status: 200 });
  } catch (error) {
    console.error("Download API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
