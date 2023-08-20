import DataTable from 'react-data-table-component';

const TableMaster = ({ columns, data }) => {
    const customStyleTable = {
        headRow: {
            style: {
                backgroundColor: '#0f172a',
                color: '#fff',
            },
        },
        cells: {
            style: {
                border: '1px solid black',
            },
        },
    };

    return <DataTable columns={columns} data={data} customStyles={customStyleTable} pagination />;
};

export default TableMaster;
