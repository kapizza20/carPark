import React from "react";
import {connect} from "react-redux"
import { fetchVozila,fetchVozaci,fetchEvidencije } from "../actions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"


const itemsPerPage=10;
class HomeEvidencije extends React.Component{
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
  renderAdmin(evidencije){
   return(<td style={{textAlign:"center"}}>
    <Link to={`/evidencije/editevidencije/${evidencije.IDEvidencije}`} className="ui button primary">
          Измени
      </Link>
      <Link to={`/evidencije/deleteevidencije/${evidencije.IDEvidencije}`} className="ui button negative">
          Обриши
      </Link>
   </td>
  );
   }

  componentDidMount= async() =>{
    await this.props.fetchVozaci();
    await this.props.fetchVozila();
    await this.props.fetchEvidencije(); 
  }

  renderList=()=>{
    let evidencijePerPage=null;
    let reducedevidencije=null;
    if(!this.state.searchWord){
      evidencijePerPage=this.props.evidencije.slice(this.state.itemOffset, this.state.endOffSet); 
    }else{
    // const timeoutID=setTimeout(()=>{
		// 	if (this.state.searchWord) {
		// 	this.renderList();
		// 	}
		// }, 500);
		
		// return ()=>{
		// 	clearTimeout(timeoutID)
		// }
    reducedevidencije=this.props.evidencije.filter(item=>
      item.BrojNaloga.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)  ||
      item.DatumIzlaska.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      (item.DatumPovratka==null ? "НИЈЕ СЕ ВРАТИО" : item.DatumPovratka.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)) ||
      this.props.vozila.find(e=>e.IDVozila===item.IDVozila).OznakaTablica.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`) ||
      this.props.vozaci.find(e=>e.IDVozaca===item.IDVozaca).ImeVozaca.toLowerCase().includes(`${this.state.searchWord.toLowerCase()}`)
      );
    //console.log(reducedevidencije);
    evidencijePerPage=reducedevidencije.slice(this.state.itemOffset, this.state.endOffSet); 
  }
  return evidencijePerPage.map((evidencije)=>{
    return (
    <tr key={evidencije.IDEvidencije} className={evidencije.DatumPovratka == null ? 'error border border-danger':''}>
      <td>{evidencije.BrojNaloga}</td>
      <td>{evidencije.DatumIzlaska.slice(0,10)}</td>
      <td>{evidencije.DatumPovratka==null ? "НИЈЕ СЕ ВРАТИО":evidencije.DatumPovratka.slice(0,10)  }</td>
      <td>{this.props.vozila ? this.props.vozila.find(e=>e.IDVozila===evidencije.IDVozila)?.OznakaTablica : "Loading..."}</td>
      <td>{this.props.vozaci ? this.props.vozaci.find(e=>e.IDVozaca===evidencije.IDVozaca)?.ImeVozaca : "Loading..."}</td>
      <td>{this.props.vozaci ? this.props.vozaci.find(e=>e.IDVozaca===evidencije.IDVozaca)?.PrezimeVozaca : "Loading..."}</td>
      <td>{this.props.vozaci ? this.props.vozaci.find(e=>e.IDVozaca===evidencije.IDVozaca)?.BrojTel : "Loading..."}</td>
      {this.renderAdmin(evidencije)}
    </tr>
    )
  })
}
// <td>{this.state.statusi.find(e=>vozilo.IDStatusa==e.IDStatusa).NazivStatusa}</td>

  handlePageChange=async (event)=>{
    console.log(event.selected,this.state.itemOffset,this.state.endOffSet)
    //on click pomeri pageCount i tako pomeri sve ostalo
    await this.setState({itemOffset:(event.selected * itemsPerPage) % this.props.evidencije.length});
    await this.setState({endOffSet:this.state.itemOffset+itemsPerPage});
  }

  onSearchSubmit=()=>{

  }

  render (){
    const items=this.props.evidencije.length;
    const pageCount=Math.ceil(items/itemsPerPage);
    return(
    
    <div className="ui container">
    <div className="ui menu">
    <div className="item">
    <Link className="item" to="/evidencije/createevidencije">Унеси нову евиденцију</Link>
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
          <th style={{textAlign:"center"}}>Број налога</th>
          <th style={{textAlign:"center"}}>Датум изласка</th>
          <th style={{textAlign:"center"}}>Датум повратка</th>
          <th style={{textAlign:"center"}}>Таблице возила</th>
          <th style={{textAlign:"center"}}>Име возача</th>
          <th style={{textAlign:"center"}}>Презиме возача</th>
          <th style={{textAlign:"center"}}>Број телефона</th>
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
    evidencije: Object.values(state.evidencije),
    vozaci: Object.values(state.vozaci)
  }
}

export default connect(mapStateToProps,{ fetchVozila,fetchVozaci,fetchEvidencije})(HomeEvidencije);