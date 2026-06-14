import { Gift, Printer, Coffee, Star, TicketCheck } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function RewardsTab() {
  const { perks, redeemPerk, highlightedRewardId, couponFlash } = useAppContext();

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 px-5 py-5">
        <p className="text-xl font-semibold text-slate-100">Rewards</p>
        <p className="mt-1 text-sm text-slate-500">Hyper-local student perks near campus</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {perks.map((perk) => {
          const active = couponFlash && highlightedRewardId === perk.id;
          return (
            <div
              key={perk.id}
              className={`rounded-[26px] border p-5 shadow-sm transition ${
                active
                  ? "border-amber-300/80 ring-2 ring-amber-300/30"
                  : perk.claimed
                  ? "border-slate-700"
                  : "border-slate-800"
              } bg-slate-900`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${perk.ringClass} ${perk.bgClass}`}>
                  {perk.iconType === "printer" ? <Printer size={18} className="text-amber-300" /> : <Coffee size={18} className="text-sky-300" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold text-slate-100">{perk.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{perk.subtitle}</p>
                  <p className="mt-3 text-xs text-slate-500">via {perk.partner}</p>
                </div>
              </div>

              <div className="mt-5">
                {perk.claimed ? (
                  <div className="flex items-center gap-3 rounded-3xl border border-emerald-500/20 bg-slate-950/80 px-4 py-4">
                    <TicketCheck size={18} className="text-emerald-400" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Redeemed</p>
                      <p className="mt-1 text-sm font-semibold text-slate-100">Token Code: {perk.code}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => redeemPerk(perk.id)}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-amber-300 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                  >
                    <Gift size={16} /> Claim Coupon
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className="rounded-[26px] border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500">
            <Star size={16} />
            <span className="uppercase tracking-[0.24em]">More Perks Coming Soon</span>
          </div>
          <p className="mt-4 leading-6">
            Complete 10 pool commutes to unlock premium campus merchant deals.
          </p>
        </div>
      </div>
    </div>
  );
}
