import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import client from '../../api/axios';

const EditPerangkat = () => {
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [photo, setPhoto] = useState();

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchPerangkat = async () => {
        try {
            const res = await client.get(`/perangkat-desa/${id}`);
            if (res.data.status === true) {
                setNama(res.data.data.perangkatDesa.nama);
                setJabatan(res.data.data.perangkatDesa.jabatan);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { nama: nama, jabatan: jabatan, photo: photo };

        try {
            const res = await client.put(`/perangkat-desa/${id}`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.status === true) {
                toast('Perangkat Desa Berhasil Dirubah!');
                setTimeout(() => {
                    navigate('/perangkat-desa');
                }, 3000);
            } else if (res.data.status === false) {
                toast(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPerangkat();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Edit Data Asset</h1>
            <div className="flex flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="nama">
                                Nama
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="nama"
                                value={nama}
                                placeholder="350405010010001"
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="jabatan">
                                Jabatan
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="jabatan"
                                value={jabatan}
                                placeholder="Kepala Desa"
                                onChange={(e) => setJabatan(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="photo">
                                Foto
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3 file:bg-white file:border-meta-3 file:rounded file:text-sm"
                                type="file"
                                id="photo"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 md:flex-row md:gap-x-5">
                        <button
                            className="w-full py-2 bg-meta-3 uppercase text-white font-semibold rounded hover:bg-emerald-600"
                            type="submit"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditPerangkat;
