import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />;
        let borderColor = 'border-sky-500/30';
        let bgGradient = 'from-sky-950/90 to-slate-900/90';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
          borderColor = 'border-emerald-500/30';
          bgGradient = 'from-emerald-950/90 to-slate-900/90';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />;
          borderColor = 'border-amber-500/30';
          bgGradient = 'from-amber-950/90 to-slate-900/90';
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />;
          borderColor = 'border-rose-500/30';
          bgGradient = 'from-rose-950/90 to-slate-900/90';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r ${bgGradient} backdrop-blur-xl border ${borderColor} shadow-2xl text-slate-100 animate-in slide-in-from-bottom-3 fade-in duration-200 transition-all`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold tracking-wide text-slate-200 uppercase font-heading">
                  {toast.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-800/60 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
