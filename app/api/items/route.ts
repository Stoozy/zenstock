import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log(body);

    const { id } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (id === undefined) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const res = await prismadb.item.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    console.log("[ITEM_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log(body);

    const { name, description, category, quantity, cost, price, warehouseId } =
      body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      name === undefined ||
      description === undefined ||
      category === undefined ||
      quantity === undefined ||
      cost === undefined ||
      price === undefined ||
      warehouseId === undefined
    ) {
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
        warehouseId,
      },
    });

    return NextResponse.json(item);
  } catch (err) {
    console.log("[ITEM_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
