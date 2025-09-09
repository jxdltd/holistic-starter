import { useRouter } from "@tanstack/react-router";
import { createContext, type PropsWithChildren, use } from "react";
import { setThemeServerFn } from "./functions";

export type Theme = "light" | "dark" | "system";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme }: Props) {
  const router = useRouter();

  async function setTheme(val: Theme) {
    await setThemeServerFn({ data: val });
    router.invalidate();
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const val = use(ThemeContext);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
