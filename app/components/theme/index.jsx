'use client'
import { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export const Theme = {
    dark: 'dark',
    light: 'light'
}

export const ThemeSwitcher = ({ theme }) => {
    const [_theme, setTheme] = useState(theme)

    const toggleTheme = () => {
        const root = document.getElementsByTagName('html')[0];
        root.classList.toggle(Theme.dark)
        if (root.classList.contains(Theme.dark)) {
            setTheme(Theme.dark)
            document.cookie = `occTheme=${Theme.dark}`
        } else {
            setTheme(Theme.light)
            document.cookie = `occTheme=${Theme.light}`
        }
    }

    return (
        <button onClick={toggleTheme}>
            {_theme == Theme.dark ? (
                <SunIcon className='h-10 w-10 text-yellow-500' />
            ) : (
                <MoonIcon className='h-10 w-10' />
            )}
        </button>
    )
}