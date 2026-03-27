import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AdminPage } from "./pages/AdminPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { BlogListPage } from "./pages/BlogListPage";
import { LandingPage } from "./pages/LandingPage";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogListPage,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$postId",
  component: BlogDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  blogRoute,
  blogDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
