export interface OwnerAward {
    id: number,
    cha_season: string,
    display_name: string,
    city: string,
    nickname: string,
    teamlogo: string,
    teamcolor: string,
    firstname: string,
    lastname: string
}

export interface PlayerAward {
    id: number,
    player_id: number,
    cha_season: string,
    display_name: string,
    city: string,
    nickname: string,
    teamlogo: string,
    teamcolor: string,
    ownerfirst: string,
    ownerlast: string,
    playerfirst: string,
    playerlast: string,
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
    city: string,
    nickname: string,
    teamlogo: string,
    teamcolor: string,
    ownerfirst: string,
    ownerlast: string,
    playerfirst: string,
    playerlast: string,
    nhl_id: string,
    games_played: number,
    wins: number,
    goals_against_avg: string,
    save_pct: string
}