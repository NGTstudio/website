import { CEvoCard, PoolCard, XEvoCard } from "@/app/(authenticated)/profile/liquidity/cards";
import { Separator } from "@/components/ui/separator";

const LiquidityPage = async () => {
  return (
    <main className="flex flex-col h-full space-y-6">
      <div>
        <h3 className="text-lg font-medium">Liquidity</h3>
        <p className="text-sm text-muted-foreground !mt-0">
          Manage your liquidity pools, banked EVO, and locked EVO.
        </p>
      </div>
      <Separator />
      <div className="flex flex-wrap gap-4 items-stretch justify-center w-full pb-6">
        <PoolCard />
        <XEvoCard />
        <CEvoCard />
      </div>
    </main>

  );
};

export default LiquidityPage;