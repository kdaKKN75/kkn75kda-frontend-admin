import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import client from '../../api/axios';

const EditAsset = () => {
    const [noKK, setNoKK] = useState('');
    const [asset, setAsset] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [penghasilan, setPenghasilan] = useState('');
    const [dataAsset, setDataAsset] = useState();

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchAsset = async () => {
        try {
            const res = await client.get(`/data-asset/${id}`);
            if (res.data.status === true) {
                setDataAsset(res.data.data.dataAsset[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            no_kk: noKK,
            asset: asset,
            jumlah: jumlah,
            penghasilan: penghasilan,
        };

        try {
            const res = await client.put(`/data-asset/${id}`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.data.status === true) {
                toast.success('Data Asset Berhasil Dirubah!');
                setTimeout(() => {
                    navigate('/data-asset');
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.warn('Internal Server Error');
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAsset();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Edit Data Asset</h1>
            <div className="flex flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="no_kk">
                                No.KK
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="no_kk"
                                value={dataAsset.no_kk_id}
                                placeholder="350405010010001"
                                onChange={(e) => setNoKK(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="asset">
                                Nama Asset
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="asset"
                                value={dataAsset.asset.nama}
                                placeholder="Sepeda Motor"
                                onChange={(e) => setAsset(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="asset">
                                Jumlah
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="asset"
                                value={dataAsset.jumlah}
                                placeholder="1"
                                onChange={(e) => setJumlah(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="penghasilan">
                                Penghasilan
                            </label>
                            <select
                                id="penghasilan"
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                onChange={(e) => setPenghasilan(e.target.value)}
                                value={dataAsset.penghasilan}
                            >
                                <option value="" selected>
                                    Pilih Penghasilan
                                </option>
                                <option value="< Rp 500.000">{'> Rp 500.000'}</option>
                                <option value="> Rp 500.000 - Rp 1.000.000">{'> Rp 500.000 - Rp 1.000.000'}</option>
                                <option value="> Rp 1.000.000 - Rp 2.000.000">{'> Rp 500.000 - Rp 1.000.000'}</option>
                                <option value="> Rp 2.00.000 - Rp 3.000.000">{'> Rp 2.00.000 - Rp 3.000.000'}</option>
                                <option value="> Rp 3.000.000">{'> Rp 3.000.000'}</option>
                            </select>
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

export default EditAsset;
