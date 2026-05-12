import axios from 'axios';
import { useMemo, useState } from 'react';

import { formatDateTimeWib } from '@/lib/wibTime';

export default function CommandsPanel({ commands, devices, onSent }) {
    const [deviceId, setDeviceId] = useState('');
    const [command, setCommand] = useState('start');
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const rows = commands ?? [];
    const deviceOptions = useMemo(() => devices ?? [], [devices]);

    const send = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        if (!deviceId) {
            setError('Pilih perangkat.');
            return;
        }
        setSending(true);
        try {
            await axios.post(route('dashboard.commands.send'), {
                device_id: deviceId,
                command,
            });
            setMessage('Perintah dimasukkan antrian.');
            onSent?.();
        } catch (err) {
            const msg =
                err.response?.data?.message ??
                err.response?.data?.errors?.device_id?.[0] ??
                'Gagal mengirim perintah.';
            setError(typeof msg === 'string' ? msg : 'Gagal mengirim perintah.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Command</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Kirim perintah ke device (endpoint web, sesi login + CSRF).
                </p>
            </div>

            <form
                onSubmit={send}
                className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:items-end"
            >
                <div className="min-w-0 flex-1">
                    <label className="block text-xs font-medium text-gray-600">
                        Perangkat
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                    >
                        <option value="">— pilih —</option>
                        {deviceOptions.map((d) => (
                            <option key={d.device_id} value={d.device_id}>
                                {d.device_id} — {d.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Perintah
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                    >
                        <option value="start">start</option>
                        <option value="stop">stop</option>
                        <option value="alert">alert</option>
                        <option value="reset">reset</option>
                        <option value="reboot">reboot</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                >
                    {sending ? 'Mengirim…' : 'Kirim'}
                </button>
            </form>

            {message && (
                <p className="border-b border-emerald-100 bg-emerald-50 px-6 py-2 text-sm text-emerald-800">
                    {message}
                </p>
            )}
            {error && (
                <p className="border-b border-red-100 bg-red-50 px-6 py-2 text-sm text-red-800">
                    {error}
                </p>
            )}

            <div className="overflow-x-auto">
                {rows.length === 0 ? (
                    <p className="p-6 text-sm text-gray-500">Belum ada command.</p>
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
                                    Perintah
                                </th>
                                <th className="px-6 py-3 font-medium text-gray-700">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {rows.map((c) => (
                                <tr key={c.id}>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                                        {formatDateTimeWib(c.created_at, {
                                            dateStyle: 'short',
                                            timeStyle: 'medium',
                                        })}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 font-mono text-gray-900">
                                        {c.device_id}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-900">
                                        {c.command}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-gray-700">
                                        {c.status}
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
