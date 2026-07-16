import type { Route } from "./+types/home";
import Home from "~/home/ui/pages/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Point Poker" },
    { name: "description", content: "Welcome to Point Poker!" },
  ];
}

export default function HomePage() {
  return <Home />;
}
