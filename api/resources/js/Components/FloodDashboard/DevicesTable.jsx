import { formatDateTimeWib } from '@/lib/wibTime';

const statusBadge = (status) => {
    const on = status === 'online';
    return (
        <span
            className={
                'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ' +
                (on ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700')
            }
        >
            {status}
        </span>
    );
};

export default function DevicesTable({ devices }) {
    const rows = devices ?? [];

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Perangkat</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Status dihitung dari telemetry &amp; command (sama seperti API
                    dashboard).
                </p>
            </div>
            <div className="overflow-x-auto">
                {rows.length === 0 ? (
                    <p className="p-6 text-sm text-gray-500">Belum ada perangkat.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    ID
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Nama
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Lokasi
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Status
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Terakhir lihat
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {rows.map((d) => (
                                <tr key={d.device_id}>
                                    <td className="whitespace-nowrap px-6 py-3 font-mono text-gray-900">
                                        {d.device_id}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-900">
                                        {d.name}
                                    </td>
                                    <td className="px-6 py-3 text-gray-700">
                                        {d.location}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3">
                                        {statusBadge(d.status)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                                        {d.last_seen_at
                                            ? formatDateTimeWib(d.last_seen_at, {
                                                  dateStyle: 'short',
                                                  timeStyle: 'medium',
                                              })
                                            : '—'}
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
