import dbConnect from "../../../../lib/dbConnect";
import Order from "../../../../models/Order.js";
import OrderManager from "./components/OrderManager";

async function getAllOrders() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { error: error.message };
  }
}

const OrdersPage = async () => {
  const ordersData = await getAllOrders();

  if (ordersData.error) {
    return <div className="alert alert-error">Error: {ordersData.error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
      </div>

      <OrderManager initialOrders={ordersData} />
    </div>
  );
};

export default OrdersPage;
