import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export const tennisScore = [0, 15, 30, 40, "Adv", "Win"];
// Tennis scoring logic (simplified, not handling deuce/adv/win fully)
export const getScore = (points: number, other: number) => {
  if (points < 4) return tennisScore[points];
  if (points === other) return 40;
  if (points === other + 1) return "Adv";
  if (points > other + 1) return "Win";
  return tennisScore[3];
};

export function useAppQueryParams() {
  return useQueryParams({
    page: withDefault(StringParam, "home"),
    event_slug: withDefault(StringParam, ""),
    match: withDefault(NumberParam, -1),
    match_set: withDefault(NumberParam, -1),
    match_set_game: withDefault(NumberParam, -1),
  });
}
