import useSummonerProfile from "@/hooks/useSummonerProfile";
import { useCommand } from "@/hooks/useTauri";
import { sortByRole } from "@/lib/draft";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Tournament } from "@/types/riftmaker";
import { Lobby } from "@/types/rito";
import { toast } from "sonner";
import PlayerSlot from "../molecules/player-slot";
import { Button } from "../ui/button";

interface TournamentParticipantViewProps {
  tournament: Tournament;
  refetch: () => void;
}

const TournamentParticipantView = ({ tournament, refetch }: TournamentParticipantViewProps) => {
  const { connected, setConnected, lobby, setLobby, user } = useStore();

  const team = tournament.teams?.find((team) => team.players?.find((summoner) => summoner.id === user?.id));

  const { isLoading } = useCommand<boolean>({
    command: "check_client",
    refetchInterval: 5_000,
    enabled: !connected,
    onSuccess: (res) => {
      setConnected(res);
      // Ping riftmaker that the user is ready
    },
    onError: () => toast.error("Error while checking client connection"),
  });

  const { isLoading: isLoadingLobby } = useCommand<Lobby>({
    command: "current_lobby",
    refetchInterval: 5_000,
    enabled: connected,
    onSuccess: (res) => setLobby(res),
    onError: () => toast.error("Error while checking client connection"),
  });

  useSummonerProfile();

  return (
    <div className="mt-4 h-full flex flex-col flex-grow">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex gap-2 flex-col">
          <p>
            League client: <b>{isLoading ? "Checking..." : connected ? "Opened" : "Closed"}</b>
          </p>
          <p>
            In Lobby: <b>{isLoadingLobby ? "Checking..." : lobby ? "In Lobby" : "No created."}</b>
          </p>
        </div>

        {!team && (
          <div className="flex flex-col gap-2 justify-center text-center">
            <p className="text-blue-600">
              You've successfully joined the tournament, but you will only participate when you're drafted into a team.
            </p>
            <Button variant={"link"} onClick={() => refetch()}>
              Check again
            </Button>
          </div>
        )}

        {team && (
          <div className="flex flex-col gap-2 justify-center text-center">
            <div className="flex flex-col gap-4 flex-grow justify-center items-center mb-8">
              <h2 className="font-lol text-3xl font-bold my-4">Your team: {team.name}</h2>
              <div className={cn("grid grid-cols-5 gap-2")}>
                {team.players
                  .sort((a, b) => sortByRole(a, b))
                  .map((player) => (
                    <PlayerSlot key={player.id} player={player} role={player.role} />
                  ))}
              </div>
            </div>

            {!connected && <p className="text-yellow-600">Please start your client, so you can receive the invite</p>}
            {connected && !lobby && (
              <p className="text-yellow-600">Waiting for organizer to create game lobby and invite you.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentParticipantView;
