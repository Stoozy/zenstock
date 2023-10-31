export default interface PurchaseOrderProps {
  id: string;
  item: string;
  supplier: string;
  status: string;
  price: number;
  quantity: number;
  total: number;
  warehouseId: string;
}
