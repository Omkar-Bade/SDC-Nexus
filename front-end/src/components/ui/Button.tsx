import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FF5500]/50';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#FF5500] hover:bg-[#E04B00] text-white shadow-md shadow-[#FF5500]/20 hover:shadow-[#FF5500]/30 active:scale-[0.98]',
    secondary: 'bg-[#1E2028] hover:bg-[#282B36] text-[#F3F4F6] border border-white/10 hover:border-white/20',
    ghost: 'bg-transparent hover:bg-white/5 text-[#9CA3AF] hover:text-[#F3F4F6]',
    danger: 'bg-red-900/40 hover:bg-red-800/60 text-red-200 border border-red-500/30',
    outline: 'bg-transparent border border-[#FF5500]/50 hover:bg-[#FF5500]/10 text-[#FF5500]'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
