import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import client from '../../api/axios';

const EditAgenda = () => {
    const [judul, setJudul] = useState('');
    const [tempat, setTempat] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [waktu, setWaktu] = useState();

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchAgenda = async () => {
        try {
            const res = await client.get(`/agenda/${id}`);
            if (res.data.status === true) {
                setJudul(res.data.data.agenda.judul);
                setTempat(res.data.data.agenda.tempat);
                setTanggal(res.data.data.agenda.tanggal);
                setWaktu(res.data.data.agenda.waktu);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            judul: judul,
            tempat: tempat,
            tanggal: tanggal,
            waktu: waktu,
        };

        try {
            const res = await client.put(`/agenda/${id}`, payload, { headers: { 'Content-Type': 'application/json' } });
            if (res.data.status === true) {
                toast.success('Berhasil Merubah Agenda!');
                setTimeout(() => {
                    navigate('/agenda');
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Internal Server Error');
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAgenda();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Buat Artikel</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full mb-2">
                    <label className="mb-2 font-medium" htmlFor="judul">
                        Judul
                    </label>
                    <input
                        className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                        type="text"
                        id="judul"
                        value={judul}
                        placeholder="Festival 17 Agustus"
                        onChange={(e) => setJudul(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full mb-2">
                    <label className="mb-2 font-medium" htmlFor="tempat">
                        Tempat
                    </label>
                    <input
                        className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                        type="text"
                        id="tempat"
                        value={tempat}
                        placeholder="Balai Desa"
                        onChange={(e) => setTempat(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full mb-2">
                    <label className="mb-2 font-medium" htmlFor="tanggal">
                        Tanggal
                    </label>
                    <input
                        className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                        type="date"
                        id="tanggal"
                        value={tanggal}
                        placeholder="Balai Desa"
                        onChange={(e) => setTanggal(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full mb-2">
                    <label className="mb-2 font-medium" htmlFor="waktu">
                        Waktu
                    </label>
                    <input
                        className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                        type="time"
                        id="waktu"
                        value={waktu}
                        placeholder="Balai Desa"
                        onChange={(e) => setWaktu(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full mb-2">
                    <button className="px-3 py-2 mb-2 bg-meta-3 uppercase font-medium text-white rounded hover:bg-emerald-600">
                        Simpan
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditAgenda;
