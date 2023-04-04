import React from "react";
import Modal from "../components/Modal";
import { fetchVozaca,deleteVozaci} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteVozaci extends React.Component{
   componentDidMount(){
      this.props.fetchVozaca(this.props.params.id)
   }

   renderContent(){
      if(!this.props.vozac){
         return 'Loading...'
      }
      return `Да ли сте сигурни да желите да обришете возача: ${this.props.vozac.ImeVozaca}  ${this.props.vozac.PrezimeVozaca}, ЈМБГ: ${this.props.vozac.JMBG}?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteVozaci(id);this.props.navigate('/vozaci');}} className="ui button negative">Обриши</button>
         <Link to={'/vozaci'} className="ui button">Одустани</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Обриши возача:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/vozaci')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {vozac: state.vozaci[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchVozaca, deleteVozaci})(DeleteVozaci));