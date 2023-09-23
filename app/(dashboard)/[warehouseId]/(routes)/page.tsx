import { InventoryTable } from "@/components/inventory-table";
import { Dialog } from "@/components/ui/dialog";
import ItemProps from "@/lib/ItemProps";
import OrderProps from "@/lib/ItemProps";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { warehouseId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const items = await prismadb.item.findMany({
    where: {
      warehouseId: params.warehouseId,
    },
  });

  return <InventoryTable items={items} />;
};

export default DashboardPage;
