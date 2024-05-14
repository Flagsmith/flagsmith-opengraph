import {NextRequest, NextResponse} from "next/server";
import * as jose from 'jose'
import generateSVG from "@/app/api/image/generateSVG";

export const runtime = 'edge';


export async function GET(req: NextRequest, res: NextResponse) {


    const items = jose.decodeJwt(req.url.split("?t=")[1]).payload
    const svg = await generateSVG(items as any)

    const headers = new Headers();

    headers.set("Content-Type", "image/svg+xml");

    return new NextResponse(svg, {status: 200, statusText: "OK", headers});

}
