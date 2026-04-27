import { ReactNode, MouseEventHandler } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>; // Agregamos la definición del click
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div 
      onClick={onClick} // Pasamos el click al div real
      className={`rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
}