/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import clientPrivate from '../../api/axiosPrivate';
import { Link } from 'react-router-dom';
import { BiPlus, BiPencil, BiTrash } from 'react-icons/bi';
import client from '../../api/axios';
import Swal from 'sweetalert2';

const DataAsset = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterData, setFilterData] = useState();

    const columns = [
        {
            name: '#',
            width: '3rem',
            center: true,
            cell: (row) => row.id,
        },
        {
            name: 'Action',
            center: true,
            width: '8rem',
            cell: (row) => (
                <div className="flex gap-x-2">
                    <Link to={`/data-asset/edit/${row.id}`}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </Link>
                    <button onClick={() => handleDelete(row.nik)}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
        {
            name: 'No.KK',
            width: '10rem',
            center: true,
            selector: (row) => row.no_kk_id,
        },
        {
            name: 'Jumlah',
            width: '5rem',
            center: true,
            selector: (row) => row.jumlah,
        },
        {
            name: 'Nama Asset',
            selector: (row) => row.asset.nama,
        },
        {
            name: 'Penghasilan',
            selector: (row) => row.penghasilan,
        },
    ];

    const handleDelete = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Data Asset',
            text: 'Apakah Anda Yakin Menghapus Asset Ini?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await client.delete(`/data-asset/${id}`);
                if (res.data.status === true) {
                    Swal.fire('Asset Berhasil Dihapus!', '', 'success');
                    window.location.reload();
                } else {
                    Swal.fire('Asset Gagal Dihapus!', '', 'info');
                    console.log(res.data.message);
                }
            } else if (result.isDenied) {
                Swal.fire('Asset Gagal Dihapus!', '', 'info');
            }
        });
    };

    const fetchData = async () => {
        try {
            const res = await clientPrivate.get('/data-asset');
            setData(res.data.data.assets);
            setFilterData(res.data.data.assets);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const filters = data.filter((item) => {
                if (!filter) {
                    return data;
                }

                return item.no_kk_id && item.no_kk_id.includes(filter);
            });

            setFilterData(filters);
        }
    }, [filter]);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Daftar Asset Penduduk</h1>
            <div className="flex flex-col mb-2 gap-y-2 sm:flex-row sm:justify-between">
                <Link to="/data-asset/create">
                    <button className="flex items-center px-3 py-2 bg-meta-3 text-white font-medium rounded">
                        <BiPlus className="me-1" />
                        Tambah Data Asset
                    </button>
                </Link>
                <div>
                    <label htmlFor="search" className="mr-2">
                        Pencarian :
                    </label>
                    <input
                        type="text"
                        className="py-1 px-2 border-2 border-slate-600 rounded-md focus:outline-none focus:border-meta-3"
                        id="search"
                        placeholder="No.KK Penduduk"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>
            <Table columns={columns} data={filterData} />
        </section>
    );
};

export default DataAsset;
