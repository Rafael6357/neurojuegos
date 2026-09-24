import React from 'react';

interface CardProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/** Panel cósmico estándar: sustituye los bg-[#1C212E] sueltos. */
export const Card: React.FC<CardProps> = ({ id, className = '', children }) => {
  return (
    <div
      id={id}
      className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_10px_36px_rgba(0,0,0,0.45)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
};
