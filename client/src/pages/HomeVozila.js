import React from "react";
import {connect} from "react-redux"
import { fetchVozila,fetchMarke,fetchStatusi,fetchTipovi } from "../actions";
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

  componentDidMount= async() =>{
    await this.props.fetchMarke();
    await this.props.fetchStatusi();
    await this.props.fetchTipovi();
    await this.props.fetchVozila(); 
    
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
    reducedvozila=this.props.vozila.filter(
      item=>item.OznakaTablica.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)  ||
      item.VINBroj.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      this.props.statusi.find(e=>e.IDStatusa===item.IDStatusa)?.NazivStatusa.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      this.props.marke.find(e=>e.IDMarkeVozila===item.IDMarkeVozila)?.NazivMarke.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      this.props.tipovi.find(e=>e.IDTipa===item.IDTipa)?.NazivTipa.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)
      );
    //console.log(reducedvozila);
    vozilaPerPage=reducedvozila.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return vozilaPerPage.map((vozilo)=>{
    return (
    <tr key={vozilo.IDVozila} className={`${this.props.statusi.find(e=>e.NazivStatusa==="Neispravno").IDStatusa===vozilo.IDStatusa ? 'error border border-danger':''}`}>
      <td>{vozilo.OznakaTablica}</td>
      <td>{vozilo.VINBroj}</td>
      <td>{this.props.statusi ? this.props.statusi.find(e=>e.IDStatusa===vozilo.IDStatusa)?.NazivStatusa : "Loading..."}</td>
      <td>{this.props.marke ? this.props.marke.find(e=>e.IDMarkeVozila===vozilo.IDMarkeVozila)?.NazivMarke : "Loading..."}</td>
      <td>{this.props.tipovi ? this.props.tipovi.find(e=>e.IDTipa===vozilo.IDTipa)?.NazivTipa : "Loading..."}</td>
      {this.renderAdmin(vozilo)}
    </tr>
    )
  })
}
// <td>{this.state.statusi.find(e=>vozilo.IDStatusa==e.IDStatusa).NazivStatusa}</td>

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
    <Link className="item" to="/vozila/createvozila">Унеси новo возило</Link>
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
          <th style={{textAlign:"center"}}>Статус</th>
          <th style={{textAlign:"center"}}>Марка</th>
          <th style={{textAlign:"center"}}>Тип</th>
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
    vozila: Object.values(state.vozila),
    marke: Object.values(state.marke),
    statusi: Object.values(state.statusi),
    tipovi: Object.values(state.tipovi)
  }
}

export default connect(mapStateToProps,{ fetchVozila,fetchMarke,fetchStatusi,fetchTipovi })(HomeVozila);