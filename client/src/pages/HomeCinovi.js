import React from "react";
import {connect} from "react-redux"
import { fetchCinovi } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeCinovi extends React.Component{
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
  renderAdmin(cinovi){
   return(
     <td style={{textAlign:"center"}}>
      <Link to={`/cinovi/editcinovi/${cinovi.IDCina}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/cinovi/deletecinovi/${cinovi.IDCina}`} className="ui button negative">
          Обриши
      </Link>
    </td>
  );
   }

  componentDidMount(){
    this.props.fetchCinovi();
  }

  renderList=()=>{
    let cinoviPerPage=null;
    let reducedcinovi=null;
    //uzmes searchword sortiras cinovi i lupis slice
    if(!this.state.searchWord){
      cinoviPerPage=this.props.cinovi.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedcinovi=this.props.cinovi.filter(item=>item.NazivCina.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`));
    console.log(reducedcinovi);
    cinoviPerPage=reducedcinovi.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return cinoviPerPage.map((cin)=>{
    return (
    <tr key={cin.IDCina} className="">
      <td>{cin.NazivCina}</td>
      {this.renderAdmin(cin)}
    </tr>
    )
  })
}

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.cinovi.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.cinovi.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/cinovi/createcinovi">Унеси нови чин</Link>
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
          <th style={{textAlign:"center"}}>Назив чина</th>
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
    cinovi: Object.values(state.cinovi)
  }
}

export default connect(mapStateToProps,{ fetchCinovi })(HomeCinovi);