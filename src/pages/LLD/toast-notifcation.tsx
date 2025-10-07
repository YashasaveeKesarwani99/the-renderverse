import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

// Toast context and hook
type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
};

type ToastContextType = {
  addToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null | undefined>(null);

export const useToast = () => {
  let ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used with ToastProvider!");
  return ctx;
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = ++toastId.current;
      setToasts((toasts) => [...toasts, { ...toast, id }]);
      setTimeout(() => removeToast(id), toast.duration ?? 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[200px] px-4 py-2 rounded shadow-lg text-white flex items-center justify-between
                        ${
                          toast.type === "success"
                            ? "bg-green-600"
                            : toast.type === "error"
                            ? "bg-red-600"
                            : "bg-gray-800"
                        }
                        `}
            role="alert"
          >
            <span>{toast.message}</span>
            <button
              className="ml-4 text-white hover:text-gray-200"
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Example usage
const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => addToast({ message: "Info Toast", type: "info" })}
      >
        Show Info Toast
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => addToast({ message: "Success Toast", type: "success" })}
      >
        Show Success Toast
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => addToast({ message: "Error Toast", type: "error" })}
      >
        Show Error Toast
      </button>
    </div>
  );
};

export function ToastNotificationPage() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}
