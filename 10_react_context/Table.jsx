import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = () => {
    // TableContext.Provider의 value.tableData가 넘어오는거임
    const { tableData } = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length)
                .fill()
                .map((tr, i) => (
                    <Tr rowIndex={i} />
                ))}
        </table>
    );
};
export default memo(Table);
