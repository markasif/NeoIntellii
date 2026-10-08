"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends React.HTMLAttributes<HTMLElement> {
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
  "aria-label"?: string;
}

export const primaryButtonClasses = (
  size: "sm" | "md" | "lg" = "md",
  className?: string
) => {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm gap-2",
    lg: "px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base gap-2.5",
  };

  return cn(
    "group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#169DC8] to-[#0D306C] text-white font-semibold tracking-tight shadow-md shadow-[#169DC8]/20 hover:from-[#1389af] hover:to-[#09224f] hover:shadow-[0_8px_25px_-4px_rgba(22,157,200,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] select-none text-center cursor-pointer shrink-0 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
    sizeStyles[size],
    className
  );
};

export const PrimaryButton = forwardRef<HTMLElement, PrimaryButtonProps>(
  (
    {
      to,
      href,
      target,
      rel,
      onClick,
      children,
      icon,
      showIcon = true,
      size = "md",
      className,
      type = "button",
      disabled,
      title,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const destination = href || to;
    const defaultRel = target === "_blank" ? "noopener noreferrer" : undefined;
    const finalRel = rel || defaultRel;
    const classes = primaryButtonClasses(size, className);

    const iconElement =
      icon !== undefined ? (
        icon
      ) : showIcon ? (
        <ArrowRight
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
          aria-hidden="true"
        />
      ) : null;

    const content = (
      <>
        <span>{children}</span>
        {iconElement}
      </>
    );

    if (destination) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={destination}
          target={target}
          rel={finalRel}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={classes}
          title={title}
          aria-label={ariaLabel}
          {...(rest as any)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        className={classes}
        title={title}
        aria-label={ariaLabel}
        {...(rest as any)}
      >
        {content}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
