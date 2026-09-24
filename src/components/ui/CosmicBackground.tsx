import React from 'react';

interface CosmicBackgroundProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/** Fondo cósmico global: nebulosas + 3 capas de estrellas parpadeantes (CSS puro). */
export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ id, className = '', children }) => {
  return (
    <div id={id} className={`cosmos relative min-h-[calc(100vh-64px)] ${className}`}>
      <div className="stars" aria-hidden="true" />
      <div className="stars2" aria-hidden="true" />
      <div className="stars3" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
};
