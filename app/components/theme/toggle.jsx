import React from 'react'
import { ThemeSwitcher } from '.';
import { cookies } from 'next/headers';

const ThemeToggle = () => {

  const Theme = {
    dark: 'dark',
    light: 'light'
  }

  const theme = cookies().get("occTheme")?.value === "dark" ? Theme.dark : Theme.light;

  return (
    <ThemeSwitcher theme={theme} />
  )
}

export default ThemeToggle;