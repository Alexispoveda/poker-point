import type { Route } from "./+types/pointing";
import Pointing from "~/pointing/ui/pages/PointingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Point Poker | Pointing" },
    { name: "description", content: "Pointing page of Point Poker." },
  ];
}

export default function PointingPage({ params }: Route.ComponentProps) {
  return <Pointing roomId={params.roomId ?? ""} />;
}
