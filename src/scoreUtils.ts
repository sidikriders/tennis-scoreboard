import type { MatchSet, TennisMatch } from "./store/eventSlice";

export const tennisScore = [0, 15, 30, 40, "Adv", "Win"];
// Tennis scoring logic (simplified, not handling deuce/adv/win fully)
export const getScore = (points: number, other: number, maxPoint?: number) => {
  if (points < 4) return tennisScore[points];
  if (points === other) {
    if (
      typeof maxPoint === "number" &&
      maxPoint > 0 &&
      points === maxPoint - 1
    ) {
      return "Sudden";
    }

    return 40;
  }
  if (points === other + 1) return "Adv";
  if (points > other + 1) return "Win";
  return tennisScore[3];
};

// export const getTeamScoreOnGame: (tennisGame: Game) => {
//   team1Score: number;
//   team2Score: number;
// } = (tennisGame) => {
//   const team1Score = tennisGame.filter((point) => point === "team_1").length;
//   const team2Score = tennisGame.filter((point) => point === "team_2").length;
//   return { team1Score, team2Score };
// };

export const getTeamScoreOnSet = (matchSet: MatchSet) => {
  const totalGameResult = matchSet.reduce(
    (obj, game) => {
      const totalPerTeam = game.reduce(
        (gameObj, game) => {
          if (game === "team_1") {
            return { ...gameObj, team_1: gameObj.team_1 + 1 };
          } else {
            return { ...gameObj, team_2: gameObj.team_2 + 1 };
          }
        },
        { team_1: 0, team_2: 0 }
      );

      if (totalPerTeam.team_1 > totalPerTeam.team_2) {
        return { ...obj, team1Score: obj.team1Score + 1 };
      } else if (totalPerTeam.team_2 > totalPerTeam.team_1) {
        return { ...obj, team2Score: obj.team2Score + 1 };
      }

      return obj;
    },
    { team1Score: 0, team2Score: 0 }
  );
  return totalGameResult;
};

export const getTeamsScoreOnMatch: (tennisMatch: TennisMatch) => {
  team1Score: number;
  team2Score: number;
} = (tennisMatch) => {
  const totalSetResult = tennisMatch.sets.reduce(
    (obj, set) => {
      const setResult = getTeamScoreOnSet(set);
      if (setResult.team1Score > setResult.team2Score) {
        return {
          team1Score: obj.team1Score + 1,
          team2Score: obj.team2Score,
        };
      } else if (setResult.team2Score > setResult.team1Score) {
        return {
          team1Score: obj.team1Score,
          team2Score: obj.team2Score + 1,
        };
      }
      return obj;
    },
    { team1Score: 0, team2Score: 0 }
  );

  return totalSetResult;
};
