import React from "react";
import { useAppQueryParams } from "./utils";

const Breadcrumbs: React.FC = () => {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const match = queryParams.match;
  const set = queryParams.match_set;
  const game = queryParams.match_set_game;

  // Only render if at least one param exists and is a valid number
  if (
    (typeof match !== "number" || match < 0) &&
    (typeof set !== "number" || set < 0) &&
    (typeof game !== "number" || game < 0)
  ) {
    return null;
  }

  return (
    <nav className="mb-4 text-sm text-gray-600 flex gap-2 items-center">
      {typeof match === "number" && match >= 0 && (
        <span
          className="cursor-pointer hover:text-blue-600 hover:underline"
          onClick={() => {
            // Go to match page
            if (set >= 0) {
              setQueryParams({
                page: "match",
                match_set: undefined,
                match_set_game: undefined,
              });
            }
          }}
        >
          Match {match + 1}{" "}
        </span>
      )}
      {typeof set === "number" && set >= 0 && (
        <span
          className="cursor-pointer hover:text-blue-600 hover:underline"
          onClick={() => {
            // Go to set page
            if (game >= 0) {
              setQueryParams({ page: "match_set", match_set_game: undefined });
            }
          }}
        >
          / Set {set + 1}{" "}
        </span>
      )}
      {typeof game === "number" && game >= 0 && (
        <span
          className="cursor-pointer hover:text-blue-600 hover:underline"
          // onClick={() => {
          //   // Go to game page
          // }}
        >
          / Game {game + 1}{" "}
        </span>
      )}
    </nav>
  );
};

export default Breadcrumbs;
