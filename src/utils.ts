import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export function useAppQueryParams() {
  return useQueryParams({
    version: withDefault(NumberParam, 2),
    page: withDefault(StringParam, "home"),
    event_slug: withDefault(StringParam, ""),
    match: withDefault(NumberParam, -1),
    match_set: withDefault(NumberParam, -1),
    match_set_game: withDefault(NumberParam, -1),
  });
}
