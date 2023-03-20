import React from 'react';
import {connect} from "react-redux";
import {createMarke} from '../actions';
import NewMarkeForm from '../components/NewMarkeForm';

class CreateMarke extends React.Component{
    onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      this.props.createMarke(formValues);
    }

    render(){
        return (
        <div className='ui container'>
         <h3>Nova marka</h3>
         <NewMarkeForm onSubmit={this.onSubmit}></NewMarkeForm>
        </div>
      )
    }
}

export default connect(null,{createMarke})(CreateMarke);