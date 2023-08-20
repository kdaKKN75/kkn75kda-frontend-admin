import { useState, useEffect } from 'react';
import { BiImport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import client from '../../api/axios';
import InputFile from '../../components/form/InputFile';

const CreatePenduduk = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState();
    const [listPendidikan, setListPendidikan] = useState([]);
    const [listPekerjaan, setListPekerjaan] = useState([]);
    const [namaLengkap, setNamaLengkap] = useState('');
    const [nik, setNIK] = useState('');
    const [gender, setGender] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState('');
    const [agama, setAgama] = useState('');
    const [pendidikan, setPendidikan] = useState('');
    const [pekerjaan, setPekerjaan] = useState('');
    const [noHP, setNoHP] = useState('');
    const [status, setStatus] = useState('');
    const [noKK, setNoKK] = useState('');
    const [dusun, setDusun] = useState('');
    const [rt, setRT] = useState('');
    const [rw, setRW] = useState('');
    const navigate = useNavigate();

    const handleModal = (open) => {
        setModalOpen(open);
    };

    const handleFile = (file) => {
        setFile(file);
    };

    const fetchPendidikan = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await client.get('/pendidikan', { headers: { Authorization: `Bearer ${token}` } });
            setListPendidikan(res.data.data.pendidikan);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPekerjaan = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await client.get('/pekerjaan', { headers: { Authorization: `Bearer ${token}` } });
            setListPekerjaan(res.data.data.pekerjaan);
        } catch (error) {
            console.log(error);
        }
    };

    const submitCsv = async () => {
        const payload = {
            file_penduduk: file,
        };

        try {
            const token = localStorage.getItem('token');
            const res = await client.post('/penduduk/import', payload, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
            });

            if (res.data.status === true) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/penduduk');
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(res.data.message);
                navigate('/penduduk');
            }
        } catch (error) {
            toast.error('Internal Server Error');
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            namaLengkap: namaLengkap,
            nik: nik,
            gender: gender,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            agama: agama,
            pendidikan: pendidikan,
            pekerjaan: pekerjaan,
            no_hp: noHP,
            status: status,
            no_kk: noKK,
            dusun: dusun,
            rt: rt,
            rw: rw,
        };

        try {
            const token = localStorage.getItem('token');
            const res = await client.post('/penduduk', payload, {
                headers: { 'Content-Type': 'application/json' },
                Authorization: `Bearer ${token}`,
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

    useEffect(() => {
        fetchPendidikan();
        fetchPekerjaan();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Tambah Penduduk</h1>
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
                    title={'Penduduk'}
                />

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="namaLengkap">
                                Nama Lengkap
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="namaLengkap"
                                placeholder="Budi"
                                onChange={(e) => setNamaLengkap(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="nik">
                                NIK
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="nik"
                                placeholder="3504050103010005"
                                onChange={(e) => setNIK(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="gender">
                                Jenis Kelamin
                            </label>
                            <select
                                id="gender"
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" selected>
                                    Pilih Jenis Kelamin
                                </option>
                                <option value="L">Laki - Laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="agama">
                                Agama
                            </label>
                            <select
                                id="agama"
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                onChange={(e) => setAgama(e.target.value)}
                            >
                                <option value="" selected>
                                    Pilih Agama
                                </option>
                                <option value="Islam">Islam</option>
                                <option value="Kristen Protestan">Kristen Protestan</option>
                                <option value="Kristen Katolik">Kristen Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Khonghucu">Khonghucu</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="tempat_lahir">
                                Tempat Lahir
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="tempat_lahir"
                                placeholder="Bondowoso"
                                onChange={(e) => setTempatLahir(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="tanggal_lahir">
                                Tanggal Lahir
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="date"
                                id="tanggal_lahir"
                                onChange={(e) => setTanggalLahir(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="pekerjaan">
                                Pendidikan
                            </label>
                            <select
                                id="pendidikan"
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                onChange={(e) => setPendidikan(e.target.value)}
                            >
                                <option value="" selected>
                                    Pilih Pendidikan
                                </option>
                                {listPendidikan.map((pendidikan, index) => (
                                    <option key={index} value={pendidikan.nama}>
                                        {pendidikan.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="pekerjaan">
                                Pekerjaan
                            </label>
                            <select
                                id="pekerjaan"
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                onChange={(e) => setPekerjaan(e.target.value)}
                            >
                                <option value="" selected>
                                    Pilih Pekerjaan
                                </option>
                                {listPekerjaan.map((pekerjaan, index) => (
                                    <option key={index} value={pekerjaan.nama}>
                                        {pekerjaan.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="no_hp">
                                No.HP
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="no_hp"
                                placeholder="087775187645"
                                onChange={(e) => setNoHP(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="status">
                                Status
                            </label>
                            <select
                                id="status"
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" selected>
                                    Pilih Status
                                </option>
                                <option value="Belum Menikah">Belum Menikah</option>
                                <option value="Menikah">Menikah</option>
                                <option value="Cerai Hidup">Cerai Hidup</option>
                                <option value="Cerai Mati">Cerai Mati</option>
                            </select>
                        </div>
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
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-x-5">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="dusun">
                                Dusun
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="dusun"
                                placeholder="Kampung Baru"
                                onChange={(e) => setDusun(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="rt">
                                RT
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="rt"
                                placeholder="001"
                                onChange={(e) => setRT(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-medium" htmlFor="rw">
                                RW
                            </label>
                            <input
                                className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                type="text"
                                id="rw"
                                placeholder="006"
                                onChange={(e) => setRW(e.target.value)}
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

export default CreatePenduduk;
