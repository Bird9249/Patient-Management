import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "outline" | "ghost" | "soft" | "white" | "link";
  size?: "small" | "default" | "large";
  isLoading?: boolean;
  disabled?: boolean;
  onClick$?: PropFunction<() => void>;
  block?: boolean;
};

export const Button = component$((props: ButtonProps) => {
  const {
    type = "button",
    variant = "solid",
    size = "default",
    isLoading = false,
    disabled = false,
    onClick$,
    block,
  } = props;

  const baseClasses = `inline-flex items-center gap-x-2 text-sm font-medium rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${block ? "w-full justify-center" : ""}`;

  const variants = {
    solid:
      "bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700",
    outline:
      "border border-gray-200 text-gray-500 hover:border-primary-600 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600",
    ghost:
      "text-primary-600 hover:bg-primary-100 hover:text-primary-800 focus:bg-primary-100 focus:text-primary-800",
    soft: "bg-primary-100 text-primary-800 hover:bg-primary-200 focus:bg-primary-200",
    white:
      "border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50",
    link: "text-primary-600 hover:text-primary-800 focus:text-primary-800",
  };

  const sizes = {
    small: "py-2 px-3",
    default: "py-3 px-4",
    large: "p-4 sm:p-5",
  };

  const loaderColors = {
    solid: "border-white",
    outline: "border-primary-600",
    ghost: "border-primary-600",
    soft: "border-primary-800",
    white: "border-gray-800",
    link: "border-primary-600",
  };

  const loadingSpinner = (
    <span
      class={`inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent ${loaderColors[variant]}`}
      role="status"
      aria-label="loading"
    >
      <span class="sr-only">Loading...</span>
    </span>
  );

  return (
    <button
      type={type}
      class={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || isLoading}
      onClick$={onClick$}
    >
      {isLoading ? loadingSpinner : <Slot />}
    </button>
  );
});
