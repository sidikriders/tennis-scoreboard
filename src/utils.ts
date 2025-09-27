import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
  type QueryParamConfig,
} from "use-query-params";

export const defaultQueryParams = (obj: {
  version?: number;
  page?: string;
  event_slug?: string;
  match?: number;
  match_set?: number;
  match_set_game?: number;
}) => ({
  version: undefined,
  page: undefined,
  event_slug: undefined,
  match: undefined,
  match_set: undefined,
  match_set_game: undefined,
  ...obj,
});

// Restrict allowed page values
export type PageParam =
  | "home"
  | "event"
  | "match"
  | "match_set"
  | "set_game"
  | "create_event"
  | "manage_players";

const pages = [
  "home",
  "event",
  "match",
  "match_set",
  "set_game",
  "create_event",
  "manage_players",
] as string[];

const CustomPageParam: QueryParamConfig<PageParam, string> = {
  encode: (value: PageParam | undefined) => {
    // Only encode if the value is one of the allowed strings
    if (typeof value === "string" && pages.includes(value)) {
      return value;
    }
    return undefined; // Do not update the URL with an invalid value
  },
  decode: (value: string | (string | null)[] | null | undefined) => {
    if (typeof value === "string" && pages.includes(value)) {
      return value;
    }
    return "home"; // Treat invalid values from the URL as "home"
  },
};

export function useAppQueryParams() {
  return useQueryParams({
    version: withDefault(NumberParam, 2),
    page: withDefault(CustomPageParam, "home"), // type hint for allowed values
    event_slug: withDefault(StringParam, ""),
    match: withDefault(NumberParam, -1),
    match_set: withDefault(NumberParam, -1),
    match_set_game: withDefault(NumberParam, -1),
  });
}
