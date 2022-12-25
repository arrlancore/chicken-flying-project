import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProjectRoadmap from "./project-roadmap";
import localStorageService from "./project-roadmap/store/user/localStorageService";
import { setAsLoggedIn } from "./project-roadmap/store/user/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/v1" replace={true} />,
  },
  {
    path: "/v1",
    element: <ProjectRoadmap />,
  },
  {
    path: "*",
    element: (
      <h2 className=" block text-3xl font-bold text-center text-cyan-700">
        404 Notfound
      </h2>
    ),
  },
]);

export default function Routes() {
  /**
   * check local storage if a user has been logged in
   */
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorageService.getToken();
    if (token) {
      dispatch(setAsLoggedIn(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
}
