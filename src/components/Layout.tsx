import { Outlet } from "react-router-dom";
import { BreakingTicker } from "./news/BreakingTicker";
import { Header } from "./news/Header";
import { Footer } from "./news/Footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BreakingTicker />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
