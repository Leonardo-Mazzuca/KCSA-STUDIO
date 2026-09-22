import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "@/App";

/**
 * Rotas geradas a partir das pastas do projeto.
 * A pasta `demo/` publica o site em `/demo`.
 * Para uma nova apresentação, adicione um item aqui.
 */
export const folderRoutes = [
  {
    folder: "demo",
    path: "/demo",
    title: "KCSA STUDIO",
  },
] as const;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/demo" replace />,
  },
  ...folderRoutes.map((route) => ({
    path: route.path,
    element: <App />,
  })),
  {
    path: "*",
    element: <Navigate to="/demo" replace />,
  },
]);
