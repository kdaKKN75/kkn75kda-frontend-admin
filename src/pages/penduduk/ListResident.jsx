/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import clientPrivate from '../../api/axiosPrivate';
import { Link } from 'react-router-dom';
import { BiPlus, BiPencil, BiTrash } from 'react-icons/bi';
import client from '../../api/axios';
import Swal from 'sweetalert2';

const ListResident = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterData, setFilterData] = useState([]);

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
                    <Link to={`/penduduk/edit/${row.nik}`}>
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
            name: 'Nama Lengkap',
            grow: 5,
            selector: (row) => row.namaLengkap,
        },
        {
            name: 'NIK',
            grow: 4,
            selector: (row) => row.nik,
        },
    ];

    const handleDelete = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Penduduk',
            text: 'Apakah Anda Yakin Menghapus Penduduk Ini?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await client.delete(`/penduduk/${id}`);
                if (res.data.status === true) {
                    Swal.fire('Penduduk Berhasil Dihapus!', '', 'success');
                    window.location.reload();
                } else {
                    Swal.fire('Penduduk Gagal Dihapus!', '', 'info');
                    console.log(res.data.message);
                }
            } else if (result.isDenied) {
                Swal.fire('Penduduk Gagal Dihapus!', '', 'info');
            }
        });
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await clientPrivate.get('/penduduk', { headers: { Authorization: `Bearer ${token}` } });
            res.data.data.residents.forEach((resident, index) => {
                resident.id = index + 1;
            });
            setData(res.data.data.residents);
            setFilterData(res.data.data.residents);
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
            <h1 className="text-2xl font-bold mb-5">Daftar Penduduk</h1>
            <div className="flex flex-col mb-2 gap-y-2 sm:flex-row sm:justify-between">
                <Link to="/penduduk/create">
                    <button className="flex items-center px-3 py-2 bg-meta-3 text-white font-medium rounded">
                        <BiPlus className="me-1" />
                        Tambah Penduduk
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
                        placeholder="Nama Penduduk"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>
            <Table columns={columns} data={filterData} expandTable={true} />
        </section>
    );
};

export default ListResident;
