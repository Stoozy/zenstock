import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { warehouseId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const warehouse = await prismadb.warehouse.findFirst({
    where: {
      id: params.warehouseId,
    },
  });

  return <div>Active warehouse: {warehouse?.name}</div>;
};

export default DashboardPage;
