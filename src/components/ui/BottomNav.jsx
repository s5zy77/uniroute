import { Award, Navigation, ShieldCheck } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const navItems = [
  { id: "commute", label: "Commute", icon: Navigation },
  { id: "rewards", label: "Rewards", icon: Award },
  { id: "profile", label: "Profile", icon: ShieldCheck },
];

export default function BottomNav() {
  const { activeTab, setActiveTab, isAuthenticated } = useAppContext();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[420px]">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          const disabled = !isAuthenticated && id !== "commute";
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                if (!disabled) setActiveTab(id);
              }}
              disabled={disabled}
              className={`flex flex-1 flex-col items-center justify-center gap-1 px-2 py-3 text-[10px] font-semibold transition ${
                disabled
                  ? "cursor-not-allowed opacity-40"
                  : active
                  ? "border-t-2 border-amber-400 text-amber-300"
                  : "border-t-2 border-transparent text-slate-500"
              }`}
            >
              <Icon size={18} className={active ? "text-amber-300" : "text-slate-500"} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
