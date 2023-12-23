import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/main";
import Home from "./pages/home";
import TournamentDetails from "./pages/tournament/[tournamentId]";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tournament/:tournamentId",
          element: <TournamentDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
