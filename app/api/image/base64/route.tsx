import {NextRequest, NextResponse} from "next/server";
import generateSVG from "@/app/util/generateSVG";
export const runtime = 'edge';
export async function POST(req: NextRequest, res: NextResponse) {
    const json = await req.json()
    const svg = await generateSVG(json)
    const base64Data = Buffer.from(svg).toString('base64');
    const imageUrl = `data:image/svg+xml;base64,${base64Data}`;
    return new NextResponse(imageUrl, {status: 200, statusText: "OK"});
}
