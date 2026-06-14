import { useEffect, useState } from "react";
import { ShieldCheck, TrendingUp, Users, Wallet, Zap, Leaf } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

function StatBlock({ icon: Icon, label, value, sub, colorClass }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-100">
        <Icon size={18} className={colorClass} />
        <span>{label}</span>
      </div>
      <div className="mt-4 text-2xl font-semibold text-slate-100">{value}</div>
      {sub && <p className="mt-2 text-sm text-slate-500">{sub}</p>}
    </div>
  );
}

export default function ProfileTab() {
  const { currentUser, stats, updateCurrentUserProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(currentUser);

  useEffect(() => {
    setDraft(currentUser);
  }, [currentUser]);

  const handleSave = () => {
    updateCurrentUserProfile(draft);
    setIsEditing(false);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 px-5 py-5">
        <p className="text-xl font-semibold text-slate-100">Profile</p>
        <p className="mt-1 text-sm text-slate-500">Student identity vault & commuter analytics</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-amber-300 bg-slate-950 text-2xl font-semibold text-amber-300">
                {currentUser?.initials}
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-100">{currentUser?.name}</p>
                <p className="mt-1 text-sm text-slate-400">{currentUser?.institution}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing((current) => !current)}
              className="rounded-2xl border border-amber-300 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/20"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {isEditing ? (
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Full Name</span>
                  <input
                    value={draft?.name || ""}
                    onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Institution</span>
                  <input
                    value={draft?.institution || ""}
                    onChange={(event) => setDraft({ ...draft, institution: event.target.value })}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Age</span>
                  <input
                    value={draft?.age || ""}
                    onChange={(event) => setDraft({ ...draft, age: event.target.value })}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Email</span>
                  <input
                    value={draft?.email || ""}
                    disabled
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-400 outline-none"
                  />
                </label>
              </div>
              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Degree</span>
                <input
                  value={draft?.degree || ""}
                  onChange={(event) => setDraft({ ...draft, degree: event.target.value })}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </label>
              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Specialization</span>
                <input
                  value={draft?.specialization || ""}
                  onChange={(event) => setDraft({ ...draft, specialization: event.target.value })}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </label>
              <button
                type="button"
                onClick={handleSave}
                className="mt-4 rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
              >
                Save Profile
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4 border-t border-slate-800 pt-5 text-sm text-slate-300">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Degree</p>
                  <p className="mt-2 text-sm text-slate-100">{currentUser?.degree}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Specialization</p>
                  <p className="mt-2 text-sm text-slate-100">{currentUser?.specialization}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-amber-300 bg-amber-300/10 p-4 text-sm text-amber-300">
                <ShieldCheck size={18} />
                <p>{currentUser?.statusBadge}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Commuter Wallet & Analytics</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatBlock icon={Zap} label="Wallet Balance" value={`${stats.walletBalance}`} sub="Commute Gems" colorClass="text-amber-300" />
            <StatBlock icon={Users} label="Rides Pooled" value={`${stats.ridesPooled}`} sub="Successful Commutes" colorClass="text-sky-300" />
            <StatBlock icon={Wallet} label="Cash Saved" value={stats.cashSaved} sub="Aggregated savings" colorClass="text-emerald-300" />
            <StatBlock icon={Leaf} label="Carbon Offset" value={stats.carbonOffset} sub="CO2 reduced" colorClass="text-lime-300" />
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            <TrendingUp size={16} />
            Recent Activity
          </div>
          <div className="mt-4 space-y-3">
            {stats.recentRoutes.map((route, index) => (
              <div key={route.route} className={`flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 p-4 ${index < stats.recentRoutes.length - 1 ? "" : ""}`}>
                <div>
                  <p className="font-semibold text-slate-100">{route.route}</p>
                  <p className="mt-1 text-sm text-slate-500">{route.time}</p>
                </div>
                <p className="font-semibold text-amber-300">{route.fare}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
