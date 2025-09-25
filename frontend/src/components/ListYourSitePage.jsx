import { useState } from 'react';

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

export default ListYourSitePage;
