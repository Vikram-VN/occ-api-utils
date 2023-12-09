"use client";
import { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export const Theme = {
  dark: "dark",
  light: "light",
};

export const ThemeSwitcher = ({ theme }) => {
  const [_theme, setTheme] = useState(theme);

  const toggleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle(Theme.dark);
    if (root.classList.contains(Theme.dark)) {
      setTheme(Theme.dark);
      document.cookie = `occTheme=${Theme.dark}`;
    } else {
      setTheme(Theme.light);
      document.cookie = `occTheme=${Theme.light}`;
    }
  };

  return (
    <button onClick={toggleTheme}>
      {_theme == Theme.dark ? (
        <SunIcon
          className="h-12 w-12 text-yellow-300 cursor-pointer dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800 rounded-lg mr-2 p-2"
          title="White theme"
        />
      ) : (
        <MoonIcon
          className="h-12 w-12 text-slate-600 cursor-pointer font-medium rounded-lg hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 focus:outline-none mr-2 p-2"
          title="Dark theme"
        />
      )}
    </button>
  );
};
