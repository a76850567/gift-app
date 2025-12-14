/**
 * Router
 * Centralized routing component
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import type { Route as RouteType } from "../types";

type RouterProps = {
  routes: RouteType[];
  layout?: React.ComponentType<{ children: React.ReactNode }>;
};

export function Router({ routes, layout: Layout }: RouterProps) {
  const content = (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );

  if (Layout) {
    return <Layout>{content}</Layout>;
  }

  return content;
}
