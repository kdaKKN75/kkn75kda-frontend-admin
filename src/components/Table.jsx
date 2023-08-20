import DataTable from 'react-data-table-component';
import ExpandTable from './ExpandTable';

const Table = ({ expandTable = false, columns, data }) => {
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

    return (
        <div className="shadow border border-gray rounded-t-lg p-3">
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
