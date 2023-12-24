import TournamentStatus from "@/components/molecules/tournament-status";
import TournamentOrganizerView from "@/components/organisms/tounament-organizer-view";
import TournamentParticipantView from "@/components/organisms/tounament-participant-view";
import api from "@/lib/axios";
import { useStore } from "@/lib/store";
import { Tournament } from "@/types/riftmaker";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const TournamentDetails = () => {
  const { tournamentId } = useParams();
  const { user } = useStore();

  const { data: tournament, refetch } = useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: async () => {
      const res = await api.get<Tournament>(`/tournament/${tournamentId}`);
      return res.data;
    },
  });

  if (!tournament) return null;

  const isOwner = tournament.createdById === user?.id;

  return (
    <div className="flex flex-col justify-start w-full container h-full mt-4 flex-grow">
      <div className="flex flex-row gap-4 items-center my-4">
        <h1 className="font-lol text-3xl font-bold">Tournament: {tournament.name}</h1>
        <TournamentStatus status={tournament.status} size="sm" />
      </div>
      {!isOwner ? (
        <TournamentOrganizerView tournament={tournament} />
      ) : (
        <TournamentParticipantView tournament={tournament} refetch={refetch} />
      )}
    </div>
  );
};

export default TournamentDetails;
