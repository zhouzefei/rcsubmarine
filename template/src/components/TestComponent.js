import { Component } from 'react';
import styles from './TestComponent.scss';
class TestComponent extends Component{
  constructor(props){
    super(props);
  };
  render(){
    const { data } = this.props;
    return (
      <div>
          这是一个子组件，这个值是父组件给我的-><span className="red">{data}</span>
      </div>
    )
  }
};
export default TestComponent;
