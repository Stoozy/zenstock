import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { warehouseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const warehouse = await prismadb.warehouse.findFirst({
    where: {
      id: params.warehouseId,
      userId,
    },
  });

  if (!warehouse) {
    redirect("/");
  }

  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
}
