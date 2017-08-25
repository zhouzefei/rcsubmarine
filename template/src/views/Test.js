import { Component } from 'react';
import styles from './Test.scss';
//集成antd-mobile
import { Flex } from 'antd-mobile';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commonAction } from './../actions/test';

//路由你可以go,goBack,聪明的你一定知道怎么使用
import { goBack } from 'react-router-redux';

//子组件引入
import TestComponent from './../components/TestComponent';
class Test extends Component{
  constructor(props){
    super(props);
  };
  changeData(){
    var dataStr = '变成一个随机数'+Math.random().toFixed(3);
    const { actions } = this.props;
    actions.commonAction('testData',dataStr);
  };
  render(){
    const { testData } = this.props;
    return (
      <div className="title">
        晴天告诉你这只是个demo
        <TestComponent data={ '《给你传个值，不知道写啥》' }/>
        <br/>
        <Flex>这个是来自state的值《{ testData }》</Flex>
        <div  onClick={ this.changeData.bind(this) } className="btn">
            改变state的值
        </div>
      </div>
    )
  }
};
function mapStateToProps(state) {
  return state.test;
};
const mapActionToProps = (dispatch) => ({
  actions: bindActionCreators({ commonAction }, dispatch)
});
export default connect(mapStateToProps,mapActionToProps)(Test);
