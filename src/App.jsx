import { useState, useEffect, useMemo, useCallback } from "react";
import { productAreas as initialProductAreas, teamMembers, skillCapacity } from "./data/portfolioData";
import { generateSuggestions, getOverallProgress } from "./utils/suggestionEngine";
import ProductAreaCard from "./components/ProductAreaCard";
import SkillCapacityPanel from "./components/SkillCapacityPanel";
import SuggestionCard from "./components/SuggestionCard";
import PortfolioProgressChart from "./components/PortfolioProgressChart";

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-1">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold ${color ?? "text-gray-800"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default function App() {
  const [productAreas, setProductAreas] = useState(initialProductAreas);
  const [selectedArea, setSelectedArea] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isSimulating, setIsSimulating] = useState(false);

  const suggestions = useMemo(
    () => generateSuggestions(productAreas, teamMembers),
    [productAreas]
  );

  const handleRefresh = useCallback(() => {
    setLastRefreshed(new Date());
  }, []);

  // Simulate real-time data updates (progress ticks for near-complete projects)
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setProductAreas((prev) =>
        prev.map((pa) => ({
          ...pa,
          subProducts: pa.subProducts.map((sp) => ({
            ...sp,
            progress: sp.progress < 100 ? Math.min(100, sp.progress + Math.floor(Math.random() * 3)) : 100,
          })),
        }))
      );
      setLastRefreshed(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const avgProgress = Math.round(
    productAreas.reduce((s, pa) => s + getOverallProgress(pa), 0) / productAreas.length
  );
  const nearComplete = productAreas
    .flatMap((pa) => pa.subProducts)
    .filter((sp) => sp.progress >= 80 && sp.progress < 100).length;
  const earlyStage = productAreas
    .flatMap((pa) => pa.subProducts)
    .filter((sp) => sp.progress <= 20).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">PP</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">PortfolioPilot</h1>
            <p className="text-xs text-gray-400">CPO Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-400 hidden sm:block">
            Last refreshed: {lastRefreshed.toLocaleTimeString()}
          </p>
          <button
            onClick={() => setIsSimulating((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
              isSimulating
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            }`}
          >
            {isSimulating ? "⏹ Stop Simulation" : "▶ Simulate Progress"}
          </button>
          <button
            onClick={handleRefresh}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Product Areas" value={productAreas.length} sub="Active" color="text-indigo-600" />
          <StatCard label="Avg Progress" value={`${avgProgress}%`} sub="Across all areas" color={avgProgress >= 60 ? "text-green-600" : "text-yellow-600"} />
          <StatCard label="Near Complete" value={nearComplete} sub="≥80% done" color="text-green-600" />
          <StatCard label="Early Stage" value={earlyStage} sub="≤20% done" color="text-red-500" />
        </div>

        {/* Chart */}
        <PortfolioProgressChart productAreas={productAreas} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Areas Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">Product Areas &amp; Sub-Products</h2>
              {selectedArea && (
                <button
                  onClick={() => setSelectedArea(null)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Clear selection
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productAreas.map((area) => (
                <ProductAreaCard
                  key={area.id}
                  area={area}
                  isSelected={selectedArea === area.id}
                  onClick={() => setSelectedArea((prev) => (prev === area.id ? null : area.id))}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <SkillCapacityPanel skillCapacity={skillCapacity} teamMembers={teamMembers} />
          </div>
        </div>

        {/* AI Suggestions */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              🤖 Real-Time Resource Suggestions
            </h2>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
              {suggestions.length} suggestion{suggestions.length !== 1 ? "s" : ""}
            </span>
          </div>
          {suggestions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-sm font-semibold text-gray-600">No resource reallocation needed</p>
              <p className="text-xs text-gray-400 mt-1">All projects appear well-balanced at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
