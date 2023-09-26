import prismadb from "@/lib/prismadb";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const warehouse = await prismadb.warehouse.findFirst({
    where: {
      userId,
    },
  });

  if (warehouse) {
    redirect(`/${warehouse.id}`);
  }

  return <>{children}</>;
}
