import { ThemeSwitcher as KiboThemeSwitcher } from "@repo/ui/components/kibo-ui/theme-switcher";
import { useTheme } from "./context";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <KiboThemeSwitcher
      value={theme}
      className="w-min"
      onChange={(theme) => setTheme(theme)}
    />
  );
}
