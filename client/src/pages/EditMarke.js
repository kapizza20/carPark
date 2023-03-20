import React from "react";
import { connect } from "react-redux";
import withRouter from '../components/WithRouter'

class EditMarke extends React.Component{

    componentDidMount(){
        console.log(this.props.params.id);
        console.log(this.props);
    }

    render(){
        return <div>EDIT</div>
    }
}

const mapStateToProps=(state, ownProps)=>{
    return{
    marka: state.marke[ownProps.params.id]
    }
}

export default withRouter(connect(mapStateToProps,{})(EditMarke));