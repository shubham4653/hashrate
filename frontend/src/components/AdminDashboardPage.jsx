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

export default AdminDashboardPage;
