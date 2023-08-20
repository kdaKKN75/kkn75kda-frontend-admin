import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../api/axios';
import { toast } from 'react-toastify';

const EditPenduduk = () => {
    const [listPendidikan, setListPendidikan] = useState([]);
    const [listPekerjaan, setListPekerjaan] = useState([]);
    const [penduduk, setPenduduk] = useState([]);
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
    const { id } = useParams();

    const fetchPendidikan = async () => {
        try {
            const res = await client.get('/pendidikan');
            setListPendidikan(res.data.data.pendidikan);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPekerjaan = async () => {
        try {
            const res = await client.get('/pekerjaan');
            setListPekerjaan(res.data.data.pekerjaan);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPenduduk = async () => {
        try {
            const res = await client.get(`/penduduk/${id}`);
            setPenduduk(res.data.data.resident[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            namaLengkap: namaLengkap || penduduk.namaLengkap,
            nik: nik || penduduk.nik,
            gender: gender || penduduk.gender,
            tempat_lahir: tempatLahir || penduduk.tempatLahir,
            tanggal_lahir: tanggalLahir || penduduk.tanggalLahir,
            agama: agama || penduduk.agama,
            pendidikan: pendidikan || penduduk.pendidikan,
            pekerjaan: pekerjaan || penduduk.pekerjaan,
            no_hp: noHP || penduduk.noHP,
            status: status || penduduk.status,
            no_kk: noKK || penduduk.noKK,
            dusun: dusun || penduduk.dusun,
            rt: rt || penduduk.rt,
            rw: rw || penduduk.rw,
        };

        try {
            const res = await client.put(`/penduduk/${id}`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.data.status === true) {
                toast.success('Penduduk Berhasil Diubah!');
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
        fetchPenduduk();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Edit Data Penduduk</h1>
            <div className="flex flex-col relative">
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
                                value={penduduk.namaLengkap}
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
                                value={penduduk.nik}
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
                                value={penduduk.gender}
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
                                value={penduduk.agama}
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
                                value={penduduk.tempat_lahir}
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
                                value={penduduk.tanggal_lahir}
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
                                value={penduduk.pendidikan}
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
                                value={penduduk.pekerjaan}
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
                                value={penduduk.no_hp}
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
                                value={penduduk.status}
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
                                value={penduduk.no_kk}
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
                                value={penduduk.dusun}
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
                                value={penduduk.rt}
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
                                value={penduduk.rw}
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

export default EditPenduduk;
