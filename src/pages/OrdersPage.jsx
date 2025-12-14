import { useState, useEffect } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-obsidian border-t-transparent animate-spin rounded-full"/>
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold tracking-tighter mb-4 text-neutral-300">NO ORDER HISTORY</h2>
      <Link to="/" className="btn-editorial">Start Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-screen">
      <div className="flex items-baseline justify-between mb-12 border-b border-concrete pb-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Order History</h1>
        <span className="text-neutral-400 font-mono text-sm">{orders.length} ORDERS</span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="group border border-transparent hover:border-concrete hover:bg-vapor transition-all duration-300 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Order Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-neutral-400">#{order.id.slice(0, 8)}</span>
                  <span className="px-2 py-0.5 bg-obsidian text-white text-[10px] font-bold uppercase tracking-widest">Confirmed</span>
                </div>
                <div className="text-sm text-neutral-500">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex -space-x-3 overflow-hidden py-2">
                {order.OrderItems?.slice(0, 4).map((item, idx) => (
                   <img 
                    key={idx}
                    src={item.Product?.image} 
                    alt="Product"
                    className="w-10 h-10 rounded-full border border-white bg-white object-cover grayscale opacity-80"
                   />
                ))}
                {order.OrderItems?.length > 4 && (
                  <div className="w-10 h-10 rounded-full border border-white bg-neutral-200 flex items-center justify-center text-xs font-medium">
                    +{order.OrderItems.length - 4}
                  </div>
                )}
              </div>

              {/* Total & Action */}
              <div className="flex items-center gap-8 md:text-right">
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-400">Total</div>
                  <div className="font-medium tabular-nums text-lg">${parseFloat(order.total).toFixed(2)}</div>
                </div>
                <button className="hidden md:block text-xs uppercase font-bold tracking-widest border-b border-obsidian pb-1 hover:text-accent hover:border-accent transition-colors">
                  View Invoice
                </button>
              </div>
              
            </div>
            
            {/* Mobile Action */}
            <button className="md:hidden mt-4 w-full py-3 text-xs uppercase font-bold tracking-widest bg-white border border-concrete">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
