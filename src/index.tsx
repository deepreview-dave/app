import ReactDOM from "react-dom/client";
import "./index.sass";
import PerformanceReviewPage from "./pages/PerformanceReviewPage";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Analytics } from "./business/analytics";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/performance-review",
    element: (
      <>
        <PerformanceReviewPage />
        <ScrollRestoration />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// if you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
Analytics.init(process.env.REACT_APP_MIXPANEL_TOKEN);
Analytics.loaded();
