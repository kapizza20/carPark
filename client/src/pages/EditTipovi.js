import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchTipovi, updateTipovi } from "../actions";
import NewTipoviForm from "../components/NewTipoviForm";
import _ from 'lodash';

class EditTipovi extends React.Component{

    componentDidMount(){
        this.props.fetchTipovi(this.props.params.id);
        //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateTipovi(this.props.params.id, formValues);
        this.props.navigate('/tipovi');
    }

    render(){
        if(!this.props.tip){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Izmena marke</h3>
            <NewTipoviForm initialValues={_.pick(this.props.tip,'NazivTipa')}
             onSubmit={this.onSubmit}/>
         </div>
         
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    tip: state.tipovi[ownProps.params.id]
    }
}

export default withRouter(connect(mapStateToProps,{fetchTipovi,updateTipovi})(EditTipovi));