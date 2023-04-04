import React from "react";
import Modal from "../components/Modal";
import { fetchCin, deleteCinovi} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import withRouter from '../components/WithRouter';

class DeleteCinovi extends React.Component{
   componentDidMount(){
      this.props.fetchCin(this.props.params.id)
   }

   renderContent(){
      if(!this.props.cin){
         return 'Loading...'
      }
      return `Да ли сте сигурни да желите да обришете: ${this.props.cin.NazivCina}?`
   }

   renderActions(){
      const id=this.props.params.id;
      return(
      <React.Fragment>
         <button onClick={()=>{this.props.deleteCinovi(id);this.props.navigate('/cinovi');}} className="ui button negative">Обриши</button>
         <Link to={'/cinovi'} className="ui button">Одустани</Link>
      </React.Fragment>)
   }

   render(){
      return (
         <Modal
            title="Обриши чин:"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> this.props.navigate('/cinovi')}
         />
      );
   };
}

const mapStateToProps=(state, ownProps)=>{
   return {cin: state.cinovi[ownProps.params.id]}
};

export default withRouter(connect(mapStateToProps,{fetchCin, deleteCinovi})(DeleteCinovi));