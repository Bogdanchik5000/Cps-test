import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type theme = "light" | "dark";
type ThemeContextType = [theme, setTheme: Dispatch<SetStateAction<theme>>];

export const ThemeContext = createContext<ThemeContextType>(["light", () => {}]);

function ThemeProvider({ children }: { children: ReactNode }) {
  const initialTheme: theme = (localStorage.getItem("theme") as theme) ?? "light";
  const [theme, setTheme] = useState<theme>(initialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
