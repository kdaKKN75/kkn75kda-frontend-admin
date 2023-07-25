/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Table from '../components/Table';
import client from '../api/axios';

const ListResident = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchData = async () => {
        try {
            const res = await client.get('/daftar-penduduk');
            const data = res.data.data;
            const filterData = data.filter((penduduk) => {
                penduduk.name.includes(filter);
            });
            setData(filterData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [data, filter]);

    console.log(filter);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-5">Daftar Penduduk</h1>
            <div className="flex justify-start items-center mb-2 sm:justify-end">
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
            <Table />
        </section>
    );
};

export default ListResident;
