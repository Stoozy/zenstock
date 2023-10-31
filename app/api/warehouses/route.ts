import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { id, name, email, number, notify } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const warehouse = await prismadb.warehouse.update({
      where: {
        id,
      },
      data: {
        name,
        userId,
        email,
        number,
        notify,
      },
    });

    return NextResponse.json(warehouse);
  } catch (err) {
    console.log("[WAREHOUSE_PUT]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, email, number, notify } = body;

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
        email,
        number,
        notify,
      },
    });

    return NextResponse.json(warehouse);
  } catch (err) {
    console.log("[WAREHOUSE_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { id } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const items = await prismadb.item.findMany({
      where: {
        warehouseId: id,
      },
    });

    // delete purchase orders associated with warehouse
    await prismadb.purchase_order.deleteMany({
      where: {
        warehouseId: id,
      },
    });

    // delete alerts associated with items
    items.forEach(async (item) => {
      await prismadb.alert.deleteMany({
        where: {
          itemId: item.id,
        },
      });
    });

    // delete items associated with warehouse
    await prismadb.item.deleteMany({
      where: {
        warehouseId: id,
      },
    });

    // finally delete the warehouse
    const warehouse = await prismadb.warehouse.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(warehouse);
  } catch (err) {
    console.log("[WAREHOUSE_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
