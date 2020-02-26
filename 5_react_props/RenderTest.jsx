import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
    };

    // setState가 호출되면 값의 변경이 없어도 rendering됨
    onClick = () => {
        this.setState({});
    };

    render() {
        console.log('rendering', this.state);
        return (
            <div>
                <button onClick={this.onClick}>click</button>
            </div>
        );
    }
}

export default Test;
