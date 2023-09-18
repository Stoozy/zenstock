import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, description, category, quantity, cost, price } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !description || !category || !quantity || !cost || !price) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const item = await prismadb.item.create({
      data: {
        name,
        description,
        category,
        quantity,
        cost,
        price,
      },
    });

    return NextResponse.json(item);
  } catch (err) {
    console.log("[ITEM_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
