import React from 'react';
import {connect} from "react-redux";
import {createCinovi} from '../actions';
import NewCinoviForm from '../components/NewCinoviForm';
import withRouter from '../components/WithRouter';


class CreateCinovi extends React.Component{
    onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      this.props.createCinovi(formValues);
      this.props.navigate('/cinovi');
    }

   

    render(){
        return (
        <div className='ui container'>
         <h3>Нови чин</h3>
         <NewCinoviForm onSubmit={this.onSubmit}></NewCinoviForm>
        </div>
      )
    }
}

export default withRouter(connect(null,{createCinovi})(CreateCinovi));