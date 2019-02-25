import React, { Component } from 'react';

import { Math } from '../../components/Math';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Math first={6} second={2} operator="+">
          {(first, second, operator, result) => (
            <h3>
              {first}
              {' '}
              {operator}
              {' '}
              {second}
              {' '}
              =
              {' '}
              {result}
            </h3>
          )}
        </Math>
        <Math first={10} second={22} operator="+">
          {(first, second, operator, result) => (
            <h3>
              when we add
              {' '}
              {first}
              {' '}
              with
              {' '}
              {second}
              {' '}
              then we will get
              {' '}
              {result}
              {' '}
              as a result
            </h3>
          )}
        </Math>
        <Math first={6} second={0} operator="/">
          {(first, second, operator, result) => (
            <h3>
              {first}
              {' '}
              {operator}
              {' '}
              {second}
              {' '}
              =
              {' '}
              {result}
            </h3>
          )}
        </Math>
        <Math first={6} second={0} operator="^">
          {(first, second, operator, result) => (
            <h3>
              {first}
              {' '}
              {operator}
              {' '}
              {second}
              {' '}
              =
              {' '}
              {result}
            </h3>
          )}
        </Math>
      </>

    );
  }
}
export default ChildrenDemo;
