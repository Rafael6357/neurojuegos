import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  closeId?: string;
  wide?: boolean;
  children: React.ReactNode;
}

/** Ventana modal cósmica: oscura, con Escape y cierre por velo. */
export const Modal: React.FC<ModalProps> = ({
  id,
  open,
  onClose,
  title,
  subtitle,
  icon,
  closeId,
  wide = false,
  children,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05081a]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className={`anim-pop-in w-full ${wide ? 'max-w-lg' : 'max-w-sm'} rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-[#141b3d] to-[#0b1130] shadow-[0_24px_70px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center gap-3 p-5 pb-3">
          {icon && (
            <div className="p-2.5 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30 shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-black tracking-tight text-slate-50 leading-tight">{title}</h2>
            {subtitle && <p className="text-xs text-slate-400 font-semibold mt-0.5">{subtitle}</p>}
          </div>
          <button
            id={closeId}
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition text-slate-400 hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
