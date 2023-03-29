import React from 'react';
import {connect} from "react-redux";
import {createVozila,fetchMarke,fetchStatusi,fetchTipovi} from '../actions';
import NewVozilaForm from '../components/NewVozilaForm';
import withRouter from '../components/WithRouter';

class CreateVozila extends React.Component{
  componentDidMount=async()=>{
    await this.props.fetchMarke();
    await this.props.fetchStatusi();
    await this.props.fetchTipovi();
  }

  onSubmit=(formValues)=>{
    //formValues sadrzi sve podatke forme sa njihovim name propertijem
    //console.log(formValues);
    this.props.createVozila(formValues);
    this.props.navigate('/vozila');
  }

  render(){
      return (
      <div className='ui container'>
      <h3>Новo возило</h3>
      <NewVozilaForm onSubmit={this.onSubmit} marke={this.props.marke} tipovi={this.props.tipovi} statusi={this.props.statusi}/>
      </div>
    )
    }
}

const mapStateToProps=(state)=>{
  return{
    marke: Object.values(state.marke),
    statusi:Object.values(state.statusi),
    tipovi:Object.values(state.tipovi)
    }
}

export default withRouter(connect(mapStateToProps,{createVozila,fetchMarke,fetchStatusi,fetchTipovi})(CreateVozila));