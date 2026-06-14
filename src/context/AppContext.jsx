import { createContext, useCallback, useContext, useMemo, useState } from "react";

const matchedProfiles = [
  {
    id: "ranish",
    name: "Ranish Dutta",
    institution: "Amity University, Kolkata",
    degree: "BTech Computer Science Engineering",
    specialization: "Cyber Security & Digital Forensics",
    initials: "RD",
    verified: true,
    colorClass: "text-sky-300",
  },
  {
    id: "deborah",
    name: "Deborah Lalawmpuii Bhuyan",
    institution: "Amity University, Kolkata",
    degree: "BTech Computer Science Engineering",
    specialization: "Cloud Computing & DevOps",
    initials: "DB",
    verified: true,
    colorClass: "text-violet-300",
  },
  {
    id: "subham",
    name: "Subham Gupta",
    institution: "Amity University, Kolkata",
    degree: "BTech Computer Science Engineering",
    specialization: "Internet of Things & Automation",
    initials: "SG",
    verified: true,
    colorClass: "text-emerald-300",
  },
  {
    id: "soumyabrata",
    name: "Soumyabrata Saha",
    institution: "Amity University, Kolkata",
    degree: "BTech Computer Science Engineering",
    specialization: "Data Science & Big Data Analytics",
    initials: "SS",
    verified: true,
    colorClass: "text-teal-300",
  },
];

const defaultUserProfile = {
  id: "main",
  name: "",
  email: "",
  institution: "",
  age: "",
  degree: "",
  specialization: "",
  statusBadge: "",
  initials: "",
  verified: false,
  colorClass: "text-amber-300",
};

const initialPerks = [
  {
    id: "xerox",
    iconType: "printer",
    title: "10% OFF",
    subtitle: "Campus Xerox & Digital Print Station",
    partner: "UniPrint Co.",
    claimed: false,
    code: "UNIXEROX26",
    colorClass: "text-amber-300",
    ringClass: "ring-amber-300/40",
    bgClass: "bg-amber-300/10",
  },
  {
    id: "chai",
    iconType: "coffee",
    title: "Complimentary",
    subtitle: "Cutting Chai & Samosa — Block A Canteen",
    partner: "Campus Canteen A",
    claimed: false,
    code: "UNICHAI26",
    colorClass: "text-sky-300",
    ringClass: "ring-sky-300/40",
    bgClass: "bg-sky-300/10",
  },
];

const initialSession = {
  activeTab: "commute",
  commuteStep: 1,
  selectedHub: "Salt Lake Sector V Metro Exit",
  selectedRideType: "Shared E-Rickshaw (Toto)",
  matchedHeadcount: 3,
  highlightedRewardId: null,
  couponFlash: false,
};

const initialStats = {
  walletBalance: 340,
  ridesPooled: 42,
  cashSaved: "₹1,240",
  carbonOffset: "14.2 kg CO2",
  recentRoutes: [
    { route: "Sealdah → Sector V", fare: "₹10", time: "Today 9:45 AM" },
    { route: "Salt Lake → Park Street", fare: "₹12", time: "Yesterday 8:30 AM" },
    { route: "Howrah → Jadavpur", fare: "₹9", time: "2 days ago" },
  ],
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState(initialSession.activeTab);
  const [commuteStep, setCommuteStep] = useState(initialSession.commuteStep);
  const [selectedHub, setSelectedHub] = useState(initialSession.selectedHub);
  const [selectedRideType, setSelectedRideType] = useState(initialSession.selectedRideType);
  const [matchedHeadcount, setMatchedHeadcount] = useState(initialSession.matchedHeadcount);
  const [highlightedRewardId, setHighlightedRewardId] = useState(initialSession.highlightedRewardId);
  const [couponFlash, setCouponFlash] = useState(initialSession.couponFlash);
  const [perks, setPerks] = useState(initialPerks);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(defaultUserProfile);

  const redeemPerk = useCallback((perkId) => {
    setPerks((current) =>
      current.map((perk) =>
        perk.id === perkId ? { ...perk, claimed: true } : perk
      )
    );
  }, []);

  const authenticateUser = useCallback((profile) => {
    const initials = profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => segment[0].toUpperCase())
      .join("");

    const verifiedProfile = {
      ...defaultUserProfile,
      ...profile,
      initials: initials || "ST",
      verified: true,
      statusBadge: "INSTITUTIONAL DOMAIN AUTHENTICATED (.EDU / .AC.IN)",
    };

    setCurrentUser(verifiedProfile);
    setIsAuthenticated(true);
    setActiveTab("commute");
    setCommuteStep(2);
  }, []);

  const updateCurrentUserProfile = useCallback((updates) => {
    setCurrentUser((current) => {
      if (!current) return current;
      const nextProfile = { ...current, ...updates };
      const initials = nextProfile.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((segment) => segment[0].toUpperCase())
        .join("");
      return { ...nextProfile, initials: initials || current.initials };
    });
  }, []);

  const triggerRewardHighlight = useCallback((perkId) => {
    setHighlightedRewardId(perkId);
    setCouponFlash(true);
    setActiveTab("rewards");
    window.setTimeout(() => {
      setCouponFlash(false);
    }, 1600);
  }, []);

  const profiles = useMemo(
    () => (currentUser && isAuthenticated ? [currentUser, ...matchedProfiles] : matchedProfiles),
    [currentUser, isAuthenticated]
  );

  const value = useMemo(
    () => ({
      profiles,
      currentUser,
      isAuthenticated,
      stats: initialStats,
      activeTab,
      setActiveTab,
      commuteStep,
      setCommuteStep,
      selectedHub,
      setSelectedHub,
      selectedRideType,
      setSelectedRideType,
      matchedHeadcount,
      setMatchedHeadcount,
      highlightedRewardId,
      couponFlash,
      triggerRewardHighlight,
      redeemPerk,
      perks,
      authenticateUser,
      updateCurrentUserProfile,
    }),
    [profiles, currentUser, isAuthenticated, activeTab, commuteStep, selectedHub, selectedRideType, matchedHeadcount, highlightedRewardId, couponFlash, perks, redeemPerk, triggerRewardHighlight, authenticateUser, updateCurrentUserProfile]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
