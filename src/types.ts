export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string | null;
};

export type AllLeaguesResponse = { leagues: League[] };

export type Season = { strSeason: string; strBadge?: string | null };
export type AllSeasonsResponse = { seasons: Season[] | null };
