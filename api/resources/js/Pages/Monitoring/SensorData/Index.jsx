import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ sensorData, devices, filters }) {
    const { data, setData, get, processing } = useForm({
        device_id: filters.device_id || '',
        alert_level: filters.alert_level || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const applyFilters = (e) => {
        e.preventDefault();
        get(route('monitoring.sensor-data.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        router.get(route('monitoring.sensor-data.index'));
    };

    const removeRow = (id) => {
        if (confirm('Hapus baris data ini?')) {
            router.delete(route('monitoring.sensor-data.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">Data sensor</h2>
            }
        >
            <Head title="Data sensor" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <form
                        onSubmit={applyFilters}
                        className="flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Perangkat
                            </label>
                            <select
                                className="mt-1 rounded-md border-gray-300 text-sm shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                value={data.device_id}
                                onChange={(e) => setData('device_id', e.target.value)}
                            >
                                <option value="">Semua</option>
                                {devices.map((d) => (
                                    <option key={d.device_id} value={d.device_id}>
                                        {d.name} ({d.device_id})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Level (DB)
                            </label>
                            <select
                                className="mt-1 rounded-md border-gray-300 text-sm shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                value={data.alert_level}
                                onChange={(e) => setData('alert_level', e.target.value)}
                            >
                                <option value="">Semua</option>
                                <option value="normal">NORMAL</option>
                                <option value="warning">SIAGA</option>
                                <option value="danger">AWAS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Dari
                            </label>
                            <input
                                type="date"
                                className="mt-1 rounded-md border-gray-300 text-sm shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                value={data.date_from}
                                onChange={(e) => setData('date_from', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Sampai
                            </label>
                            <input
                                type="date"
                                className="mt-1 rounded-md border-gray-300 text-sm shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                value={data.date_to}
                                onChange={(e) => setData('date_to', e.target.value)}
                            />
                        </div>
                        <PrimaryButton type="submit" disabled={processing}>
                            Terapkan
                        </PrimaryButton>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            Reset
                        </button>
                    </form>

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                        Device
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                        Air (cm)
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                        Hujan (opsional)
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                        Relay
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                        Level
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                        Waktu
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sensorData.data.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-mono text-gray-900">
                                            {row.device_id}
                                        </td>
                                        <td className="px-4 py-3">{row.water_level}</td>
                                        <td className="px-4 py-3">{row.rainfall ?? '—'}</td>
                                        <td className="px-4 py-3">
                                            {row.relay_on === null || row.relay_on === undefined
                                                ? '—'
                                                : row.relay_on
                                                  ? 'ON'
                                                  : 'OFF'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={
                                                    'inline-flex rounded-full px-2 py-0.5 text-xs font-medium ' +
                                                    (row.alert_level === 'danger'
                                                        ? 'bg-red-100 text-red-800'
                                                        : row.alert_level === 'warning'
                                                          ? 'bg-amber-100 text-amber-900'
                                                          : 'bg-emerald-100 text-emerald-800')
                                                }
                                            >
                                                {row.alert_level === 'danger'
                                                    ? 'AWAS'
                                                    : row.alert_level === 'warning'
                                                      ? 'SIAGA'
                                                      : 'NORMAL'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {row.created_at}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                type="button"
                                                onClick={() => removeRow(row.id)}
                                                className="text-sm font-medium text-red-600 hover:text-red-800"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {sensorData.links?.length > 3 ? (
                        <div className="flex flex-wrap gap-1">
                            {sensorData.links.map((l, i) => (
                                <Link
                                    key={i}
                                    href={l.url || '#'}
                                    className={
                                        'rounded px-3 py-1 text-sm ' +
                                        (l.active
                                            ? 'bg-amber-600 text-white'
                                            : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50') +
                                        (!l.url ? ' pointer-events-none opacity-50' : '')
                                    }
                                    dangerouslySetInnerHTML={{ __html: l.label }}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
