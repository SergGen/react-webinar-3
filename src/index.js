import {createRoot} from 'react-dom/client';
import Store from "./store";
import {StoreContext} from "./store/context";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import Loading from "./components/Loading";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} fallbackElement={<Loading />}/>
  </StoreContext.Provider>
);
