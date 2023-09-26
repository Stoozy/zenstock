import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: {
    warehouseId: string;
  };
}

const SetttingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const warehouse = await prismadb.warehouse.findFirst({
    where: {
      userId,
    },
  });

  if (!warehouse) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm data={warehouse}></SettingsForm>
      </div>
    </div>
  );
};

export default SetttingsPage;
