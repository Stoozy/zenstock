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

    if (!id) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const order = await prismadb.purchase_order.deleteMany({
      where: {
        id,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log("[PURCHASE_ORDER_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log(body);

    const { id, item, supplier, quantity, price, status, warehouseId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      id === undefined ||
      item === undefined ||
      supplier === undefined ||
      quantity === undefined ||
      price === undefined ||
      status === undefined
    ) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const order = await prismadb.purchase_order.update({
      where: {
        id,
      },
      data: {
        item,
        supplier,
        quantity,
        price,
        status,
        warehouseId,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log("[PURCHASE_ORDER_PUT]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log(body);

    const { item, supplier, quantity, price, status, warehouseId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      item === undefined ||
      supplier === undefined ||
      quantity === undefined ||
      price === undefined ||
      status === undefined
    ) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const order = await prismadb.purchase_order.create({
      data: {
        item,
        supplier,
        quantity,
        price,
        status,
        warehouseId,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log("[PURCHASE_ORDER_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
