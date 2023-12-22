import Layout from "./components/layout/main";
import { Button } from "./components/ui/button";
import { invoke } from "@tauri-apps/api/tauri";

const App = () => {
  const getSummoner = async () => {
    const result = await invoke("test");
    console.log(result);
  };

  const getCustoms = async () => {
    const result = await invoke("get_customs");
    console.log(result);
  };

  const inviteSummoner = async () => {
    console.log("inviting summoner");
    const result = await invoke("invite_summoner", {
      summonerName: "Chekinban",
      summonerId: "3039464855881472",
    });

    console.log(result);
  };

  return (
    <Layout>
      <div className="bg-background font-sans antialiased min-h-screen flex items-center flex-col relative overflow-hidden">
        <Button onClick={getSummoner}>Get Summoner</Button>
        <Button onClick={getCustoms}>Get Customs</Button>
        <Button onClick={inviteSummoner}>Invite Summoner</Button>
      </div>
    </Layout>
  );
};

export default App;
