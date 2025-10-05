"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const getToastConfig = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-emerald-500',
          borderColor: 'border-emerald-400',
          iconColor: 'text-emerald-400',
          bgGradient: 'from-emerald-500/10 to-emerald-600/5',
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-500',
          borderColor: 'border-red-400',
          iconColor: 'text-red-400',
          bgGradient: 'from-red-500/10 to-red-600/5',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-500',
          borderColor: 'border-yellow-400',
          iconColor: 'text-yellow-400',
          bgGradient: 'from-yellow-500/10 to-yellow-600/5',
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-500',
          borderColor: 'border-blue-400',
          iconColor: 'text-blue-400',
          bgGradient: 'from-blue-500/10 to-blue-600/5',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gray-500',
          borderColor: 'border-gray-400',
          iconColor: 'text-gray-400',
          bgGradient: 'from-gray-500/10 to-gray-600/5',
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative max-w-sm w-full bg-gradient-to-r ${config.bgGradient} 
        backdrop-blur-xl border ${config.borderColor}/30 rounded-xl 
        shadow-lg shadow-black/20 p-4
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-6 h-6 ${config.iconColor}`}>
          <Icon className="w-full h-full" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-xs text-gray-300 mt-1">
              {toast.message}
            </p>
          )}
          
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${config.bgColor} rounded-b-xl`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default ToastProvider;
