import { useEffect } from "react";
import { X } from "lucide-react";

function ToastMessage({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 flex items-center gap-3 bg-black text-white px-4 py-3 rounded-2xl shadow-lg animate-in slide-in-from-top-2">
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
}
export default ToastMessage;
