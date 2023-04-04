import React from "react";
import {connect} from "react-redux"
import { fetchVozaci,fetchCinovi } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeVozaci extends React.Component{
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
  renderAdmin(vozaci){
   return(<td style={{textAlign:"center"}}>
    <Link to={`/vozaci/editvozaci/${vozaci.IDVozaca}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/vozaci/deletevozaci/${vozaci.IDVozaca}`} className="ui button negative">
          Обриши
      </Link>
   </td>
  );
   }

  componentDidMount= async() =>{
    await this.props.fetchCinovi();
    await this.props.fetchVozaci();
    
  }

  renderList=()=>{
    
    let vozaciPerPage=null;
    let reducedVozaci=null;
    if(!this.state.searchWord){
      vozaciPerPage=this.props.vozaci.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedVozaci=this.props.vozaci.filter(
      item=>item.ImeVozaca.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)  ||
      item.PrezimeVozaca.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      item.JMBG.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      item.BrojTel.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      this.props.cinovi.find(e=>e.IDCina===item.IDCina).NazivCina.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)
      );
    //console.log(reducedVozaci);
    vozaciPerPage=reducedVozaci.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return vozaciPerPage.map((item)=>{
    return (
    <tr key={item.IDVozaca}>
      <td>{item.ImeVozaca}</td>
      <td>{item.PrezimeVozaca}</td>
      <td>{item.JMBG}</td>
      <td>{item.BrojTel}</td>
      <td>{this.props.cinovi ? this.props.cinovi.find(e=>e.IDCina===item.IDCina).NazivCina : "Loading..."}</td>
      {this.renderAdmin(item)}
    </tr>
    )
  })
}
// <td>{this.state.statusi.find(e=>vozilo.IDStatusa==e.IDStatusa).NazivStatusa}</td>

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.vozaci.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.vozaci.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/vozaci/createvozaci">Унеси новог возача</Link>
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
          <th style={{textAlign:"center"}}>Име</th>
          <th style={{textAlign:"center"}}>Презиме</th>
          <th style={{textAlign:"center"}}>ЈМБГ</th>
          <th style={{textAlign:"center"}}>Број телефона</th>
          <th style={{textAlign:"center"}}>Чин</th>
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
    vozaci: Object.values(state.vozaci),
    cinovi: Object.values(state.cinovi),
  }
}

export default connect(mapStateToProps,{ fetchCinovi,fetchVozaci })(HomeVozaci);