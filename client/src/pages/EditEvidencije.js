import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchEvidencija,fetchVozaci,fetchVozila,updateEvidencije} from "../actions";
import NewEvidencijeForm from "../components/NewEvidencijeForm";
import _ from 'lodash';

class EditEvidencije extends React.Component{

    componentDidMount=async ()=>{
      await this.props.fetchVozaci();
      await this.props.fetchVozila();
      await this.props.fetchEvidencija(this.props.params.id);
       //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateEvidencije(this.props.params.id, formValues);
        this.props.navigate('/evidencije');
    }

    render(){
        if(!this.props.evidencija){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Izmena евиденције</h3>
            <NewEvidencijeForm vozila={this.props.vozila} vozaci={this.props.vozaci} initialValues={_.pick(this.props.evidencija,['BrojNaloga','DatumIzlaska','DatumPovratka','IDVozaca','IDVozila'])}
             onSubmit={this.onSubmit}/>
         </div>
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    evidencija: state.evidencije[ownProps.params.id],
    vozaci: Object.values(state.vozaci),
    vozila: Object.values(state.vozila)
    }
}

export default withRouter(connect(mapStateToProps,{fetchEvidencija,fetchVozaci,fetchVozila,updateEvidencije})(EditEvidencije));