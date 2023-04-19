import React from "react";
import {connect} from "react-redux"
import { fetchTipovi } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeTipovi extends React.Component{
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
  renderAdmin(tipovi){
   return(
     <td style={{textAlign:"center"}}>
      <Link to={`/tipovi/editTipovi/${tipovi.IDTipa}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/tipovi/deleteTipovi/${tipovi.IDTipa}`} className="ui button negative">
          Обриши
      </Link>
    </td>
  );
   }

  componentDidMount(){
    this.props.fetchTipovi();
  }

  renderList=()=>{
    
    let tipoviPerPage=null;
    let reducedTipovi=null;
    if(!this.state.searchWord){
      tipoviPerPage=this.props.tipovi.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedTipovi=this.props.tipovi.filter(item=>item.NazivTipa.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`));
    //console.log(reducedTipovi);
    tipoviPerPage=reducedTipovi.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return tipoviPerPage.map((tip)=>{
    return (
    <tr key={tip.IDTipa}>
      <td>{tip.NazivTipa}</td>
      {this.renderAdmin(tip)}
    </tr>
    )
  })
}

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.tipovi.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.tipovi.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/tipovi/createTipovi">Унеси нови тип</Link>
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
          <th style={{textAlign:"center"}}>Назив типа</th>
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
    tipovi: Object.values(state.tipovi)
  }
}

export default connect(mapStateToProps,{ fetchTipovi })(HomeTipovi);