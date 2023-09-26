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
