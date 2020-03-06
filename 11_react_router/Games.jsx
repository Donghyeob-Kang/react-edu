import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        {/* layout area */}
        <Link to="/game/number-baseball?query=10&hello=dong&bye=react">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto">로또</Link>
        &nbsp;
        <Link to="/game/index">게임게임</Link>
      </div>
      <div>
        <Route path="/game/:name" component={GameMatcher} />
        {/* props 넘길 때 render() 사용 */}
        {/* <Route path="/game/:name" render={(props) => <GameMatcher props={props.abc} />} /> */}

        {/*
          <Route path="/" component={GameMatcher} />
          <Route path="/game/:name" component={GameMatcher} />
          위와 같이 '/'와 같이 정적 라우팅과 동적 라우팅이 같이 있으면 /game/:name의 주소라도 '/'도 일치한다고 처리함
          때문에, <Route exact path="/" component={GameMatcher} />와 같이 exact를 붙이면 path와 정확히 일치할때만 처리함

          <Switch>는 일치하는 라우팅 중 제일 첫번째 라우팅을 처리함
          <Switch>
              <Route path="/game/:name" component={GameMatcher} />
              <Route path="/game/exact" component={GameMatcher} />
          </Switch>
        */}
      </div>
    </BrowserRouter>
  );
};

export default Games;
