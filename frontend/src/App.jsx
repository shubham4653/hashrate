import { useState, useEffect, useCallback } from 'react';

// --- MOCK DATA ---
// This data would come from a backend API in a real app
const initialMockMarketplaces = [
    { id: 1, name: 'OpenSea', description: 'The world\'s first and largest web3 marketplace for NFTs and crypto collectibles.', url: 'https://opensea.io', tags: ['NFTs', 'Art', 'Gaming'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=OpenSea' },
    { id: 2, name: 'Uniswap', description: 'A decentralized finance protocol that is used to exchange cryptocurrencies.', url: 'https://uniswap.org', tags: ['DeFi', 'Exchange', 'Tokens'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Uniswap' },
    { id: 3, name: 'Axie Marketplace', description: 'The official marketplace for Axie Infinity, a digital pet universe.', url: 'https://app.axieinfinity.com/marketplace/', tags: ['Gaming', 'NFTs', 'Collectibles'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Axie+Infinity' },
    { id: 4, name: 'Magic Eden', description: 'The leading NFT marketplace on Solana. Home to the next generation of digital creators.', url: 'https://magiceden.io/', tags: ['NFTs', 'Solana', 'Gaming'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Magic+Eden' }
];

const initialMockReportedSites = [
    { id: 1, url: 'http://suspicious-site.com', threat: 'Phishing', date: '2023-10-26' },
    { id: 2, url: 'http://malware-distributor.net', threat: 'Malware', date: '2023-10-25' }
];

const initialMockReportedWallets = [
    { id: 1, address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', associatedWith: 'http://suspicious-site.com', date: '2023-10-26' },
    { id: 2, address: '0x5a2A997578509a4A875F2d5A1A3E2E6B4A8D9C4c', associatedWith: 'Scam Airdrop', date: '2023-10-24' }
];


// --- COMPONENTS ---

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3c4.21 0 7.9-2.404 9.618-5.984a11.955 11.955 0 00-2.022-10.96z" />
    </svg>
);

const Navbar = ({ account, setPage, connectWallet }) => (
    <nav className="bg-gray-800/30 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
                <ShieldIcon />
                <h1 className="text-2xl font-bold text-yellow-400">HASH Market</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-300">
                {['Home', 'List Your Site', 'Scan URL', 'Report a Site', 'Reported Sites'].map(item => (
                    <a key={item} href="#" className="hover:text-yellow-400 transition duration-300" onClick={() => setPage(item.toLowerCase().replace(/ /g, ''))}>
                        {item}
                    </a>
                ))}
            </div>
            {account ? (
                <div className="bg-gray-800 text-sm font-mono p-2 rounded-md border border-gray-700">
                    {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                </div>
            ) : (
                <button onClick={connectWallet} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                    Connect Wallet
                </button>
            )}
        </div>
    </nav>
);

const HowItWorksSection = () => {
    const attributes = [
        "having_IP_Address", "URL_Length", "Shortening_Service", "having_At_Symbol",
        "double_slash_redirecting", "Prefix_Suffix", "having_Sub_Domain", "SSLfinal_State",
        "Domain_registeration_length", "Favicon", "HTTPS_token", "Request_URL",
        "URL_of_Anchor", "Links_in_tags", "SFH", "Submitting_to_email", "Abnormal_URL",
        "Redirect", "on_mouseover", "RightClick", "popUpWidnow", "Iframe", "age_of_domain",
    ];

    return (
        <div className="py-24 bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Our 5-Step Security Protocol</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                        We employ a comprehensive, automated system to ensure platform integrity and user safety at every step.
                    </p>
                </div>

                <div className="space-y-20">
                    {/* Step 1: AI Scan */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <span className="text-yellow-400 font-bold">Step 1</span>
                            <h3 className="text-3xl font-bold text-white mb-4">AI-Powered Initial Scan</h3>
                            <p className="text-gray-400">A machine learning model automatically scans all listed websites to proactively detect and flag potential phishing threats by analyzing over 32 unique attributes.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg relative h-64 md:h-72 lg:h-80 overflow-hidden">
                            <div className="font-mono text-xs text-yellow-400/50 attribute-scroll">
                                {attributes.map((attr, i) => <p key={i}>{attr}: {Math.round(Math.random())}</p>)}
                                {attributes.map((attr, i) => <p key={i+attributes.length}>{attr}: {Math.round(Math.random())}</p>)}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ai-graphic-text text-white font-bold text-lg">Scanning...</div>
                        </div>
                    </div>

                    {/* Step 2: On-Chain Reporting */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                         <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center order-2 md:order-1">
                             <div className="on-chain-graphic">
                                 <div className="report-icon">⚠️</div>
                                 <div className="dots"></div>
                                 <div className="smart-contract-icon">📜<span className="text-xs">MarketplaceThreatIntel.sol</span></div>
                             </div>
                        </div>
                        <div className="text-left order-1 md:order-2">
                             <span className="text-yellow-400 font-bold">Step 2</span>
                            <h3 className="text-3xl font-bold text-white mb-4">On-Chain Threat Reporting</h3>
                            <p className="text-gray-400">When a site is flagged, the system records a privacy-preserving hash of the site, the lister's wallet address, and a timestamp onto the <code className="text-yellow-400 bg-gray-700 p-1 rounded text-sm">MarketplaceThreatIntel.sol</code> smart contract.</p>
                        </div>
                    </div>

                    {/* Step 3: Blacklist */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                             <span className="text-yellow-400 font-bold">Step 3</span>
                            <h3 className="text-3xl font-bold text-white mb-4">Decentralized Blacklist</h3>
                            <p className="text-gray-400">The marketplace periodically reads the immutable data from the smart contract to build and maintain an up-to-date blacklist of confirmed malicious wallets.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center">
                            <div className="blacklist-graphic">
                                <div className="blacklist-item">0x123...abc <span className="banned-mark">❌</span></div>
                                <div className="blacklist-item">0x456...def <span className="banned-mark">❌</span></div>
                                <div className="blacklist-item">0x789...ghi <span className="banned-mark">❌</span></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 4: Enforcement */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center order-2 md:order-1">
                            <div className="enforcement-graphic">
                                <span className="wallet-icon">💳</span>
                                <div className="ban-hammer">🚫</div>
                            </div>
                        </div>
                        <div className="text-left order-1 md:order-2">
                            <span className="text-yellow-400 font-bold">Step 4</span>
                            <h3 className="text-3xl font-bold text-white mb-4">Automatic Enforcement</h3>
                            <p className="text-gray-400">Any wallet address appearing on the blacklist is automatically banned from the platform, preventing it from making transactions or creating new listings.</p>
                        </div>
                    </div>

                     {/* Step 5: Transparency */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <span className="text-yellow-400 font-bold">Step 5</span>
                            <h3 className="text-3xl font-bold text-white mb-4">Public Transparency & Auditing</h3>
                            <p className="text-gray-400">Using the blockchain ensures all reports are public and tamper-proof, providing complete transparency and allowing anyone to easily audit security actions.</p>
                        </div>
                         <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center">
                            <div className="audit-graphic">
                               <div className="blockchain-graphic">
                                   {[...Array(3)].map((_, i) => (
                                        <div key={i} className="block">
                                            <span className="block-text">LOG</span>
                                            <div className="block-hash">{`0x${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}...`}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="magnifying-glass">🔍</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const HomePage = ({ setPage }) => (
    <div>
        <div className="text-center py-20 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
                Discover Marketplaces. <span className="animated-gradient">Vetted for Security.</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-8">
                Your secure gateway to the decentralized economy. Every listing is scanned for phishing and malicious threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4">
                <button onClick={() => document.getElementById('marketplaces').scrollIntoView({ behavior: 'smooth' })} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                    Explore Markets
                </button>
                <button onClick={() => setPage('listyoursite')} className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-lg transition duration-300 hover:bg-yellow-400 hover:text-gray-900 w-full sm:w-auto">
                    List Your Site
                </button>
            </div>
        </div>
        <div id="marketplaces" className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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

const ListYourSitePage = ({ account }) => {
    const [formData, setFormData] = useState({
        url: '',
        name: '',
        tags: '',
        category: 'nfts',
        image: null,
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({ ...prev, image: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!account) {
            setStatus({ type: 'error', message: 'Please connect your wallet first.' });
            return;
        }
        setStatus({ type: 'loading', message: 'Submitting for verification...' });
        console.log("Submitting:", formData);
        
        setTimeout(() => {
            if (formData.url.includes('phishing')) {
                setStatus({ type: 'error', message: 'Verification failed. This URL is flagged as suspicious.' });
            } else {
                setStatus({ type: 'success', message: 'Site submitted! It will be listed after a successful review.' });
                setFormData({ url: '', name: '', tags: '', category: 'nfts', image: null });
            }
        }, 2000);
    };

    return (
        <div className="container mx-auto max-w-2xl py-20 px-4">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">List Your Marketplace</h2>
            <p className="text-gray-400 mb-8 text-center">Submit your site for verification. Our backend will perform an automated security scan.</p>
            {account ? (
                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">Marketplace URL</label>
                        <input type="url" name="url" id="url" value={formData.url} onChange={handleChange} placeholder="https://your-marketplace.com" required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    </div>
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Marketplace Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="My Awesome Market" required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <option value="nfts">NFTs</option>
                            <option value="defi">DeFi</option>
                            <option value="gaming">Gaming</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                        <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} placeholder="art, collectibles, finance" required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Logo / Banner Image</label>
                        <input type="file" name="image" id="image" onChange={handleChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-500" />
                    </div>
                    
                    <button type="submit" disabled={!formData.url || (status && status.type === 'loading')} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {status && status.type === 'loading' ? 'Verifying...' : 'Submit for Verification'}
                    </button>
                    {status && (
                        <p className={`mt-4 text-sm text-center ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {status.message}
                        </p>
                    )}
                </form>
            ) : (
                <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg text-center">
                    Please connect your wallet to list a site.
                </div>
            )}
        </div>
    );
};

const ScanUrlPage = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            if (!url) {
                setResult({ type: 'error', message: 'Please enter a URL.' });
            } else if (url.includes('phishing') || url.includes('badsite')) {
                setResult({ type: 'warning', message: 'Potential Threat Detected!', details: 'This domain is on a known blacklist.' });
            } else {
                setResult({ type: 'safe', message: 'Looks Safe!', details: 'No immediate threats found for this URL.' });
            }
            setIsLoading(false);
        }, 1500);
    };

    const ResultCard = () => {
        if (!result) return null;
        const baseClasses = "p-6 mt-8 rounded-xl text-left";
        const safeClasses = "bg-green-900/50 border border-green-500";
        const warningClasses = "bg-red-900/50 border border-red-500";
        const errorClasses = "bg-yellow-900/50 border border-yellow-500";

        switch (result.type) {
            case 'safe': return <div className={`${baseClasses} ${safeClasses}`}><h3 className="font-bold text-green-300 text-xl">{result.message}</h3><p className="text-green-400">{result.details}</p></div>;
            case 'warning': return <div className={`${baseClasses} ${warningClasses}`}><h3 className="font-bold text-red-300 text-xl">{result.message}</h3><p className="text-red-400">{result.details}</p></div>;
            case 'error': return <div className={`${baseClasses} ${errorClasses}`}><h3 className="font-bold text-yellow-300 text-xl">{result.message}</h3></div>;
            default: return null;
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-20 px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Check URL for Threats</h2>
            <p className="text-gray-400 mb-8">Our scanner will check the URL against known phishing and malware databases.</p>
            <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4">
                <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-grow bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button type="submit" disabled={isLoading} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50">
                    {isLoading ? 'Scanning...' : 'Scan Now'}
                </button>
            </form>
            {isLoading && <div className="mt-8">Analyzing URL...</div>}
            <ResultCard />
        </div>
    );
};

const ReportSitePage = ({ onReportSite }) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url) {
            setStatus({ type: 'error', message: 'Please enter a URL to report.' });
            return;
        }
        const newReport = {
            id: Date.now(),
            url,
            threat: 'User Reported',
            date: new Date().toISOString().split('T')[0],
        };
        onReportSite(newReport);
        setStatus({ type: 'success', message: 'Thank you for your report. It has been submitted for review.' });
        setUrl('');
    };
    
    return (
        <div className="container mx-auto max-w-2xl py-20 px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Report a Suspicious Site</h2>
            <p className="text-gray-400 mb-8">Help keep the community safe by reporting potentially malicious websites.</p>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://suspicious-site.com"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6"
                />
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                    Submit Report
                </button>
                {status && (
                    <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
};

const ReportedSitesPage = ({ reportedSites }) => (
    <div className="container mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-10">Community Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Reported Websites</h3>
                <div className="bg-gray-800 rounded-xl shadow-lg p-2">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-4">URL</th><th className="p-4">Threat</th><th className="p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedSites.map(site => (
                                <tr key={site.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                                    <td className="p-4 font-mono text-sm break-all">{site.url}</td>
                                    <td className="p-4"><span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">{site.threat}</span></td>
                                    <td className="p-4 text-gray-400">{site.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Flagged Wallets</h3>
                <div className="bg-gray-800 rounded-xl shadow-lg p-2">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-4">Address</th><th className="p-4">Associated With</th><th className="p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialMockReportedWallets.map(wallet => (
                                <tr key={wallet.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                                    <td className="p-4 font-mono text-sm">{`${wallet.address.substring(0, 10)}...`}</td>
                                    <td className="p-4 text-sm text-gray-400 break-all">{wallet.associatedWith}</td>
                                    <td className="p-4 text-gray-400">{wallet.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="text-center mt-12 bg-gray-800/50 border border-gray-700 text-gray-400 p-4 rounded-lg max-w-3xl mx-auto">
            This list is generated from community reports and automated scans. Always do your own research.
        </div>
    </div>
);

const AdminDashboardPage = ({ reportedSites, onDismissReport }) => {
    const handleVerify = (url) => {
        console.log(`Verifying ${url} - This would trigger a backend check.`);
        alert(`Verification process for ${url} initiated.`);
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Admin Dashboard</h2>
            <div className="bg-gray-800 rounded-xl shadow-lg p-4">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Pending Site Reports</h3>
                {reportedSites.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No pending reports.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-4">URL</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedSites.map(site => (
                                <tr key={site.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                                    <td className="p-4 font-mono text-sm break-all">{site.url}</td>
                                    <td className="p-4 text-gray-400">{site.date}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleVerify(site.url)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors">Verify</button>
                                        <button onClick={() => onDismissReport(site.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors">Dismiss</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};


const Footer = () => (
    <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto text-center py-6 text-gray-500">
            <p>&copy; {new Date().getFullYear()} HASH Market. All Rights Reserved.</p>
            <p>A Secure Gateway to Decentralized Commerce.</p>
        </div>
    </footer>
);


export default function App() {
    const [account, setAccount] = useState(null);
    const [page, setPage] = useState('home');
    const [reportedSites, setReportedSites] = useState(initialMockReportedSites);

    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setPage('listyoursite');
                }
            } catch (error) {
                console.error("User rejected request", error);
            }
        } else {
            console.log("MetaMask not found. Please install it to use this feature.");
            alert("Please install MetaMask to connect your wallet!");
        }
    }, []);

    const handleReportSite = (newReport) => {
        setReportedSites(prevSites => [newReport, ...prevSites]);
    };
    
    const handleDismissReport = (id) => {
        setReportedSites(prevSites => prevSites.filter(site => site.id !== id));
    };

    const renderPage = () => {
        switch (page) {
            case 'home': return <HomePage setPage={setPage} />;
            case 'listyoursite': return <ListYourSitePage account={account} />;
            case 'scanurl': return <ScanUrlPage />;
            case 'reportasite': return <ReportSitePage onReportSite={handleReportSite} />;
            case 'reportedsites': return <ReportedSitesPage reportedSites={reportedSites} />;
            case 'admindashboard': return <AdminDashboardPage reportedSites={reportedSites} onDismissReport={handleDismissReport} />;
            default: return <HomePage setPage={setPage} />;
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <style>
                {`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient {
                  background: linear-gradient(to right, #FBBF24, #F59E0B, #D97706, #FBBF24);
                  background-size: 300% 100%;
                  color: transparent;
                  -webkit-background-clip: text;
                  background-clip: text;
                  animation: gradient 8s linear infinite;
                }
                @keyframes scroll-attributes {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .attribute-scroll {
                    animation: scroll-attributes 20s linear infinite;
                }
                .ai-graphic-text {
                    text-shadow: 0 0 15px rgba(0,0,0,0.7);
                }
                
                .blockchain-graphic {
                    display: flex;
                    align-items: center;
                }
                .blockchain-graphic .block {
                    background-color: #2D3748; /* gray-800 */
                    border: 1px solid #4A5568; /* gray-600 */
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 0 -10px;
                    position: relative;
                    animation: float 6s ease-in-out infinite;
                }
                 .blockchain-graphic .block:nth-child(2) {
                    animation-delay: -2s;
                 }
                 .blockchain-graphic .block:nth-child(3) {
                    animation-delay: -4s;
                 }
                .blockchain-graphic .block:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -25px;
                    width: 20px;
                    height: 2px;
                    background-color: #FBBF24; /* yellow-400 */
                    transform: translateY(-50%);
                }
                .block-text {
                    color: #FBBF24;
                    font-weight: bold;
                    font-size: 1.25rem;
                }
                .block-hash {
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: #A0AEC0; /* gray-400 */
                    margin-top: 0.5rem;
                }
                @keyframes float {
                    0% { transform: translatey(0px); }
                    50% { transform: translatey(-10px); }
                    100% { transform: translatey(0px); }
                }

                .on-chain-graphic {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .report-icon, .smart-contract-icon {
                    font-size: 3rem;
                    z-index: 10;
                }
                .smart-contract-icon {
                    position: relative;
                }
                 .smart-contract-icon span {
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: #A0AEC0;
                    white-space: nowrap;
                 }
                
                .dots {
                  position: absolute;
                  width: 100%;
                  height: 4px;
                  background-image: linear-gradient(to right, #FBBF24 50%, transparent 50%);
                  background-size: 20px 4px;
                  animation: report-move 2s linear infinite;
                }

                @keyframes report-move {
                  from { background-position-x: 0; }
                  to { background-position-x: -20px; }
                }
                
                .blacklist-graphic {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }
                .blacklist-item {
                    background: #4A5568;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-family: monospace;
                    color: #CBD5E0;
                    opacity: 0;
                    animation: fade-in-list 0.5s ease-out forwards;
                    display: flex;
                    justify-content: space-between;
                }
                 .blacklist-item:nth-child(2) { animation-delay: 0.2s; }
                 .blacklist-item:nth-child(3) { animation-delay: 0.4s; }
                
                .banned-mark {
                    color: #FC8181; /* red-400 */
                }

                @keyframes fade-in-list {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .enforcement-graphic {
                    position: relative;
                }
                .wallet-icon { font-size: 5rem; }
                .ban-hammer {
                    font-size: 6rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-30deg);
                    opacity: 0;
                    animation: ban-stomp 1s ease-out forwards;
                    animation-delay: 0.5s;
                    color: #FC8181;
                }
                 @keyframes ban-stomp {
                    0% { transform: translate(-50%, -50%) rotate(-30deg) scale(2); opacity: 0; }
                    50% { transform: translate(-50%, -50%) rotate(-30deg) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) rotate(-30deg) scale(1); opacity: 1; }
                 }
                 
                 .audit-graphic {
                    position: relative;
                 }
                 .magnifying-glass {
                    position: absolute;
                    font-size: 4rem;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: magnify-pulse 3s ease-in-out infinite;
                 }
                  @keyframes magnify-pulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.2); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                  }
                `}
            </style>
            <Navbar account={account} setPage={setPage} connectWallet={connectWallet} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

