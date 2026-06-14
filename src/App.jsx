import { AppProvider, useAppContext } from "./context/AppContext";
import CommuteTab from "./components/tabs/CommuteTab";
import ProfileTab from "./components/tabs/ProfileTab";
import RewardsTab from "./components/tabs/RewardsTab";
import BottomNav from "./components/ui/BottomNav";

function MainShell() {
  const { activeTab, isAuthenticated } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-[420px] min-h-[calc(100vh-2rem)] overflow-hidden rounded-[44px] border border-slate-800 bg-[#121212] shadow-[0_0_0_6px_rgba(15,23,42,0.85),0_32px_64px_rgba(0,0,0,0.65)] sm:min-h-[720px]">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-hidden">
            {activeTab === "commute" && <CommuteTab />}
            {isAuthenticated && activeTab === "rewards" && <RewardsTab />}
            {isAuthenticated && activeTab === "profile" && <ProfileTab />}
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}
