import { cn } from "@/lib/utils";
import { User } from "@/types/riftmaker";

interface PlayerSlotProps {
  player: Partial<User>;
  role: string;
}

const PlayerSlot = ({ player, role }: PlayerSlotProps) => {
  return (
    <div className="flex justify-end flex-col h-full gap-2">
      <span className="text-sm text-gray-500">{role}</span>
      <div className="flex flex-col gap-1 items-center">
        <span className={cn("text-base flex gap-1 font-bold")}>{player.riotId}</span>
        <span className="text-sm text-gray-500">{player.name}</span>
        <span className="text-sm text-gray-500">{player.elo}</span>
      </div>

      <div className="flex items-center flex-col gap-2 relative group cursor-pointer">
        <div className={cn("w-24 h-24 bg-secondary rounded-md flex justify-center items-center border-2")}>
          <img src={player.image} alt={player.name} className={cn("rounded-full")} width={128} height={128} />
        </div>
      </div>
    </div>
  );
};

export default PlayerSlot;
