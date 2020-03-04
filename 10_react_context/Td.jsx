import React, { useContext, useCallback, memo } from 'react';
import {
    CLICK_MINE,
    CODE,
    FLAG_CELL,
    NORMALIZE_CELL,
    OPEN_CELL,
    QUESTION_CELL,
    TableContext,
} from './MineSearch';

const getTdStyle = code => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = code => {
    console.log('getTdText rendered');
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback(
        e => {
            e.preventDefault();
            if (halted) {
                return;
            }
            switch (tableData[rowIndex][cellIndex]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                    return;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                    return;
                default:
                    return;
            }
        },
        [tableData[rowIndex][cellIndex], halted],
    );

    console.log('td rendered');

    return (
        <RealTd
            onClickTd={onClickTd}
            onRightClickTd={onRightClickTd}
            data={tableData[rowIndex][cellIndex]}
        />
    );
};

const RealTd = React.memo(({ onClickTd, onRightClickTd, data }) => {
    console.log('RealTd rendered');
    return (
        // onContextMenu mouse right click event
        <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
            {getTdText(data)}
        </td>
    );
});

export default memo(Td);
