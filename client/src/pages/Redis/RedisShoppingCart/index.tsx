import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  RefreshCw,
} from "lucide-react";

import RedisSimulator from "../RedisSimulator";
import { initProduct, Product } from "../model";

interface Log {
  command: string;
  description: string;
  time: string;
}

interface RedisShoppingCartProps {
  products: Product[];
}

const RedisShoppingCart = ({ products }: RedisShoppingCartProps) => {
  const [userId] = useState("user_123");
  const [cart, setCart] = useState({});
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  const addLog = (command: string, description: string) => {
    setLogs((prev) => [
      ...prev,
      { command, description, time: new Date().toLocaleTimeString() },
    ]);
  };

  const loadCart = async () => {
    setLoading(true);
    const cartKey = `cart:${userId}`;
    const cartData = await RedisSimulator.getAll(cartKey);
    setCart(cartData);
    addLog(
      `Redis getAll cart:${userId}`,
      "Load giỏ hàng từ Redis (persistent storage)"
    );
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (product: Product) => {
    const cartKey = `cart:${userId}`;
    const currentQty =
      Number((cart as Record<string, number>)[product.id]) || 0;
    await RedisSimulator.set(cartKey, product.id, currentQty + 1);
    addLog(
      `Redis set cart:${userId} ${product.id} ${currentQty + 1}`,
      `Thêm ${product.name} vào giỏ`
    );
    await loadCart();
  };

  const updateQuantity = async (productId: string, change: number) => {
    const cartKey = `cart:${userId}`;
    const newQty = await RedisSimulator.incrementBy(cartKey, productId, change);

    if (newQty <= 0) {
      await RedisSimulator.delete(cartKey, productId);
      addLog(
        `Redis delete cart:${userId} ${productId}`,
        "Xóa sản phẩm khỏi giỏ"
      );
    } else {
      addLog(
        `Redis incrementBy cart:${userId} ${productId} ${change}`,
        `Cập nhật số lượng: ${change > 0 ? "+" : ""}${change}`
      );
    }
    await loadCart();
  };

  const removeFromCart = async (productId: string) => {
    const cartKey = `cart:${userId}`;
    await RedisSimulator.delete(cartKey, productId);
    addLog(`Redis delete cart:${userId} ${productId}`, "Xóa sản phẩm");
    await loadCart();
  };

  const clearCart = async () => {
    const cartKey = `cart:${userId}`;
    await RedisSimulator.del(cartKey);
    addLog(`DEL cart:${userId}`, "Xóa toàn bộ giỏ hàng");
    await loadCart();
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      return { ...(product ?? initProduct), quantity: Number(quantity) };
    });
  };

  const getTotalPrice = () => {
    return getCartItems().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const cartItems = getCartItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="text-indigo-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Redis Shopping Cart Demo
                </h1>
                <p className="text-sm text-green-600 font-semibold mt-1">
                  Dữ liệu lưu persistent - Reload vẫn còn!
                </p>
              </div>
            </div>
            <button
              onClick={loadCart}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
            >
              <RefreshCw size={18} />
              Reload
            </button>
          </div>
          <p className="text-gray-600 mt-3">
            Ứng dụng demo sử dụng Redis Hash với persistent storage. Key:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">cart:user_123</code>
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang load dữ liệu từ Redis...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Sản phẩm</h2>
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-indigo-600 font-bold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Thêm
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingCart size={24} />
                  Giỏ hàng ({cartItems.length})
                </h2>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Xóa tất cả
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Giỏ hàng trống</p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="font-bold text-indigo-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Tổng cộng:
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Redis Commands Log
          </h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">Chưa có lệnh nào được thực thi...</p>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="mb-2">
                  <span className="text-gray-500">[{log.time}]</span>{" "}
                  <span className="text-yellow-400">{log.command}</span>
                  <div className="text-gray-400 ml-4">// {log.description}</div>
                </div>
              ))
            )}
          </div>
        </div> */}

        <div className="bg-indigo-50 rounded-lg p-6 mt-6">
          <h3 className="font-bold text-gray-800 mb-2">
            📚 Kiến thức Redis trong bài:
          </h3>
          <ul className="space-y-1 text-gray-700">
            <li>
              <code className="bg-white px-2 py-1 rounded">SET</code> - Lưu giá
              trị vào Hash
            </li>
            <li>
              <code className="bg-white px-2 py-1 rounded">GET</code> - Lấy một
              field từ Hash
            </li>
            <li>
              <code className="bg-white px-2 py-1 rounded">GETALL</code> - Lấy
              tất cả fields từ Hash
            </li>
            <li>
              <code className="bg-white px-2 py-1 rounded">DELETE</code> - Xóa
              field khỏi Hash
            </li>
            <li>
              <code className="bg-white px-2 py-1 rounded">INCREMENT BY</code> -
              Tăng/giảm giá trị number trong Hash
            </li>
            <li>
              <code className="bg-white px-2 py-1 rounded">DEL</code> - Xóa toàn
              bộ key
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RedisShoppingCart;
