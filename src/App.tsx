import { useMemo, useState } from 'react';
import { productAreas, teamMembers } from './data/mockData';
import { generateSuggestions } from './utils/suggestions';
import ProductAreaCard from './components/ProductAreaCard';
import SkillCapacityPanel from './components/SkillCapacityPanel';
import SuggestionPanel from './components/SuggestionPanel';

export default function App() {
  const [lastUpdated] = useState(() => new Date().toLocaleTimeString());

  const suggestions = useMemo(
    () => generateSuggestions(productAreas, teamMembers),
    []
  );

  const totalSubProducts = productAreas.reduce((s, a) => s + a.subProducts.length, 0);
  const avgPortfolioProgress = Math.round(
    productAreas.reduce(
      (s, a) => s + a.subProducts.reduce((ss, sp) => ss + sp.progress, 0) / a.subProducts.length,
      0
    ) / productAreas.length
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧭</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PortfolioPilot</h1>
              <p className="text-xs text-gray-500">CPO Resource Allocation Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>🕐 Updated: {lastUpdated}</span>
            <span className="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs">
              {avgPortfolioProgress}% Portfolio Progress
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Product Areas', value: productAreas.length, icon: '🗂️' },
            { label: 'Sub-Products', value: totalSubProducts, icon: '📦' },
            { label: 'Team Members', value: teamMembers.length, icon: '👥' },
            { label: 'Suggestions', value: suggestions.length, icon: '💡' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Areas Grid */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Product Areas & Sub-Product Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productAreas.map((area) => (
              <ProductAreaCard key={area.id} area={area} />
            ))}
          </div>
        </section>

        {/* Bottom section: Capacity + Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SkillCapacityPanel areas={productAreas} members={teamMembers} />
          <SuggestionPanel suggestions={suggestions} />
        </div>
      </main>
    </div>
  );
}
