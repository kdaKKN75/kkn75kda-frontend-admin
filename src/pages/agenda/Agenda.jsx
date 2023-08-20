import { Link } from 'react-router-dom';
import { BiPlus, BiPencil, BiTrash } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import client from '../../api/axios';
import Table from '../../components/Table';
import Swal from 'sweetalert2';

const Agenda = () => {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await client.get('/agenda', { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.status === true) {
                res.data.data.agenda.forEach((agenda, index) => {
                    agenda.no = index + 1;
                });
                setData(res.data.data.agenda);
                setFilterData(res.data.data.agenda);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Agenda',
            text: 'Apakah Anda Yakin Menghapus Agenda Ini?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                const res = await client.delete(`/agenda/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                if (res.data.status === true) {
                    Swal.fire('Agenda Berhasil Dihapus!', '', 'success');
                    window.location.reload();
                } else {
                    Swal.fire('Agenda Gagal Dihapus!', '', 'info');
                    console.log(res.data.message);
                }
            } else if (result.isDenied) {
                Swal.fire('Agenda Gagal Dihapus!', '', 'info');
            }
        });
    };

    const columns = [
        {
            name: '#',
            width: '3rem',
            cell: (row) => row.no,
        },
        {
            name: 'Action',
            width: '8rem',
            center: true,
            cell: (row) => (
                <div className="flex gap-x-2">
                    <Link to={`/agenda/${row.id}`}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </Link>
                    <button onClick={() => handleDelete(row.id)}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
        {
            name: 'Nama Kegiatan',
            selector: (row) => row.judul,
        },
        {
            name: 'Tempat',
            selector: (row) => row.tempat,
        },
        {
            name: 'Tanggal',
            selector: (row) => row.tanggal,
        },
        {
            name: 'Waktu',
            selector: (row) => row.waktu,
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const filters = data.filter((item) => {
                if (!filter) {
                    return data;
                }

                return item.judul && item.judul.includes(filter);
            });

            setFilterData(filters);
        }
    }, [filter]);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Daftar Agenda</h1>
            <div className="flex flex-col mb-5 gap-y-2 sm:flex-row sm:justify-between">
                <Link to="/agenda/create">
                    <button className="flex items-center px-3 py-2 bg-meta-3 text-white font-medium rounded">
                        <BiPlus className="me-1" />
                        Tambah Agenda
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
                        placeholder="Nama Agenda"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>
            <Table columns={columns} data={filterData} />
        </section>
    );
};

export default Agenda;
