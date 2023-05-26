import {createBrowserRouter} from "react-router-dom";
import App from "../app";
import PageItem from "../components/page-item";
import PageList from "../components/page-list";
import PageError from "../components/page-error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        index: true,
        element: <PageList />
      },
      {
        path: '/:currentPage',
        index: true,
        element: <PageList />
      },
      {
        path: 'item/:currentItemId',
        element: <PageItem />
      },
      {
        path: 'page404',
        element: <PageError />
      }
    ]
  }
]);