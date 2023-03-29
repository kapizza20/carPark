import React from "react";
import {connect} from "react-redux"
import { fetchVozila } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeVozila extends React.Component{
  state={itemOffset:0,
  endOffSet:10,
  searchWord:""
  };
  // useEffect(()=>{
  //     axios.get('http://localhost:3001/marke')
  //         .then((response)=>{
  //             setListOfMarke(response.data);
  //         })
  // },[]);
  renderAdmin(vozila){
   return(<td style={{textAlign:"center"}}>
    <Link to={`/vozila/editvozila/${vozila.IDVozila}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/vozila/deletevozila/${vozila.IDVozila}`} className="ui button negative">
          Обриши
      </Link>
   </td>
  );
   }

  componentDidMount(){
    this.props.fetchVozila();
  }

  renderList=()=>{
    
    let vozilaPerPage=null;
    let reducedvozila=null;
    if(!this.state.searchWord){
      vozilaPerPage=this.props.vozila.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedvozila=this.props.vozila.filter(item=>item.OznakaTablica.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`));
    //console.log(reducedvozila);
    vozilaPerPage=reducedvozila.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return vozilaPerPage.map((vozilo)=>{
    return (
    <tr key={vozilo.IDVozila} className="error">
      <td>{vozilo.OznakaTablica}</td>
      <td>{vozilo.VINBroj}</td>
      {this.renderAdmin(vozilo)}
    </tr>
    )
  })
}

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.vozila.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.vozila.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/vozila/createvozila">Унеси нови тип</Link>
    </div>
    </div>
    <div className="ui search">
    <div className="ui label">
      Унесите појам за претрагу:
      </div>
      <input value={this.state.searchWord} onChange={(e) => {this.setState({searchWord:`${e.target.value}`})}} className="prompt" type="text" placeholder="Претрага..."></input>
      <i className="search icon"></i>
      <button onClick={this.onSearchSubmit()} className="ui button" type="submit" >Претражи</button>
    </div>
    <table className="ui selectable celled table">
      <thead>
        <tr>
          <th style={{textAlign:"center"}}>Регистрациона ознака</th>
          <th style={{textAlign:"center"}}>VIN број</th>
          <th style={{textAlign:"center"}}>Функције</th>
        </tr>
      </thead>
      <tbody>
        {this.renderList()}
      </tbody>
    </table>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactPaginate 
      breakLabel="..."
      nextLabel=">>"
      onPageChange={this.handlePageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="<<"
      renderOnZeroPageCount={null}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
      />
    </div>
    </div>
    )  
  }

}

const mapStateToProps=(state)=>{
  return{
    vozila: Object.values(state.vozila)
  }
}

export default connect(mapStateToProps,{ fetchVozila })(HomeVozila);