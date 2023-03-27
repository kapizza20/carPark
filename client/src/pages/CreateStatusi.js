import React from 'react';
import {connect} from "react-redux";
import {createStatusi} from '../actions';
import NewStatusiForm from '../components/NewStatusiForm';
import withRouter from '../components/WithRouter';


class CreateStatusi extends React.Component{
    onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      this.props.createStatusi(formValues);
      this.props.navigate('/statusi');
    }

   

    render(){
        return (
        <div className='ui container'>
         <h3>Нови status</h3>
         <NewStatusiForm onSubmit={this.onSubmit}></NewStatusiForm>
        </div>
      )
    }
}

export default withRouter(connect(null,{createStatusi})(CreateStatusi));