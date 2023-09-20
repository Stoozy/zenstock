import { Dashboard } from "@/components/dashboard";
import ItemProps from "@/lib/ItemProps";
import OrderProps from "@/lib/ItemProps";
import prismadb from "@/lib/prismadb";
import { DataTableDemo } from "@/components/datagrid";

interface DashboardPageProps {
  params: { warehouseId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const warehouse = await prismadb.warehouse.findFirst({
    where: {
      id: params.warehouseId,
    },
  });

  const productsInStock: ItemProps[] = [];
  const productsToOrder: OrderProps[] = [];

  return <Dashboard items={productsInStock} orders={productsToOrder} />;
};

export default DashboardPage;
