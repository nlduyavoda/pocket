import { EventDetail } from "@features/PaymentEvents/EventDetail";
import { Events } from "@features/PaymentEvents/Events";
import { PocketTable } from "@features/PocketTable";
import { createBrowserRouter } from "react-router-dom";
import { END_POINTS } from "./Endpoint";
import { MetronicPage } from "@features/Metronic/metronic";
import { TransactionDetail } from "@features/TransactionDetail";
export const routers = createBrowserRouter([
  // {
  //   path: END_POINTS.HOME,
  //   element: <PocketTable />,
  //   errorElement: <>Error</>,
  // },
  {
    path: END_POINTS.HOME,
    element: <MetronicPage />,
    errorElement: <>Error</>,
  },
  {
    path: END_POINTS.TRANSACTION,
    element: <MetronicPage />,
    errorElement: <>Error</>,
  },
  {
    path: END_POINTS.EVENTS,
    element: <Events />,
    errorElement: <>Error</>,
  },
  {
    path: END_POINTS.EVENTS_DETAIL,
    element: <EventDetail />,
    errorElement: <>Error</>,
  },
]);
