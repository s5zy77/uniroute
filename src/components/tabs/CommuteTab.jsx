import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, CheckCircle2, Lock, MapPin, Navigation, Sparkles } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import HexGrid from "../ui/HexGrid";
import QRCode from "../ui/QRCode";

const rideOptions = [
  {
    id: "toto",
    label: "Shared E-Rickshaw (Toto)",
    subtitle: "14 peers active in this cell. Fare: ₹10",
    icon: MapPin,
  },
  {
    id: "auto",
    label: "Traditional Auto-Rickshaw",
    subtitle: "6 peers active in this cell. Fare: ₹15",
    icon: MapPin,
  },
];

const vehiclePositions = [
  { top: "18%", left: "22%", delay: "0s" },
  { top: "42%", left: "65%", delay: "0.3s" },
  { top: "68%", left: "35%", delay: "0.6s" },
  { top: "28%", left: "76%", delay: "0.8s" },
  { top: "56%", left: "18%", delay: "1.1s" },
];

const overlayStatuses = [
  "Locating your H3 Spatial Hex-Cell perimeter...",
  "Scanning for verified student domains nearby...",
  "Optimizing Fair-Share Ledger splitting matrices...",
];

export default function CommuteTab() {
  const {
    profiles,
    selectedHub,
    setSelectedHub,
    selectedRideType,
    setSelectedRideType,
    matchedHeadcount,
    setMatchedHeadcount,
    triggerRewardHighlight,
    authenticateUser,
    currentUser,
    commuteStep,
    setCommuteStep,
  } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [verifyState, setVerifyState] = useState("idle");
  const [mapPulse, setMapPulse] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(0);

  const mainProfile = useMemo(() => profiles.find((profile) => profile.id === "main"), [profiles]);
  const matchedProfiles = useMemo(
    () => [
      profiles.find((profile) => profile.id === "main"),
      profiles.find((profile) => profile.id === "ranish"),
      profiles.find((profile) => profile.id === "deborah"),
    ].filter(Boolean),
    [profiles]
  );

  const totalFare = 40;
  const perPersonShare = useMemo(() => {
    const share = totalFare / matchedHeadcount;
    return share % 1 === 0 ? `${share}` : share.toFixed(2);
  }, [matchedHeadcount]);

  const validInstitutionEmail = /@[^\s@]+\.(edu|ac\.in)$/i.test(email.trim());

  useEffect(() => {
    if (step === 2) {
      const pulseId = window.setInterval(() => setMapPulse((current) => !current), 1000);
      return () => window.clearInterval(pulseId);
    }
    return undefined;
  }, [step]);

  useEffect(() => {
    if (!showOverlay) {
      setOverlayIndex(0);
      return undefined;
    }

    const statusInterval = window.setInterval(() => {
      setOverlayIndex((current) => Math.min(current + 1, overlayStatuses.length - 1));
    }, 1000);

    const overlayTimeout = window.setTimeout(() => {
      setShowOverlay(false);
      setCommuteStep(3);
    }, 3500);

    return () => {
      window.clearInterval(statusInterval);
      window.clearTimeout(overlayTimeout);
    };
  }, [showOverlay]);

  const handleVerifyInstitution = () => {
    if (verifyState !== "idle" || !validInstitutionEmail) {
      return;
    }

    const profilePayload = {
      name: name.trim() || "Student Rider",
      email: email.trim(),
      institution: institution.trim() || "Amity University, Kolkata",
      age: age.trim(),
      degree: degree.trim() || "BTech Computer Science Engineering",
      specialization: specialization.trim() || "Artificial Intelligence & Data Science",
    };

    setVerifyState("loading");
    window.setTimeout(() => {
      authenticateUser(profilePayload);
      setVerifyState("done");
      window.setTimeout(() => {
        setCommuteStep(2);
      }, 900);
    }, 1500);
  };

  const handleEnterMatchingQueue = () => {
    setShowOverlay(true);
  };

  const handleConfirmRide = () => {
    setCommuteStep(4);
  };

  const handleActivateCoupon = () => {
    triggerRewardHighlight("xerox");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-950 text-slate-100">
      {commuteStep === 1 && (
        <div className="flex h-full flex-col gap-5 overflow-y-auto px-5 py-6">
          <div className="space-y-2">
            <p className="text-2xl font-semibold tracking-[0.18em] text-amber-300">UniRoute</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Student Transit Network</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <div className="mb-5 text-xl font-semibold text-slate-100">Login</div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Full Name</div>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Subhasree Majumder"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Academic Email (.edu / .ac.in)</div>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="student@university.edu"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Institution</div>
                  <input
                    value={institution}
                    onChange={(event) => setInstitution(event.target.value)}
                    placeholder="Amity University, Kolkata"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Age</div>
                  <input
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="21"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Degree</div>
                <input
                  value={degree}
                  onChange={(event) => setDegree(event.target.value)}
                  placeholder="BTech Computer Science Engineering"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Specialization</div>
                <input
                  value={specialization}
                  onChange={(event) => setSpecialization(event.target.value)}
                  placeholder="Artificial Intelligence & Data Science"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-300"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleVerifyInstitution}
              className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-semibold transition ${
                verifyState === "done"
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-amber-300 text-slate-950 hover:bg-amber-200"
              } ${!validInstitutionEmail ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {verifyState === "loading" ? (
                <span className="flex items-center gap-3">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  Validating JWT Architecture...
                </span>
              ) : verifyState === "done" ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-700" /> Institution Verified
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock size={18} className="text-slate-950" /> Verify Institution
                </span>
              )}
            </button>

            <div className="mt-4 text-center text-[10px] text-slate-500">
              Forgot credentials? <span className="text-amber-300">Contact IT Support</span>
            </div>
          </div>
        </div>
      )}

      {commuteStep === 2 && (
        <div className="flex h-full flex-col overflow-hidden">
          <div className="rounded-b-[32px] bg-amber-300 px-5 py-4 text-slate-950">
            <p className="text-sm font-semibold">Welcome, {currentUser?.name || "Student Rider"}</p>
            <p className="mt-1 text-[11px] font-medium text-slate-800/90">Local commuter launch and vehicle discovery</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            <div className="space-y-4 rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Select Pickup Hub
                  <select
                    value={selectedHub}
                    onChange={(event) => setSelectedHub(event.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none"
                  >
                    <option>Salt Lake Sector V Metro Exit</option>
                    <option>Sealdah Station Gate 2</option>
                    <option>Howrah Station Auto Complex</option>
                  </select>
                </label>

                <div className="space-y-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  <div>Destination</div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-200">Amity University Campus Gates</div>
                </div>
              </div>
            </div>

            <div className="relative rounded-[28px] border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-slate-500">
                <span>Live Discovery Map</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-300" /> Active network
                </span>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-slate-950/70 p-3">
                <HexGrid pulse={mapPulse} />
                <div className="pointer-events-none absolute inset-0">
                  {vehiclePositions.map((item, index) => (
                    <div
                      key={index}
                      className="absolute flex items-center justify-center"
                      style={{ top: item.top, left: item.left, animationDelay: item.delay }}
                    >
                      <span className="absolute inline-flex h-10 w-10 animate-vehicle-float rounded-full bg-amber-400/20" />
                      <MapPin size={22} className="relative text-amber-300 drop-shadow-[0_0_20px_rgba(212,172,13,0.45)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-slate-100">Choose a ride</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {rideOptions.map((option) => {
                  const active = selectedRideType === option.label;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedRideType(option.label)}
                      className={`flex min-w-[160px] flex-col gap-3 rounded-3xl border px-4 py-4 text-left transition ${
                        active
                          ? "border-amber-400 bg-amber-400/10 text-amber-100"
                          : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <option.icon size={18} className="text-amber-300" />
                        {option.label}
                      </div>
                      <p className="text-xs leading-5 text-slate-400">{option.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnterMatchingQueue}
              className="mx-auto mb-5 mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-amber-300 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Enter Matching Queue
            </button>
          </div>
        </div>
      )}

      {commuteStep === 3 && (
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex items-center gap-3 rounded-b-[32px] bg-amber-300 px-5 py-4 text-slate-950">
            <CheckCircle2 size={20} />
            <div>
              <p className="text-sm font-semibold">Match Found! Heading to Campus</p>
              <p className="text-[11px] text-slate-800">Profiles matched for an e-rickshaw pool</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            <div className="space-y-4">
              {matchedProfiles.map((profile, index) => (
                <div
                  key={profile.id}
                  className="animate-fade-in rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-sm"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-sm font-semibold text-amber-300">
                      {profile.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-100">
                        <span>{profile.name}</span>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                          Verified
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">{profile.degree}</p>
                      <p className="mt-2 text-sm text-slate-300">{profile.specialization}</p>
                    </div>
                    <BadgeCheck size={18} className="text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
              <div className="mb-4 text-sm font-semibold text-slate-100">Fair-Share Ledger</div>
              <div className="space-y-3 rounded-3xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Total Driver Fare</span>
                  <span className="font-semibold text-slate-100">₹40</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Your Split</span>
                  <span className="font-semibold text-amber-300">₹{perPersonShare}</span>
                </div>
                <div className="pt-2 text-xs text-slate-500">
                  Locked via platform CRUD schema
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-500">Passenger headcount</label>
                <select
                  value={matchedHeadcount}
                  onChange={(event) => setMatchedHeadcount(Number(event.target.value))}
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
                >
                  <option value={2}>2 riders</option>
                  <option value={3}>3 riders</option>
                  <option value={4}>4 riders</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmRide}
              className="mt-3 w-full rounded-3xl bg-amber-300 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              <Navigation size={18} className="inline-block" /> Confirm Ride &amp; Arrive
            </button>
          </div>
        </div>
      )}

      {commuteStep === 4 && (
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex items-center gap-4 rounded-b-[32px] border-b border-slate-800 bg-slate-900 px-5 py-4 text-slate-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-900 text-emerald-300">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Arrived Safely — Verified by Driver</p>
              <p className="mt-1 text-[11px] text-emerald-300">Campus arrival confirmed</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            <div className="rounded-[32px] bg-slate-100 p-5 text-slate-950 shadow-sm">
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">QR Code Ticket — Driver Verification Receipt</p>
              <div className="mx-auto max-w-[240px] rounded-3xl bg-white p-4 shadow-inner">
                <QRCode />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500">Scan to verify ride completion</p>
            </div>

            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-5 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Commuter Perk Activated</p>
              <div className="mt-3 flex items-center gap-3 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-3 text-amber-200">
                <Sparkles size={18} />
                <div className="text-sm font-semibold">10% Off at Campus Xerox/Canteen</div>
              </div>
              <p className="mt-4 text-sm text-slate-300">Commuter Perk Activated: Claim 10% Off at Campus Xerox/Canteen</p>
              <button
                type="button"
                onClick={handleActivateCoupon}
                className="mt-5 w-full rounded-3xl border border-amber-300/70 bg-amber-300/10 px-5 py-4 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/20"
              >
                View Rewards
              </button>
            </div>
          </div>
        </div>
      )}

      {showOverlay && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/95 p-6">
          <div className="relative flex w-full max-w-md flex-col items-center gap-6 rounded-[32px] border border-amber-300/30 bg-slate-900/95 p-6 text-center shadow-2xl">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-amber-300/30 bg-slate-950/80">
              <span className="absolute inset-0 animate-radar-pulse rounded-full bg-amber-300/10" />
              <span className="absolute inset-0 rounded-full border border-amber-300/30" />
              <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-300 text-slate-950">H3</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">{overlayStatuses[overlayIndex]}</div>
            <div className="text-[11px] text-slate-500">Matching nearby students and verifying academic transit credentials.</div>
          </div>
        </div>
      )}
    </div>
  );
}
