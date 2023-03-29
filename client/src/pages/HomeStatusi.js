import React from "react";
import {connect} from "react-redux"
import { fetchStatusi } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeStatusi extends React.Component{
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
  renderAdmin(statusi){
   return(
     <td style={{textAlign:"center"}}>
      <Link to={`/statusi/editstatusi/${statusi.IDStatusa}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/statusi/deletestatusi/${statusi.IDStatusa}`} className="ui button negative">
          Обриши
      </Link>
    </td>
  );
   }

  componentDidMount(){
    this.props.fetchStatusi();
  }

  renderList=()=>{
    
    let StatusiPerPage=null;
    let reducedStatusi=null;
    if(!this.state.searchWord){
      StatusiPerPage=this.props.statusi.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedStatusi=this.props.statusi.filter(item=>item.NazivStatusa.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`));
    //console.log(reducedStatusi);
    StatusiPerPage=reducedStatusi.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return StatusiPerPage.map((tip)=>{
    return (
    <tr key={tip.IDStatusa} className="error">
      <td>{tip.NazivStatusa}</td>
      {this.renderAdmin(tip)}
    </tr>
    )
  })
}

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.statusi.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.statusi.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/Statusi/createStatusi">Унеси нови статус</Link>
    </div>
    </div>
    <div className="ui search">
    <div className="ui label">
      Унесите појам за претрагу:
      </div>
      <input value={this.state.searchWord} onChange={(e) => {this.setState({searchWord:`${e.target.value}`})}} className="prompt" type="text" placeholder="Претрага..."></input>
      <i className="search icon"></i>
      <button onClick={this.onSearchSubmit()} className="ui button" type="submit" >Претражи</button>
      <Link></Link>
    </div>
    <table className="ui selectable celled table">
      <thead>
        <tr>
          <th style={{textAlign:"center"}}>Назив статуса</th>
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
    statusi: Object.values(state.statusi)
  }
}

export default connect(mapStateToProps,{ fetchStatusi })(HomeStatusi);