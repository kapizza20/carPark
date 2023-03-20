import React from "react";
import {connect} from "react-redux"
import { fetchMarke } from "../actions";
import {Link} from "react-router-dom";


class Home extends React.Component{
  // useEffect(()=>{
  //     axios.get('http://localhost:3001/marke')
  //         .then((response)=>{
  //             setListOfMarke(response.data);
  //         })
  // },[]);
  renderAdmin(marke){
   return(
     <div className="right floated content">
      <Link to={`/marke/editMarke/${marke.IDMarkeVozila}`} className="ui button primary">
          Izmeni
      </Link>
      <Link to={`/marke/deleteMarke/${marke.IDMarkeVozila}`} className="ui button negative">
          Obrisi
      </Link>
    </div>
  );
   }

  componentDidMount(){
    this.props.fetchMarke();
  }

  renderList(){
    return this.props.marke.map((marka)=>{
    return (
    <tr key={marka.IDMarkeVozila} className="error">
      <td>{marka.NazivMarke}</td>
      <td>{marka.updatedAt}</td>
      <td className="error"><i className="attention icon"></i> Classified</td>
      {this.renderAdmin(marka)}
    </tr>
    
    )
  })
}

  render (){
    return(
    <div className="ui container">
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {this.renderList()}
      </tbody>
    </table>
    </div>
    )  
  }

}
const mapStateToProps=(state)=>{
  return{
    marke: Object.values(state.marke)
  }
}

export default connect(mapStateToProps,{ fetchMarke })(Home);