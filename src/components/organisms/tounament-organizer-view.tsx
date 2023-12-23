import { useCommand } from "@/hooks/useTauri";
import { useStore } from "@/lib/store";
import { Tournament } from "@/types/riftmaker";
import { toast } from "sonner";

interface TournamentOrganizerViewProps {
  tournament: Tournament;
}

const TournamentOrganizerView = ({ tournament }: TournamentOrganizerViewProps) => {
  const { connected, setConnected } = useStore();
  const { isLoading } = useCommand<boolean>({
    command: "check_client",
    refetchInterval: 5_000,
    enabled: !connected,
    onSuccess: (res) => setConnected(res),
    onError: () => toast.error("Error while checking client connection"),
  });

  console.log(isLoading, connected);

  return (
    <div className="mt-4 h-full flex flex-col">
      <div className="flex gap-2 flex-col flex-grow">
        <p>Number of participants: {tournament.participants?.length}</p>
        <p>Number of teams: {tournament.teams?.length}</p>
        <p>
          Current stage: <b>Coming soon..</b>
        </p>
        <p>
          League client: <b>{isLoading ? "Checking..." : connected ? "Opened" : "Closed"}</b>
        </p>

        {!connected && <p className="text-yellow-600">Please launch your client league.</p>}
      </div>
    </div>
  );
};

export default TournamentOrganizerView;
