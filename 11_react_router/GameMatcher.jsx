import React, { Component } from 'react';
import NumberBaseball from '../5_react_props/NumberBaseballClass';
import RSP from '../7_react_lifecycle(useEffectHighOrder)/RSP';
import Lotto from '../8_react_useEffectmemo/Lotto';

class GameMatcher extends Component {
  render() {
    // history, location, match가 들어가있음 Route component에 의해서
    // history: browser의 동작에 대한 기록, 실제 browser의 기록이 잘못될수 있기때문
    // match: params 정보가 담겨있음
    // location: pathname 등이 저장돼 있음
    console.log(this.props);
    // URLSearchParams: queryString의 key, value를 추출
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('hello'));
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />;
    } else if (this.props.match.params.name === 'lotto') {
      return <Lotto />;
    }
    return <div>일치하는 게임이 없음</div>;
  }
}

export default GameMatcher;
