"use client";

import { useParams } from "next/navigation";

const OrdersPage = () => {
  const params = useParams();

  return (
    <div className="flex justify-center items-center">
      <h1 className="py-8">
        {" "}
        Purchase orders page for warehouse id: {params.warehouseId}
      </h1>
    </div>
  );
};

export default OrdersPage;
