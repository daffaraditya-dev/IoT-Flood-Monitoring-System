export default function StatCard({ label, value }) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-5">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
