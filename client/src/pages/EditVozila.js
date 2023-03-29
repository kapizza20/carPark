import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchMarke,fetchStatusi,fetchTipovi,fetchVozilo,updateVozila} from "../actions";
import NewVozilaForm from "../components/NewVozilaForm";
import _ from 'lodash';

class EditVozila extends React.Component{

    componentDidMount=async ()=>{
      await this.props.fetchVozilo(this.props.params.id);
      await this.props.fetchMarke();
      await this.props.fetchStatusi();
      await this.props.fetchTipovi();
       //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateVozila(this.props.params.id, formValues);
        this.props.navigate('/vozila');
    }

    render(){
        if(!this.props.vozilo){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Izmena возила</h3>
            <NewVozilaForm marke={this.props.marke} tipovi={this.props.tipovi} statusi={this.props.statusi} initialValues={_.pick(this.props.vozilo,['OznakaTablica','VINBroj','IDMarkeVozila','IDStatusa','IDTipa'])}
             onSubmit={this.onSubmit}/>
         </div>
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    vozilo: state.vozila[ownProps.params.id],
    marke: Object.values(state.marke),
    statusi: Object.values(state.statusi),
    tipovi: Object.values(state.tipovi)
    }
}

export default withRouter(connect(mapStateToProps,{fetchMarke,fetchStatusi,fetchTipovi,fetchVozilo,updateVozila})(EditVozila));