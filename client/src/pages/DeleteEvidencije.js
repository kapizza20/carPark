import React from "react";
import Modal from "../components/Modal";
import { fetchEvidencija, deleteEvidencije} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteEvidencije extends React.Component{
   componentDidMount(){
      this.props.fetchEvidencija(this.props.params.id)
   }

   renderContent(){
      if(!this.props.evidencija){
         return 'Loading...'
      }
      return `Да ли сте сигурни да желите да обришете евиденцију?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteEvidencije(id);this.props.navigate('/evidencije');}} className="ui button negative">Обриши</button>
         <Link to={'/evidencije'} className="ui button">Одустани</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Обриши евиденцију:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/evidencije')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {evidencija: state.evidencije[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchEvidencija, deleteEvidencije})(DeleteEvidencije));