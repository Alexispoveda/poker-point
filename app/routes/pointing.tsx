import type { Route } from "./+types/pointing";
import Pointing from "~/pointing/ui/pages/PointingPage";
import { normalizeRoomCode } from "~/pointing/model";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Point Poker | Pointing" },
    { name: "description", content: "Pointing page of Point Poker." },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const roomId = normalizeRoomCode(params.roomId ?? "");

  if (!roomId) {
    throw new Response("Room code is required.", { status: 400 });
  }

  return { roomId };
}

export default function PointingPage({ loaderData }: Route.ComponentProps) {
  return <Pointing roomId={loaderData.roomId} />;
}
