pub mod model;

use league_client_connector::{LeagueClientConnector, RiotLockFile};
use reqwest::Certificate;
use serde::Deserialize;
use thiserror::Error;

pub struct GameClient {
    client: reqwest::Client,
    lockfile: RiotLockFile,
}

#[cold]
pub fn get_riot_root_certificate() -> Certificate {
    Certificate::from_pem(include_bytes!("riotgames.cer")).unwrap()
}

#[derive(Debug, Error)]
pub enum QueryError {
    #[error("Failed to query the API. Is the game running ? '{}'", _0)]
    Reqwest(#[from] reqwest::Error), // An error of this type may suggests that the API specs as been updated and the crate is out-of-date. Please fill an issue !
}

impl Default for GameClient {
    fn default() -> Self {
        Self::new()
    }
}

impl GameClient {
    pub fn new() -> Self {
        Self {
            client: reqwest::ClientBuilder::new()
                .add_root_certificate(get_riot_root_certificate())
                .build()
                .unwrap(),
            lockfile: LeagueClientConnector::parse_lockfile().unwrap(),
        }
    }

    pub async fn get_data<T: for<'de> Deserialize<'de>>(
        &self,
        endpoint: &str,
    ) -> Result<T, QueryError> {
        let port = self.lockfile.port;
        let password = self.lockfile.password.clone();
        let url = format!(
            "https://127.0.0.1:{port}/{endpoint}",
            port = port,
            endpoint = endpoint
        );

        println!("url: {}", url);
        println!("password: {}", password);

        let data = self
            .client
            .get(url)
            .basic_auth("riot", Some(password))
            .send()
            .await?
            .json::<T>()
            .await?;
        Ok(data)
    }

    pub async fn post_data<T: for<'de> Deserialize<'de>>(
        &self,
        endpoint: &str,
        body: &str,
    ) -> Result<T, QueryError> {
        let port = self.lockfile.port;
        let password = self.lockfile.password.clone();
        let url = format!(
            "https://127.0.0.1:{port}/{endpoint}",
            port = port,
            endpoint = endpoint
        );

        let data = self
            .client
            .post(url)
            .basic_auth("riot", Some(password))
            .body(body.to_string())
            .send()
            .await?
            .json::<T>()
            .await?;

        Ok(data)
    }
}
