import React from "react";
import Modal from "../components/Modal";
import { fetchStatus, deleteStatusi} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteStatusi extends React.Component{
   componentDidMount(){
      this.props.fetchStatus(this.props.params.id)
   }

   renderContent(){
      if(!this.props.status){
         return 'Loading...'
      }
      return `Да ли сте сигурни да желите да обришете: ${this.props.status.NazivStatusa}?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteStatusi(id);this.props.navigate('/statusi');}} className="ui button negative">Обриши</button>
         <Link to={'/statusi'} className="ui button">Одустани</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Обриши статус возила:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/statusi')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {status: state.statusi[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchStatus, deleteStatusi})(DeleteStatusi));