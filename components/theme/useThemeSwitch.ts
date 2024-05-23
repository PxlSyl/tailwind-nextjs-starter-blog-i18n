import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export const useThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(false);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setDarkModeChecked(true);
    }
  }, [resolvedTheme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setDarkModeChecked(newTheme === 'dark');
    setMenuOpen(false);
  };

  return {
    mounted,
    theme,
    menuOpen,
    darkModeChecked,
    menubarRef,
    setDarkModeChecked,
    setMenuOpen,
    handleThemeChange
  };
};
