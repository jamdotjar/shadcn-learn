import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 rounded-md bg-gray-200 dark:bg-gray-800">
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
