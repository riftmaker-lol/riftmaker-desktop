import { Tournament } from "@/types/riftmaker";

interface TournamentParticipantViewProps {
  tournament: Tournament;
}

const TournamentParticipantView = ({ tournament }: TournamentParticipantViewProps) => {
  return (
    <div>
      <h1>TournamentParticipantView</h1>
    </div>
  );
};

export default TournamentParticipantView;
