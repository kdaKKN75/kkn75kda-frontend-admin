import TableMaster from '../../components/TableMaster';
import { BiPencil, BiTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';
import client from '../../api/axios';
import { useState, useEffect } from 'react';

const MasterData = () => {
    const [pekerjaan, setPekerjaan] = useState([]);
    const [pendidikan, setPendidikan] = useState([]);
    const [tag, setTag] = useState([]);
    const [asset, setAsset] = useState([]);

    const handleEdit = async (id, title, endpoint) => {
        Swal.fire({
            title: `Edit ${title}`,
            inputLabel: `Masukkan Nama ${title} Baru:`,
            input: 'text',
            confirmButtonText: 'Simpan',
            confirmButtonColor: '#10B981',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return `Field ${title} Harus Diisi!`;
                }
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const payload = {
                        nama: result.value,
                    };

                    const res = await client.put(`/${endpoint}/${id}`, payload, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (res.data.status === true) {
                        Swal.fire(`${title} Berhasil Diedit!`, '', 'success');
                    } else {
                        Swal.fire(`${title} Gagal Diedit!`, '', 'info');
                        console.log(res.data.message);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            } else if (result.isDenied) {
                Swal.fire(`${title} Berhasil Diedit!`, '', 'success');
            }
        });
    };

    const handleDelete = async (id, title, endpoint) => {
        Swal.fire({
            icon: 'warning',
            text: 'Apakah Anda Yakin Menghapus Artikel Ini?',
            title: `Apakah Anda Yakin Menghapus ${title} Ini?`,
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await client.delete(`/${endpoint}/${id}`);
                    if (res.data.status === true) {
                        Swal.fire(`${title} Berhasil Dihapus!`, '', 'success');
                    } else {
                        Swal.fire(`${title} Gagal Dihapus!`, '', 'info');
                        console.log(res.data.message);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            } else if (result.isDenied) {
                Swal.fire(`${title} Gagal Dihapus!`, '', 'info');
            }
        });
    };

    const columnPekerjaan = [
        {
            name: 'Nama',
            grow: 3,
            selector: (row) => row.nama,
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <div className="flex gap-x-2">
                    <button onClick={() => handleEdit(row.id, 'Pekerjaan', 'pekerjaan')}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                    <button onClick={() => handleDelete(row.id, 'Pekerjaan', 'pekerjaan')}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
    ];

    const columnPendidikan = [
        {
            name: 'Nama',
            grow: 3,
            selector: (row) => row.nama,
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <div className="flex gap-x-2">
                    <button onClick={() => handleEdit(row.id, 'Pendidikan', 'pendidikan')}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                    <button onClick={() => handleDelete(row.id, 'Pendidikan', 'pendidikan')}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
    ];

    const columnTag = [
        {
            name: 'Nama',
            grow: 3,
            selector: (row) => row.nama,
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <div className="flex gap-x-2">
                    <button onClick={() => handleEdit(row.id, 'Tag', 'tag')}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                    <button onClick={() => handleDelete(row.id, 'Tag', 'tag')}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
    ];

    const columnAsset = [
        {
            name: 'Nama',
            grow: 3,
            selector: (row) => row.nama,
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <div className="flex gap-x-2">
                    <button onClick={() => handleEdit(row.id, 'Asset', 'asset')}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                    <button onClick={() => handleDelete(row.id, 'Asset', 'asset')}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
    ];

    const fetchPekerjaan = async () => {
        try {
            const res = await client.get('/pekerjaan');
            if (res.data.status === true) {
                setPekerjaan(res.data.data.pekerjaan);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPendidikan = async () => {
        try {
            const res = await client.get('/pendidikan');
            if (res.data.status === true) {
                setPendidikan(res.data.data.pendidikan);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTag = async () => {
        try {
            const res = await client.get('/tag');
            if (res.data.status === true) {
                setTag(res.data.data.tags);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAsset = async () => {
        try {
            const res = await client.get('/asset');
            if (res.data.status === true) {
                setAsset(res.data.data.assets);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPekerjaan();
        fetchPendidikan();
        fetchTag();
        fetchAsset();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Master Data</h1>
            <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap">
                <div className="border p-3 rounded-t shadow border-slate-400">
                    <h1 className="text-lg font-medium mb-1">Pekerjaan</h1>
                    <TableMaster columns={columnPekerjaan} data={pekerjaan} />
                </div>
                <div className="border p-3 rounded-t shadow border-slate-400">
                    <h1 className="text-lg font-medium mb-1">Pendidikan</h1>
                    <TableMaster columns={columnPendidikan} data={pendidikan} />
                </div>
                <div className="border p-3 rounded-t shadow border-slate-400">
                    <h1 className="text-lg font-medium mb-1">Asset</h1>
                    <TableMaster columns={columnAsset} data={asset} />
                </div>
                <div className="border p-3 rounded-t shadow border-slate-400">
                    <h1 className="text-lg font-medium mb-1">Tag</h1>
                    <TableMaster columns={columnTag} data={tag} />
                </div>
            </div>
        </section>
    );
};

export default MasterData;
