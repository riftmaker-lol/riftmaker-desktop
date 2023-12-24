import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCommand } from "@/hooks/useTauri";
import { sortByRole } from "@/lib/draft";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Tournament } from "@/types/riftmaker";
import { Lobby } from "@/types/rito";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useSummonerProfile from "@/hooks/useSummonerProfile";

interface TournamentOrganizerViewProps {
  tournament: Tournament;
}

const InviteParticipants = ({ tournament }: TournamentOrganizerViewProps) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const inviteSummoners = () => {
    // TODO: Code freeze until we find a way to trigger invites from the client
  };

  const onTeamClick = (teamId: string) => {
    // Add to selected teams if not already selected and ensure only 2 teams are selected
    if (!selectedTeams.includes(teamId) && selectedTeams.length < 2) {
      setSelectedTeams([...selectedTeams, teamId]);
    }
    // Remove from selected teams if already selected
    else if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    }
  };

  const Teams = tournament.teams?.map((team) => {
    return (
      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      <div
        className={cn("flex flex-col gap-4 border p-2 ease-in-out duration-150 cursor-pointer", {
          "border-accent": selectedTeams.includes(team.id),
          "border-transparent": !selectedTeams.includes(team.id),
        })}
        key={team.id}
        onClick={() => onTeamClick(team.id)}
      >
        <h2 className="text-lg font-bold">Team {team.name}:</h2>
        <div className="grid grid-cols-5 gap-4">
          {team.players
            .sort((a, b) => sortByRole(a, b))
            .map((player) => (
              <div key={player.id} className="flex flex-col gap-1 ">
                {/* Add an online indicator to see if the players are ready */}
                <span className="text-sm text-gray-500">{player.role}</span>
                <span
                  className={cn("text-sm flex gap-2", {
                    "text-red-400": player.role !== player.mainRole,
                  })}
                >
                  {player.riotId}
                </span>
                <span className="text-sm text-gray-500">{player.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  });

  return (
    <Drawer>
      <DrawerTrigger>Invite Teams to Lobby</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Team invites:</DrawerTitle>
          <DrawerDescription>Select the 2 teams you would like to invite to the lobby:</DrawerDescription>
          <div className="flex gap-4 mt-4 flex-col">{Teams}</div>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex gap-4 justify-center">
            <Button>Invite Summoners</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const TournamentOrganizerView = ({ tournament }: TournamentOrganizerViewProps) => {
  const { connected, setConnected, lobby, setLobby } = useStore();

  const { isLoading } = useCommand<boolean>({
    command: "check_client",
    refetchInterval: 5_000,
    enabled: !connected,
    onSuccess: (res) => setConnected(res),
    onError: () => toast.error("Error while checking client connection"),
  });

  const { isLoading: isLoadingLobby } = useCommand<Lobby>({
    command: "current_lobby",
    refetchInterval: 5_000,
    enabled: connected && !lobby,
    onSuccess: (res) => setLobby(res),
    onError: () => toast.error("Error while checking client connection"),
  });

  useSummonerProfile();

  return (
    <div className="mt-4 h-full flex flex-col flex-grow">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex gap-2 flex-col flex-grow">
          <p>Number of participants: {tournament.participants?.length}</p>
          <p>Number of teams: {tournament.teams?.length}</p>
          <p>
            Current stage: <b>Coming soon..</b>
          </p>
          <p>
            League client: <b>{isLoading ? "Checking..." : connected ? "Opened" : "Closed"}</b>
          </p>
          <p>
            Custom Lobby: <b>{isLoadingLobby ? "Checking..." : lobby ? "In Lobby" : "No created."}</b>
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center text-center">
          {!connected && <p className="text-yellow-600">Please launch your client league.</p>}
          {connected && !lobby && (
            <p className="text-yellow-600">Please create a custom lobby to invite the participants.</p>
          )}
          {connected && !!lobby && (
            <>
              <p className="text-green-600">You can invite the participants to the custom lobby.</p>
              <InviteParticipants tournament={tournament} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentOrganizerView;
