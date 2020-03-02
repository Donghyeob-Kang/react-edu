import React from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData, dispatch }) => {
    console.log('table rendered');

    return (
        <table>
            <tbody>
                {Array(tableData.length)
                    .fill()
                    .map((tr, i) => (
                        <Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />
                    ))}
            </tbody>
        </table>
    );
};

export default React.memo(Table);
