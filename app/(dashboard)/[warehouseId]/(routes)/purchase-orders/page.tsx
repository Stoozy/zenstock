import { Purchasetable } from "@/components/purchase-table";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { useParams } from "next/navigation";

// const OrdersPage = async () => {
//   const params = useParams();

//   const data = await prismadb.purchase_order.findMany({
//     where: {
//       warehouseId: params.warehouseId,
//     },
//   });
//   return <PurchaseTable></PurchaseTable>;
// };

interface DashboardPageProps {
  params: { warehouseId: string };
}

const OrdersPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const orders = await prismadb.purchase_order.findMany({
    where: {
      warehouseId: params.warehouseId,
    },
  });

  const dataWithTotals = orders.map((order) => {
    return { ...order, total: order.price * order.quantity };
  });

  return (
    <>
      <Purchasetable data={dataWithTotals} />
    </>
  );
};

export default OrdersPage;
