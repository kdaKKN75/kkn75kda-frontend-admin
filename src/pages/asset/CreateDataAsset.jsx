import { useState } from 'react';
import { BiImport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import client from '../../api/axios';
import InputFile from '../../components/form/InputFile';

const CreatePenduduk = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState();
    const [noKK, setNoKK] = useState('');
    const [asset, setAsset] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [penghasilan, setPenghasilan] = useState('');

    const navigate = useNavigate();

    const handleModal = (open) => {
        setModalOpen(open);
    };

    const handleFile = (file) => {
        setFile(file);
    };

    const submitCsv = async () => {
        const payload = {
            file_data_asset: file,
        };

        try {
            const token = localStorage.getItem('token');
            const res = await client.post('/data-asset/import', payload, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
            });

            if (res.data.status === true) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/data-asset');
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(res.data.message);
                navigate('/data-asset');
            }
        } catch (error) {
            toast.error('Internal Server Error');
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
            const token = localStorage.getItem('token');
            const res = await client.post('/penduduk', payload, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (res.data.status === true) {
                toast.success('Penduduk Berhasil Ditambahkan!');
                setTimeout(() => {
                    navigate('/penduduk');
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

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Tambah Data Asset</h1>
            <div className="flex flex-col">
                <div className="flex justify-end mb-2">
                    <button
                        className="flex border-2 border-meta-3 w-36 items-center px-3 py-[5px] font-medium rounded text-meta-3"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        <BiImport className="me-2" />
                        Import Data
                    </button>
                </div>
                <InputFile
                    showModal={modalOpen}
                    setShowModal={handleModal}
                    setCsv={handleFile}
                    handleSubmit={submitCsv}
                    title={'Data Asset'}
                />

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

export default CreatePenduduk;
