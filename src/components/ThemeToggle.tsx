"use client";

import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { TbBrandGoogleHome } from "react-icons/tb";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiMinusSmall } from "react-icons/hi2";
import { ReactNode } from "react";
import { useData } from "@/context/DataContext";

interface TooltipButtonProps {
  children: ReactNode;
  tooltip: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  ariaLabel: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  children,
  tooltip,
  onClick,
  href,
  external = false,
  ariaLabel,
}) => {
  const buttonClass =
    "relative group hover:scale-125 transition-transform duration-300";

  const tooltipElement = (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border border-gray-700 dark:border-gray-300">
      {tooltip}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900 dark:border-t-gray-100" />
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={buttonClass}
        onClick={onClick}
      >
        {children}
        {tooltipElement}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonClass}
      type="button"
    >
      {children}
      {tooltipElement}
    </button>
  );
};

const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { info } = useData(); // from your DataContext

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed z-50 bottom-0 pb-10 w-full flex justify-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="px-4 py-3 rounded-full flex z-30 items-center gap-0 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 shadow-md"
        aria-label="Theme and social toggle bar"
      >
        {/* Home Button */}
        <TooltipButton tooltip="Home" href="/" ariaLabel="Home">
          <TbBrandGoogleHome size={24} />
        </TooltipButton>

        <HiMinusSmall size={30} className="rotate-90" />

        {/* Social Buttons */}
        <div className="flex gap-4 items-center">
          <TooltipButton
            tooltip="GitHub"
            href={info?.githubId || "https://github.com"}
            ariaLabel="GitHub"
            external
          >
            <FaGithub size={24} />
          </TooltipButton>

          <TooltipButton
            tooltip="X (Twitter)"
            href={info?.xId || "https://x.com"}
            ariaLabel="X (Twitter)"
            external
          >
            <FaXTwitter size={24} />
          </TooltipButton>

          <TooltipButton
            tooltip="LinkedIn"
            href={info?.linkedinId || "https://linkedin.com"}
            ariaLabel="LinkedIn"
            external
          >
            <FaLinkedinIn size={24} />
          </TooltipButton>
        </div>

        <HiMinusSmall size={30} className="rotate-90" />

        {/* Theme Toggle */}
        <TooltipButton
          tooltip={resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
          onClick={toggleTheme}
          ariaLabel={
            resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {resolvedTheme === "dark" ? (
            <FiSun size={24} />
          ) : (
            <FiMoon size={24} />
          )}
        </TooltipButton>
      </motion.div>
    </div>
  );
};

export default ThemeToggle;
