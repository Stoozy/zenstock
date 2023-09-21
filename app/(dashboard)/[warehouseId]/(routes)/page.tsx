import { Dashboard } from "@/components/dashboard";
import ItemProps from "@/lib/ItemProps";
import OrderProps from "@/lib/ItemProps";
import prismadb from "@/lib/prismadb";
import { DataTableDemo } from "@/components/datagrid";

interface DashboardPageProps {
  params: { warehouseId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const data = await prismadb.item.findMany({
    where: {
      warehouseId: params.warehouseId,
    },
  });

  const items: ItemProps[] = data;
  console.log(items);

  const productsToOrder: OrderProps[] = [];

  return <Dashboard items={items} orders={productsToOrder} />;
};

export default DashboardPage;
