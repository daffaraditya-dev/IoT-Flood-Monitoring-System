import { formatDateTimeWib } from '@/lib/wibTime';

const alertClass = (level) => {
    switch (level) {
        case 'danger':
            return 'bg-red-100 text-red-800';
        case 'warning':
            return 'bg-amber-100 text-amber-800';
        default:
            return 'bg-emerald-100 text-emerald-800';
    }
};

export default function SensorReadingsTable({ latestData }) {
    const rows = latestData ?? [];

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                    Pembacaan sensor terbaru
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Maks. 100 entri terakhir (sumber sama dengan field{' '}
                    <code className="rounded bg-gray-100 px-1">latest_data</code> di API).
                </p>
            </div>
            <div className="overflow-x-auto">
                {rows.length === 0 ? (
                    <p className="p-6 text-sm text-gray-500">
                        Belum ada data. Pastikan perangkat mengirim ke{' '}
                        <code className="rounded bg-gray-100 px-1">POST /api/ingest</code>{' '}
                        dengan header API key.
                    </p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Waktu
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Device
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Air (cm)
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Hujan
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Alert
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                                        {formatDateTimeWib(row.created_at, {
                                            dateStyle: 'short',
                                            timeStyle: 'medium',
                                        })}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 font-mono text-gray-900">
                                        {row.device_id}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-900">
                                        {row.water_level}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-900">
                                        {row.rainfall}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3">
                                        <span
                                            className={
                                                'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ' +
                                                alertClass(row.alert_level)
                                            }
                                        >
                                            {row.alert_level}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
