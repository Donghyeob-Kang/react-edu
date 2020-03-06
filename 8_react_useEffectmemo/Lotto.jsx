// import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

// const Lotto = () => {
//     const [winBalls, setWinBalls] = useState([]);
//     // useMemo는 function return 값을 기억한다 []안에 값이 바뀌기 전까지
//     const lottoNumbers = useMemo(() => getWinNumbers(), []);
//     const [winNumbers, setWinNumbers] = useState(lottoNumbers);
//     const [bonus, setBonus] = useState(null);
//     const [redo, setRedo] = useState(false);
//     const timeouts = useRef([]);

//     // componentDidMount만 하고싶을때
//     // useEffect(() => {
//     //     // axios
//     // }, [])

//     // componentDidUpdate만 하고싶을때
//     // const mounted = useRef(false)
//     // useEffect(() => {
//     //     if (!mounted.current) {
//     //     mounted.current = true
//     // } else {
//     //     axios
//     // }
//     // }, [바뀌는 값])

//     useEffect(() => {
//         console.log('use Effect');
//         for (let i = 0; i < winNumbers.length - 1; i++) {
//             timeouts.current[i] = setTimeout(() => {
//                 setWinBalls(prevWinBalls => {
//                     return [...prevWinBalls, winNumbers[i]];
//                 });
//             }, (i + 1) * 1000);
//         }
//         timeouts.current[6] = setTimeout(() => {
//             setBonus(winNumbers[6]);
//             setRedo(true);
//         }, 7000);
//         return () => {
//             // return 자리는 componentWillUnmount
//             timeouts.current.forEach(v => {
//                 clearTimeout(v);
//             });
//         };
//     }, [timeouts.current]); // 빈 배열이면 componentDidMount
//     // 배열에 값이 있으면 componentDidUpdate

//     const runTimeouts = () => {
//         console.log('runTimeouts function');
//         for (let i = 0; i < winNumbers.length - 1; i++) {
//             timeouts.current[i] = setTimeout(() => {
//                 setWinBalls(prevWinBalls => {
//                     return {
//                         winBalls: [...prevWinBalls, winNumbers[i]],
//                     };
//                 });
//             }, (i + 1) * 1000);
//         }
//         timeouts.current[6] = setTimeout(() => {
//             setBonus(winNumbers[6]);
//             setRedo(true);
//         }, 7000);
//     };

//     // useCallback은 function 자체를 기억한다 []안에 값이 바뀌기 전까지
//     const onClickRedo = useCallback(() => {
//         console.log('onClickRedo');
//         console.log(winNumbers);
//         setWinNumbers(getWinNumbers());
//         setWinBalls([]);
//         setBonus(null);
//         setRedo(false);
//         timeouts.current = [];
//     }, [winNumbers]); // useCallback또한 param 중 배열에 변경될 값을 넣어줘야함

//     return (
//         <>
//             <div>당첨 숫자</div>
//             <div id="resultWindow">
//                 {winBalls.map(v => (
//                     <Ball key={v} number={v} />
//                 ))}
//             </div>
//             <div>보너스!</div>
//             {/* && 조건문, 앞에 인자가 참이 아니면 모두 실행이 안됨 */}
//             {bonus && <Ball number={bonus} />}
//             {redo && <button onClick={onClickRedo}>한 번 더!</button>}
//         </>
//     );
// };

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts function');
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    // console.log('DidMount');
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('DidUpdate');
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach(v => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    console.log('re-rendering');
    return (
      <>
        <div>당첨 숫자</div>
        <div id="resultWindow">
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {/* && 조건문, 앞에 인자가 참이 아니면 모두 실행이 안됨 */}
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
