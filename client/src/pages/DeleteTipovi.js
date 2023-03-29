import React from "react";
import Modal from "../components/Modal";
import { fetchTip, deleteTipovi} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteTipovi extends React.Component{
   componentDidMount(){
      this.props.fetchTip(this.props.params.id)
   }

   renderContent(){
      if(!this.props.tip){
         return 'Loading...'
      }
      return `Да ли сте сигурни да желите да обришете: ${this.props.tip.NazivTipa}?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteTipovi(id);this.props.navigate('/tipovi');}} className="ui button negative">Обриши</button>
         <Link to={'/tipovi'} className="ui button">Одустани</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Обриши тип:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/tipovi')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {tip: state.tipovi[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchTip, deleteTipovi})(DeleteTipovi));