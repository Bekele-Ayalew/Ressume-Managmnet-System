import React, { createContext, useState } from "react";

interface IThemeContextDarkModeInterface {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContextDarkModeInterface>({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface IThemeContextDarkModeInterfaceProps {
  children: React.ReactNode;
}

const ThemeContextProvider = ({
  children,
}: IThemeContextDarkModeInterfaceProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
