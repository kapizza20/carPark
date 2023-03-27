import React from 'react';
import {connect} from "react-redux";
import {createTipovi} from '../actions';
import NewTipoviForm from '../components/NewTipoviForm';
import withRouter from '../components/WithRouter';


class CreateTipovi extends React.Component{
    onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      this.props.createTipovi(formValues);
      this.props.navigate('/tipovi');
    }

   

    render(){
        return (
        <div className='ui container'>
         <h3>Нови тип</h3>
         <NewTipoviForm onSubmit={this.onSubmit}></NewTipoviForm>
        </div>
      )
    }
}

export default withRouter(connect(null,{createTipovi})(CreateTipovi));