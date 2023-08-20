import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import { BiPlus, BiPencil, BiTrash, BiShow } from 'react-icons/bi';
import Swal from 'sweetalert2';
import client from '../../api/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';

const Artikel = () => {
    const [artikel, setArtikel] = useState([]);

    const handelDelete = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Artikel',
            text: 'Apakah Anda Yakin Menghapus Artikel Ini?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await client.delete(`/artikel/${id}`);
                if (res.data.status === true) {
                    Swal.fire('Artikel Berhasil Dihapus!', '', 'success');
                    window.location.reload();
                } else {
                    Swal.fire('Artikel Gagal Dihapus!', '', 'info');
                    console.log(res.data.message);
                }
            } else if (result.isDenied) {
                Swal.fire('Artikel Gagal Dihapus!', '', 'info');
            }
        });
    };

    const fetchArtikel = async () => {
        try {
            const res = await client.get('/artikel');
            if (res.data.status === true) {
                res.data.data.artikels.forEach((artikel, index) => {
                    artikel.no = index + 1;
                });
                setArtikel(res.data.data.artikels);
            } else {
                toast(res.data.message);
            }
        } catch (error) {
            toast.error('Internal Server Error!');
            console.log(error.message);
        }
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
                    <Link to={`/artikel/edit/${row.id}`}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </Link>
                    <Link to={`${import.meta.env.VITE_MAIN_URL}/artikel/${row.id}`}>
                        <span className=" text-white font-semibold">
                            <BiShow className="bg-yellow-400 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </Link>
                    <button onClick={() => handelDelete(row.id)}>
                        <span className=" text-white font-semibold">
                            <BiTrash className="bg-red-500 w-8 h-8 p-2 rounded-md" />
                        </span>
                    </button>
                </div>
            ),
        },
        {
            name: 'Judul',
            selector: (row) => row.judul,
        },
        {
            name: 'Thumbnail',
            width: '12rem',
            center: true,
            cell: (row) => <img src={row.thumbnail} className="w-25 h-15" alt="thumbnail artikel" />,
        },
        {
            name: 'Tag',
            width: '10rem',
            center: true,
            selector: (row) => row.tag,
        },
    ];

    useEffect(() => {
        fetchArtikel();
    }, []);

    useEffect(() => {}, [artikel]);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Daftar Artikel</h1>
            <div className="mb-5">
                <Link to="/artikel/create">
                    <button className="flex items-center px-3 py-2 bg-meta-3 text-white font-medium rounded">
                        <BiPlus className="me-1" />
                        Buat Artikel
                    </button>
                </Link>
            </div>
            <div>
                <Table columns={columns} data={artikel} />
            </div>
        </section>
    );
};

export default Artikel;
