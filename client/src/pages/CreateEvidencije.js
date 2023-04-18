import React from 'react';
import {connect} from "react-redux";
import {createEvidencije,fetchVozaci,fetchVozila} from '../actions';
import NewEvidencijeForm from '../components/NewEvidencijeForm';
import withRouter from '../components/WithRouter';

class CreateVozila extends React.Component{
  componentDidMount=async()=>{
    await this.props.fetchVozaci();
    await this.props.fetchVozila();
  }

  onSubmit=(formValues)=>{
    //formValues sadrzi sve podatke forme sa njihovim name propertijem
    //console.log(formValues);
    this.props.createEvidencije(formValues);
    this.props.navigate('/evidencije');
  }

  render(){
      return (
      <div className='ui container'>
      <h3>Нова евиденција</h3>
      <NewEvidencijeForm onSubmit={this.onSubmit} vozila={this.props.vozila} vozaci={this.props.vozaci}/>
      </div>
    )
    }
}

const mapStateToProps=(state)=>{
  return{
    vozaci: Object.values(state.vozaci),
    vozila:Object.values(state.vozila)
    }
}

export default withRouter(connect(mapStateToProps,{createEvidencije,fetchVozaci,fetchVozila})(CreateVozila));