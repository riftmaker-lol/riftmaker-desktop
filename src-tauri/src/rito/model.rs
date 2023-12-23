// Rito API model
use serde_derive::Deserialize;
use serde_derive::Serialize;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SummonerInfo {
    pub account_id: i64,
    pub display_name: String,
    pub game_name: String,
    pub internal_name: String,
    pub name_change_flag: bool,
    pub percent_complete_for_next_level: i64,
    pub privacy: String,
    pub profile_icon_id: i64,
    pub puuid: String,
    pub reroll_points: RerollPoints,
    pub summoner_id: i64,
    pub summoner_level: i64,
    pub tag_line: String,
    pub unnamed: bool,
    pub xp_since_last_level: i64,
    pub xp_until_next_level: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RerollPoints {
    pub current_points: i64,
    pub max_rolls: i64,
    pub number_of_rolls: i64,
    pub points_cost_to_roll: i64,
    pub points_to_reroll: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CustomLobby {
    pub filled_player_slots: i64,
    pub filled_spectator_slots: i64,
    pub game_type: String,
    pub has_password: bool,
    pub id: i64,
    pub lobby_name: String,
    pub map_id: i64,
    pub max_player_slots: i64,
    pub max_spectator_slots: i64,
    pub party_id: String,
    pub passback_url: String,
    pub spectator_policy: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lobby {
    pub can_start_activity: bool,
    pub game_config: GameConfig,
    pub invitations: Vec<Invitation>,
    pub local_member: LocalMember,
    pub members: Vec<Member>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameConfig {
    pub allowable_premade_sizes: Vec<i64>,
    pub custom_lobby_name: String,
    pub custom_mutator_name: String,
    pub custom_rewards_disabled_reasons: Vec<String>,
    pub custom_spectator_policy: String,
    pub custom_spectators: Vec<CustomSpectator>,
    pub custom_team100: Vec<CustomTeam100>,
    pub custom_team200: Vec<CustomTeam200>,
    pub game_mode: String,
    pub is_custom: bool,
    pub is_lobby_full: bool,
    pub is_team_builder_managed: bool,
    pub map_id: i64,
    pub max_human_players: i64,
    pub max_lobby_size: i64,
    pub max_team_size: i64,
    pub pick_type: String,
    pub premade_size_allowed: bool,
    pub queue_id: i64,
    pub show_position_selector: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CustomSpectator {
    pub first_position_preference: String,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub puuid: String,
    pub ready: bool,
    pub second_position_preference: String,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CustomTeam100 {
    pub first_position_preference: String,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub puuid: String,
    pub ready: bool,
    pub second_position_preference: String,
    pub show_ghosted_banner: bool,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CustomTeam200 {
    pub first_position_preference: String,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub puuid: String,
    pub ready: bool,
    pub second_position_preference: String,
    pub show_ghosted_banner: bool,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Invitation {
    pub invitation_id: String,
    pub invitation_type: String,
    pub state: String,
    pub timestamp: String,
    pub to_summoner_id: i64,
    pub to_summoner_name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalMember {
    pub first_position_preference: String,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub puuid: String,
    pub ready: bool,
    pub second_position_preference: String,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Member {
    pub first_position_preference: String,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub puuid: String,
    pub ready: bool,
    pub second_position_preference: String,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Restriction {
    pub expired_timestamp: i64,
    pub restriction_args: RestrictionArgs,
    pub restriction_code: String,
    pub summoner_ids: Vec<i64>,
    pub summoner_ids_string: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RestrictionArgs {
    pub additional_prop1: String,
    pub additional_prop2: String,
    pub additional_prop3: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Warning {
    pub expired_timestamp: i64,
    pub restriction_args: RestrictionArgs2,
    pub restriction_code: String,
    pub summoner_ids: Vec<i64>,
    pub summoner_ids_string: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RestrictionArgs2 {
    pub additional_prop1: String,
    pub additional_prop2: String,
    pub additional_prop3: String,
}
