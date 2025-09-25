import HowItWorksSection from './HowItWorksSection';
import { initialMockMarketplaces } from '../data/mockData';

const HomePage = ({ setPage }) => (
    <div>
        <div className="text-center py-20 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
                Discover Marketplaces. <span className="animated-gradient">Vetted for Security.</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-8">
                Your secure gateway to the decentralized economy. Every listing is scanned for phishing and malicious threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 justify-center items-center">
                <button onClick={() => document.getElementById('marketplaces').scrollIntoView({ behavior: 'smooth' })} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                    Explore Markets
                </button>
                <button onClick={() => setPage('listyoursite')} className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-lg transition duration-300 hover:bg-yellow-400 hover:text-gray-900 w-full sm:w-auto">
                    List Your Site
                </button>
            </div>
        </div>
        <div id="marketplaces" className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {initialMockMarketplaces.map(market => (
                    <div key={market.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-shadow duration-300 transform hover:-translate-y-1">
                        <img src={market.imageUrl} alt={market.name} className="w-full h-56 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{market.name}</h3>
                            <p className="text-gray-400 mb-4">{market.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {market.tags.map(tag => (
                                    <span key={tag} className="bg-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                            <a href={market.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-700 hover:bg-gray-600 text-yellow-400 font-bold py-2 px-4 rounded-lg transition duration-300">
                                Visit Site &rarr;
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <HowItWorksSection />

        <div className="text-center mt-16">
             <button onClick={() => setPage('admindashboard')} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors duration-300">
                Admin Dashboard
            </button>
        </div>
    </div>
);

export default HomePage;
