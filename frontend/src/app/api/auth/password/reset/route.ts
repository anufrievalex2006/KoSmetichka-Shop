import { API_URL } from "@/shared/api/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const res = await fetch(`${API_URL}/auth/password/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const data = await res.json().catch(() => null);
            return NextResponse.json(data ?? {
                message: "Request failed"
            }, {
                status: res.status
            });
        }
        return new NextResponse(null, {
            status: 204
        });
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}