import { formatDateTimeWib } from '@/lib/wibTime';

export default function ActivityLogTable({ activityLog }) {
    const rows = activityLog ?? [];

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Log aktivitas</h3>
                <p className="mt-1 text-sm text-gray-500">30 entri terakhir.</p>
            </div>
            <div className="overflow-x-auto">
                {rows.length === 0 ? (
                    <p className="p-6 text-sm text-gray-500">Belum ada log.</p>
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
                                    Aksi
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Detail
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {rows.map((log) => (
                                <tr key={log.id}>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                                        {formatDateTimeWib(log.created_at, {
                                            dateStyle: 'short',
                                            timeStyle: 'medium',
                                        })}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 font-mono text-gray-900">
                                        {log.device_id ?? '—'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-900">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-3 text-gray-700">{log.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
