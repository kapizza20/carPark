import React from "react";
import Modal from "../components/Modal";
import { fetchMarku, deleteMarke} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteMarke extends React.Component{
   componentDidMount(){
      this.props.fetchMarku(this.props.params.id)
   }

   renderContent(){
      if(!this.props.marka){
         return 'Loading...'
      }
      return `Da li ste sigurni da zelite da obrisete: ${this.props.marka.NazivMarke}?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteMarke(id);this.props.navigate('/marke');}} className="ui button negative">Delete</button>
         <Link to={'/marke'} className="ui button">Cancel</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Obrisi marku vozila:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/marke')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {marka: state.marke[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchMarku, deleteMarke})(DeleteMarke));