import React from "react";
import {connect} from "react-redux"
import { fetchMarke } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeMarke extends React.Component{
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
  renderAdmin(marke){
   return(
     <td style={{textAlign:"center"}}>
      <Link to={`/marke/editMarke/${marke.IDMarkeVozila}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/marke/deleteMarke/${marke.IDMarkeVozila}`} className="ui button negative">
          Обриши
      </Link>
    </td>
  );
   }

  componentDidMount(){
    this.props.fetchMarke();
  }

  renderList=()=>{
    
    let markePerPage=null;
    let reducedMarke=null;
    //uzmes searchword sortiras marke i lupis slice
    if(!this.state.searchWord){
      markePerPage=this.props.marke.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedMarke=this.props.marke.filter(item=>item.NazivMarke.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`));
    console.log(reducedMarke);
    markePerPage=reducedMarke.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return markePerPage.map((marka)=>{
    return (
    <tr key={marka.IDMarkeVozila}>
      <td>{marka.NazivMarke}</td>
      {this.renderAdmin(marka)}
    </tr>
    )
  })
}

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.marke.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.marke.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/marke/createMarke">Унеси нову марку</Link>
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
          <th style={{textAlign:"center"}}>Назив марке</th>
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
    marke: Object.values(state.marke)
  }
}

export default connect(mapStateToProps,{ fetchMarke })(HomeMarke);