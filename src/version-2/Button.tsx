import React, { type ButtonHTMLAttributes, useRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  typeStyle?: "default" | "primary" | "danger" | "info";
  className?: string;
}

const typeClassMap: Record<string, string> = {
  default:
    "bg-white text-gray-800 border-gray-200 hover:bg-gray-100 active:bg-gray-200 focus:ring-blue-200",
  primary:
    "bg-blue-600 text-white border-blue-700 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-300",
  danger:
    "bg-red-500 text-white border-red-600 hover:bg-red-600 active:bg-red-700 focus:ring-red-200",
  info: "bg-cyan-500 text-white border-cyan-600 hover:bg-cyan-600 active:bg-cyan-700 focus:ring-cyan-200",
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  typeStyle = "default",
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  // Simple ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = btnRef.current;
    if (button) {
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${
        e.clientX - button.getBoundingClientRect().left - radius
      }px`;
      circle.style.top = `${
        e.clientY - button.getBoundingClientRect().top - radius
      }px`;
      circle.className = "ripple";
      button.appendChild(circle);
      setTimeout(() => {
        circle.remove();
      }, 500);
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      ref={btnRef}
      className={`relative overflow-hidden select-none px-4 py-2 rounded border shadow-sm transition-colors duration-150 focus:outline-none ${
        typeClassMap[typeStyle] || typeClassMap.default
      } ${className}`}
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
