import { ThemeProvider } from "@/providers/theme-provider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
};

export default Layout;
