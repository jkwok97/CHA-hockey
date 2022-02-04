export interface OwnerAward {
    id: number,
    cha_season: string,
    display_name: string,
    diplay_season: string,
    city: string,
    nickname: string,
    teamlogo: string,
    teamcolor: string,
    ownerFirst: string,
    ownerLast: string
}

export interface PlayerAward {
    id: number,
    player_id: number,
    cha_season: string,
    display_name: string,
    diplay_season: string,
    city: string,
    nickname: string,
    teamlogo: string,
    teamcolor: string,
    ownerFirst: string,
    ownerLast: string,
    playerFirst: string,
    playerLast: string,
    nhl_id: string,
    games_played: number,
    goals: number,
    assists: number,
    points: number
}

export interface GoalieAward {
    id: number,
    player_id: number,
    cha_season: string,
    display_name: string,
    diplay_season: string,
    city: string,
    nickname: string,
    teamlogo: string,
    teamcolor: string,
    ownerFirst: string,
    ownerLast: string,
    playerFirst: string,
    playerLast: string,
    nhl_id: string,
    games_played: number,
    wins: number,
    goals_against_avg: string,
    save_pct: string
}