import React from "react";
import { useAppQueryParams } from "../utils";
import HomeV2 from "./HomeV2";
import CreateEventV2 from "./CreateEventV2";
import EventV2 from "./EventV2";

const MainAppV2: React.FC = () => {
  const [queryParams] = useAppQueryParams();

  if (queryParams.page === "home") {
    return <HomeV2 />;
  }

  if (queryParams.page === "create_event") {
    return <CreateEventV2 />;
  }

  if (queryParams.page === "event") {
    return <EventV2 />;
  }

  return null;
};

export default MainAppV2;
