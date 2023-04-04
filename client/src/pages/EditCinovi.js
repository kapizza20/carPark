import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchCin,updateCinovi } from "../actions";
import NewCinoviForm from "../components/NewCinoviForm";
import _ from 'lodash';

class EditCinovi extends React.Component{

    componentDidMount(){
        this.props.fetchCin(this.props.params.id);
        //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateCinovi(this.props.params.id, formValues);
        this.props.navigate('/cinovi');
    }

    render(){
        if(!this.props.cin){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Измена чина</h3>
            <NewCinoviForm initialValues={_.pick(this.props.cin,'NazivCina')}
             onSubmit={this.onSubmit}/>
         </div>
         
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    cin: state.cinovi[ownProps.params.id]
    }
}

export default withRouter(connect(mapStateToProps,{fetchCin,updateCinovi})(EditCinovi));