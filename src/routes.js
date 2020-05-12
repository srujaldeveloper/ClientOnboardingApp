import wizard from "./wizard";
import Perspectives from "./components/Perspectives";
import Users from "./components/Users";
import Tags from "./components/Tags";
import Goals from "./components/Goals";
import Initiatives from "./components/Initiatives";
import Kpis from "./components/Kpis";
import Overview from "./components/Overview";

export const routes = [
  {
    exact: true,
    path: "/",
    component: wizard
  },
  {
    path: "/users",
    component: Users
  },
  {
    path: "/perspectives",
    component: Perspectives
  },
  {
    path: "/tags",
    component: Tags
  },
  {
    path: "/goals",
    component: Goals
  },
  {
    path: "/initiatives",
    component: Initiatives
  },
  {
    path: "/kpis",
    component: Kpis
  },
  {
    path: "/overview",
    component: Overview
  }
];
