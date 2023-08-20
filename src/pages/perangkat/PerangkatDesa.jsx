import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import client from '../../api/axios';
import { BiPencil, BiTrash, BiPlus } from 'react-icons/bi';
import Table from '../../components/Table';
import ModalPerangkat from '../../components/form/ModalPerangkat';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const PerangkatDesa = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState();
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [perangkat, setPerangkat] = useState([]);

    const navigate = useNavigate();

    const handleModal = (open) => {
        setModalOpen(open);
    };

    const handleFile = (file) => {
        setFile(file);
    };

    const handleJabatan = (jabatan) => {
        setJabatan(jabatan);
    };

    const handleNama = (nama) => {
        setNama(nama);
    };

    const fetchPerangkat = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await client.get('/perangkat-desa', { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.status === true) {
                setPerangkat(res.data.data.perangkatDesa);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitForm = async () => {
        const payload = { photo: file, nama: nama, jabatan: jabatan };

        try {
            const token = localStorage.getItem('token');
            const res = await client.post('/perangkat-desa', payload, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
            });
            if (res.data.status === true) {
                toast.success('Perangkat Desa Berhasil Ditambahkan!');
                setNama(null);
                setJabatan(null);
                setFile(null);
                setTimeout(() => {
                    navigate('/perangkat-desa');
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(res.data.message);
                navigate('/perangkat-desa');
            }
        } catch (error) {
            toast.error('Internal Server Error');
            console.log(error);
        }
    };

    const handelDelete = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Perangkat',
            text: 'Apakah Anda Yakin Menghapus Perangkat Ini?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                const res = await client.delete(`/perangkat-desa/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.status === true) {
                    Swal.fire('Perangkat Berhasil Dihapus!', '', 'success');
                    window.location.reload();
                } else {
                    Swal.fire('Perangkat Gagal Dihapus!', '', 'info');
                    console.log(res.data.message);
                }
            } else if (result.isDenied) {
                Swal.fire('Perangkat Gagal Dihapus!', '', 'info');
            }
        });
    };

    const columns = [
        {
            name: '#',
            width: '3rem',
            cell: (row) => row.id,
        },
        {
            name: 'Action',
            width: '8rem',
            center: true,
            cell: (row) => (
                <div className="flex gap-x-2">
                    <Link to={`/perangkat-desa/${row.id}`}>
                        <span className=" text-white font-semibold">
                            <BiPencil className="bg-meta-3 w-8 h-8 p-2 rounded-md" />
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
            name: 'Nama Lengkap',
            selector: (row) => row.nama,
        },
        {
            name: 'Foto',
            width: '10rem',
            center: true,
            cell: (row) => <img src={row.photo} className="w-25 h-15" alt="Foto Perangkat" />,
        },
        {
            name: 'Jabatan',
            width: '15rem',
            center: true,
            selector: (row) => row.jabatan,
        },
    ];

    useEffect(() => {
        fetchPerangkat();
    }, []);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Daftar Perangkat Desa</h1>
            <div className="mb-5">
                <button
                    className="flex items-center px-3 py-2 bg-meta-3 text-white font-medium rounded"
                    onClick={() => setModalOpen(!modalOpen)}
                >
                    <BiPlus className="me-1" />
                    Tambah Perangkat Desa
                </button>
            </div>
            <ModalPerangkat
                showModal={modalOpen}
                setShowModal={handleModal}
                setFile={handleFile}
                setNama={handleNama}
                setJabatan={handleJabatan}
                handleSubmit={submitForm}
                title={'Tambah'}
            />
            <div>
                <Table columns={columns} data={perangkat} />
            </div>
        </section>
    );
};

export default PerangkatDesa;
