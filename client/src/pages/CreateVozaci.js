import React from 'react';
import {connect} from "react-redux";
import {createVozaci,fetchCinovi} from '../actions';
import NewVozaciForm from '../components/NewVozaciForm';
import withRouter from '../components/WithRouter';

class CreateVozaci extends React.Component{
  componentDidMount=async()=>{
    await this.props.fetchCinovi();
  }

  onSubmit=(formValues)=>{
    //formValues sadrzi sve podatke forme sa njihovim name propertijem
    //console.log(formValues);
    this.props.createVozaci(formValues);
    this.props.navigate('/vozaci');
  }

  render(){
      return (
      <div className='ui container'>
      <h3>Нови возач</h3>
      <NewVozaciForm onSubmit={this.onSubmit} cinovi={this.props.cinovi}/>
      </div>
    )
    }
}

const mapStateToProps=(state)=>{
  return{
    cinovi: Object.values(state.cinovi),
    }
}

export default withRouter(connect(mapStateToProps,{createVozaci,fetchCinovi})(CreateVozaci));