import React from 'react';

interface AvatarProps {
  id?: string;
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  imageSrc?: string;
}

const SIZES: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-6 h-6 text-[11px] rounded-lg',
  md: 'w-9 h-9 text-sm rounded-xl',
  lg: 'w-12 h-12 text-lg rounded-2xl',
  xl: 'w-16 h-16 text-2xl rounded-3xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  id,
  name,
  color = 'from-amber-400 to-orange-500',
  size = 'md',
  className = '',
  imageSrc,
}) => {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <div
      id={id}
      aria-hidden="true"
      className={`bg-gradient-to-tr ${color} flex items-center justify-center text-white font-black shrink-0 shadow-lg ring-2 ring-white/20 overflow-hidden ${SIZES[size]} ${className}`}
    >
      {imageSrc ? (
        <img src={imageSrc} alt="" className="w-full h-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
};
