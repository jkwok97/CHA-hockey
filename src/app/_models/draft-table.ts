export interface DraftTable {
    id: number,
    team_id: number,
    round_one: number,
    round_two: number,
    round_three: number,
    round_four: number,
    round_five: number,
    draft_year: string
}

export interface DraftPlayer {
    id: number,
    player_id: number,
    draft_year: string,
    draft_round: number,
    draft_overall: number,
    team_id: number
}