import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter';
import { fetchMarku,updateMarke } from "../actions";
import NewMarkeForme from "../components/NewMarkeForm";
import _ from 'lodash';

class EditMarke extends React.Component{

    componentDidMount(){
        this.props.fetchMarku(this.props.params.id);
        //console.log(this.props)
    }

    onSubmit=(formValues)=>{
        //console.log(this.props);
        this.props.updateMarke(this.props.params.id, formValues);
        this.props.navigate('/marke');
    }

    render(){
        if(!this.props.marka){
         return <div>Loading...</div>
      }
      return (
         <div className="ui container">
            <h3>Измена марке</h3>
            <NewMarkeForme initialValues={_.pick(this.props.marka,'NazivMarke')}
             onSubmit={this.onSubmit}/>
         </div>
         
      )
   }


}
const mapStateToProps=(state, ownProps)=>{
    return{
    marka: state.marke[ownProps.params.id]
    }
}

export default withRouter(connect(mapStateToProps,{fetchMarku,updateMarke})(EditMarke));