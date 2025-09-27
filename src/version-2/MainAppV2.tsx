import React from "react";
import { useAppQueryParams } from "../utils";
import HomeV2 from "./HomeV2";

const MainAppV2: React.FC = () => {
  const [queryParams] = useAppQueryParams();

  // const handleCreateEvent = () => {
  //   setShowInput(true);
  //   setError("");
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEventName(e.target.value);
  //   setError("");
  // };

  // // Utility to generate slug from event name
  // const generateSlug = (name: string) =>
  //   name
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, "-")
  //     .replace(/(^-|-$)/g, "");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const trimmedName = eventName.trim();
  //   if (!trimmedName) return;
  //   const slug = generateSlug(trimmedName);
  //   if (eventSlugs.some((ev) => ev === slug)) {
  //     setError("Event slug already exists. Please choose a different name.");
  //     return;
  //   }
  //   dispatch(
  //     addEventV2({
  //       slug,
  //       event: {
  //         name: trimmedName,
  //         date: new Date().toISOString().slice(0, 10),
  //         location: "",
  //         players: [],
  //         matches: [],
  //         config: { setsToWin: 2, gamesPerSet: 6, maxPointsInGame: 4 },
  //       },
  //     })
  //   );
  //   setShowInput(false);
  //   setEventName("");
  // };

  if (queryParams.page === "home") {
    return <HomeV2 />;
  }

  return null;
};

export default MainAppV2;
