import React from "react";
import Modal from "../components/Modal";
import { fetchVozilo,deleteVozila} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteVozila extends React.Component{
   componentDidMount(){
      this.props.fetchVozilo(this.props.params.id)
   }

   renderContent(){
      if(!this.props.vozilo){
         return 'Loading...'
      }
      return `Да ли сте сигурни да желите да обришете возило: ознака: ${this.props.vozilo.OznakaTablica} и VIN броја: ${this.props.vozilo.VINBroj}?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteVozila(id);this.props.navigate('/vozila');}} className="ui button negative">Обриши</button>
         <Link to={'/vozila'} className="ui button">Одустани</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Обриши тип:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/vozila')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {vozilo: state.vozila[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchVozilo, deleteVozila})(DeleteVozila));