import React from 'react';

const MarketplacesFilters = ({ searchTerm, setSearchTerm, selectedFilter, setSelectedFilter }) => {
    const filters = ['all', 'nfts', 'defi', 'gaming', 'other'];

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center w-full">
            {/* Search Bar */}
            <div className="w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Search marketplaces..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border-2 border-yellow-400 rounded-4xl p-3 text-white placeholder-gray-500 "
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`
                                    px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300
                                ${selectedFilter === filter
                                ? 'bg-yellow-500 text-gray-900 shadow-lg' // Selected state
                                : 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' // Unselected state
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MarketplacesFilters;
