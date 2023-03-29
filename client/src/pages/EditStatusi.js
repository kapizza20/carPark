import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchStatus, updateStatusi } from "../actions";
import NewStatusiForm from "../components/NewStatusiForm";
import _ from 'lodash';

class EditStatusi extends React.Component{

    componentDidMount(){
        this.props.fetchStatus(this.props.params.id);
        //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateStatusi(this.props.params.id, formValues);
        this.props.navigate('/statusi');
    }

    render(){
        if(!this.props.status){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Измена статуса</h3>
            <NewStatusiForm initialValues={_.pick(this.props.status,'NazivStatusa')}
             onSubmit={this.onSubmit}/>
         </div>
         
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    status: state.statusi[ownProps.params.id]
    }
}

export default withRouter(connect(mapStateToProps,{fetchStatus,updateStatusi})(EditStatusi));