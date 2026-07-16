import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("pointing/:roomId", "routes/pointing.tsx"),
] satisfies RouteConfig;
