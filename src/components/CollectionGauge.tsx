import { Lightbulb, AlertTriangle } from "lucide-react";

interface CollectionGaugeProps {
  goodCount: number;
  badCount: number;
  totalLocations: number;
}

export function CollectionGauge({ goodCount, badCount, totalLocations }: CollectionGaugeProps) {
  const goodPercentage = (goodCount / totalLocations) * 100;
  const badPercentage = (badCount / totalLocations) * 100;

  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
      <p className="text-xs text-center text-muted-foreground mb-2 font-medium">🔍 탐색 지수</p>
      
      <div className="space-y-2">
        {/* 이로움 수집함 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 w-16">
            <Lightbulb className="w-4 h-4 text-mint" />
            <span className="text-xs text-mint font-bold">이로움</span>
          </div>
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-mint to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${goodPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-mint w-8 text-right">{goodCount}/{totalLocations}</span>
        </div>

        {/* 해로움 수집함 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 w-16">
            <AlertTriangle className="w-4 h-4 text-coral" />
            <span className="text-xs text-coral font-bold">해로움</span>
          </div>
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-coral to-orange-400 transition-all duration-500 ease-out"
              style={{ width: `${badPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-coral w-8 text-right">{badCount}/{totalLocations}</span>
        </div>
      </div>
    </div>
  );
}
