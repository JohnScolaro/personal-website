"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "red";
  href?: string;
}

export default function StyledButton({
  color = "blue",
  href,
  onClick, // Accept onClick as a prop
  ...props
}: StyledButtonProps) {
  const router = useRouter();

  // Define base styles for the button
  const baseClasses =
    "focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";

  // Conditional classes for different colors and disabled states
  const colorClasses =
    color === "red"
      ? "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:bg-red-300"
      : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-300";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // If onClick is provided, call it
    if (onClick) {
      onClick(event);
    }
    // Only navigate if href is provided and event not prevented
    if (!event.defaultPrevented && href) {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${colorClasses}`}
      onClick={handleClick}
      {...props}
    />
  );
}
