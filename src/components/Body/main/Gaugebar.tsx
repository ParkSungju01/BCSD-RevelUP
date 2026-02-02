type Rank = 
| "IRON"
| "BRONZE"
| "SILVER"
| "GOLD"
| "PLATINUM"
| "DIAMOND"
| "MASTER";

interface GaugeProps {
  current:number;
  total: number;
  rank: Rank;
}
export const RANK_COLOR:Record<Rank,string>={
  IRON: "#6a7282",
  BRONZE: "#B87333",
  SILVER: "#BFC5CC",
  GOLD: "#E6C15A",
  PLATINUM: "#3CB6A0",
  DIAMOND: "#5FA9E6",
  MASTER: "#7A3EB1",
}

export default function GaugeBar({
  current,
  total,
  rank,
}:GaugeProps){
  const percent = Math.min((current/total)*100,100);

  return (
    <div className="w-full max-[426px]:w-90">
      <div className="mb-1 flex justify-end text-xs text-gray-500">
        {current} / {total}권
      </div>

      <div className="relative h-3 w-full rounded-full bg-gray-200">
        <div
          className="relative h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: RANK_COLOR[rank],
          }}
        >
          <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-inherit ring-2 ring-white/80"/>
        </div>
      </div>
    </div>
  );
}