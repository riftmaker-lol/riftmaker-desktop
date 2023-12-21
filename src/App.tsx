import Layout from "./components/layout/main";
import { Button } from "./components/ui/button";
import { invoke } from "@tauri-apps/api/tauri";

const App = () => {
  const triggerApi = async () => {
    console.log("TriggerAPI...");
    const result = await invoke("test");

    console.log(result);
  };

  return (
    <Layout>
      <div className="bg-background font-sans antialiased min-h-screen flex items-center flex-col relative overflow-hidden">
        <Button onClick={triggerApi}>Test API!</Button>
      </div>
    </Layout>
  );
};

export default App;
