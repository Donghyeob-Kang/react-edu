import React, { memo } from 'react';

// state 미사용 시 functional component로 사용 가능
// * functional component와 Hooks는 다른 개념
// Hooks는 functional component에서 useState & useRef 등을 사용할 수 있는 것
const Ball = memo(({ number }) => {
    // console.log('Ball component rendering check!!!');
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>
            {number}
        </div>
    );
});

export default Ball;
