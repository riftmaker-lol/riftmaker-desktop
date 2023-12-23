import TournamentForm from "@/components/molecules/tournament-form";
import { useStore } from "@/lib/store";

const Home = () => {
  const { user } = useStore();

  return (
    <div className="flex flex-col my-auto text-center gap-8">
      <h1 className="font-lol text-3xl font-bold">Welcome Summoner !</h1>
      <div className="space-y-2">
        {!user && <p className="text-xl">Please connect to your riftmaker account to get started.</p>}
        {user && (
          <div className="flex flex-col gap-4">
            <p>You are connected as {user.riotId}</p>
            <p>
              And you currently are: <b>{user.elo}</b> <i>({user.role} main)</i>
            </p>
          </div>
        )}
      </div>
      <hr className="border-white/25 my-8" />
      <TournamentForm />
    </div>
  );
};

export default Home;
