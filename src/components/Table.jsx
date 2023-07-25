import DataTable from 'react-data-table-component';
import ExpandTable from './ExpandTable';

const Table = ({ expandTable = true, columns, data }) => {
    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1,
            style: {
                maxWidth: '10px',
            },
        },
        {
            name: 'Nama Lengkap',
            selector: (row) => row.namaLengkap,
        },
        {
            name: 'NIK',
            selector: (row) => row.nik,
        },
        {
            name: 'Tempat Lahir',
            selector: (row) => row.tempatLahir,
        },
    ];

    const data = [
        {
            namaLengkap: 'Test 1',
        },
        {
            namaLengkap: 'Test 2',
        },
        {
            namaLengkap: 'Test 3',
        },
    ];

    const customStyleTable = {
        headRow: {
            style: {
                backgroundColor: '#0f172a',
                color: '#fff',
            },
        },
    };

    return (
        <div className="shadow border border-gray rounded-lg">
            {expandTable ? (
                <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyleTable}
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandTable}
                />
            ) : (
                <DataTable columns={columns} data={data} customStyles={customStyleTable} pagination />
            )}
        </div>
    );
};

export default Table;
