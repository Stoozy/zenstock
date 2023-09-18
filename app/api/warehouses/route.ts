import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const warehouse = await prismadb.warehouse.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(warehouse);
  } catch (err) {
    console.log("[WAREHOUSE_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
