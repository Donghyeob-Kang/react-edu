import React, { useState, useRef } from 'react';
// import React, { Component } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작');
    const [result, setResult] = useState([]);
    // 값이 바뀌지만 화면에는 영향을 미치고 싶지 않을때 useRef를 사용
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            // aqua color
            setState('ready');
            setMessage('초록색이 되면 클릭');
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') {
            // red color
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('성급함');
        } else if (state === 'now') {
            // yellowgreen color
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작');
            setResult(prevResult => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0 ? null : (
            <>
                <div>
                    평균 시간:
                    {result.reduce((a, c) => a + c) / result.length}ms
                </div>
                <button onClick={onReset}>Reset</button>
            </>
        );
    };

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

// class ResponseCheck extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작',
//         result: [],
//     };

//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if (state === 'waiting') {
//             // aqua color
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭',
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭',
//                 });
//                 this.startTime = new Date();
//             }, Math.floor(Math.random() * 1000) + 2000);
//         } else if (state === 'ready') {
//             // red color
//             clearTimeout(this.timeout);
//             this.setState({
//                 state: 'waiting',
//                 message: '성급함',
//             });
//         } else if (state === 'now') {
//             // yellowgreen color
//             this.endTime = new Date();
//             this.setState(prevState => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요.',
//                     // array push 할때는 prevState를 사용할 수 있도록 함수형 setState 사용
//                     result: [...prevState.result, this.endTime - this.startTime],
//                 };
//             });
//         }
//     };

//     onReset = () => {
//         this.setState({
//             result: [],
//         });
//     };

//     renderAverage = () => {
//         return this.state.result.length === 0 ? null : (
//             <>
//                 <div>
//                     평균 시간:
//                     {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms
//                 </div>
//                 <button onClick={this.onReset}>Reset</button>
//             </>
//         );
//     };

//     render() {
//         const { state, message } = this.state; // 구조분해

//         return (
//             <>
//                 <div id="screen" className={state} onClick={this.onClickScreen}>
//                     {message}
//                 </div>
//                 {this.renderAverage()}
//             </>
//         );
//     }
// }

export default ResponseCheck;
