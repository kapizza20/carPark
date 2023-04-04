import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchCinovi,updateVozaci,fetchVozaca} from "../actions";
import NewVozaciForm from "../components/NewVozaciForm";
import _ from 'lodash';

class EditVozaci extends React.Component{

    componentDidMount=async ()=>{
      await this.props.fetchCinovi();
      await this.props.fetchVozaca(this.props.params.id);
       //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateVozaci(this.props.params.id, formValues);
        this.props.navigate('/vozaci');
    }

    render(){
        if(!this.props.vozac){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Izmena возача</h3>
            <NewVozaciForm cinovi={this.props.cinovi} initialValues={_.pick(this.props.vozac,['ImeVozaca','PrezimeVozaca','JMBG','BrojTel','IDCina'])}
             onSubmit={this.onSubmit}/>
         </div>
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    vozac: state.vozaci[ownProps.params.id],
    cinovi: Object.values(state.cinovi)
    }
}

export default withRouter(connect(mapStateToProps,{fetchCinovi,fetchVozaca,updateVozaci})(EditVozaci));