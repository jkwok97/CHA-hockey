export interface PlayerStat {
    id: number,
    player_id: number,
    team_name: string,
    position: string,
    games_played: number,
    goals: number,
    assists: number,
    points: number,
    plus_minus: number,
    penalty_minutes: number,
    pp_goals: number,
    sh_goals: number,
    gw_goals: number,
    gt_goals: number,
    shots: number,
    shooting_pct: string,
    minutes_played: number,
    minutes_per_game: string,
    fo_won: number,
    fo_lost: number,
    fo_tied: number,
    fo_pct: string,
    pass_complete: number,
    pass_incomplete: number,
    pass_attempts: number,
    pass_pct: string,
    corner_won: number,
    corner_lost: number,
    corner_total: number,
    corner_pct: string,
    fights_won: number,
    fights_lost: number,
    fights_tied: number,
    fights_total: number,
    fights_pct: string,
    hits: number,
    hit_per_game: string,
    blocked_shots: number,
    blocked_shot_per_game: string,
    current_points_streak: number,
    longest_points_streak: number,
    penalty_minor: number,
    penalty_minor_coincidental: number,
    penalty_major: number,
    penalty_fighting_major: number,
    penalty_match: number,
    penalty_misconduct: number,
    penalty_game_misconduct: number,
    penalty_gross_misconduct: number,
    playing_year: string,
    season_type: string,
    player_status: string
}

export interface GoalieStat {
    id: number,
    player_id: number,
    team_name: string,
    games_played: number,
    minutes_played: number,
    goals_against_avg: string,
    wins: number,
    loss: number,
    ties: number,
    en_goals: number,
    shutouts: number,
    goals_against: number,
    saves: number,
    shots_for: number,
    save_pct: string,
    goals: number,
    assists: number,
    points: number,
    penalty_minutes: number,
    pass_complete: number,
    pass_incomplete: number,
    pass_attempts: number,
    pass_pct: string,
    penalty_minor: number,
    penalty_minor_coincidental: number,
    penalty_major: number,
    penalty_fighting_major: number,
    penalty_match: number,
    penalty_misconduct: number,
    penalty_game_misconduct: number,
    penalty_gross_misconduct: number,
    playing_year: string,
    season_type: string,
    player_status: string
}