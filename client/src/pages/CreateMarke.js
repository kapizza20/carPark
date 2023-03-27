import React from 'react';
import {connect} from "react-redux";
import {createMarke} from '../actions';
import NewMarkeForm from '../components/NewMarkeForm';
import withRouter from '../components/WithRouter';


class CreateMarke extends React.Component{
    onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      this.props.createMarke(formValues);
      this.props.navigate('/marke');
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

export default withRouter(connect(null,{createMarke})(CreateMarke));