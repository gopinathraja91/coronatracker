import React,{ Component } from 'react'
import CaseDetails from './caseDetails'
//import { MDBDataTable } from 'mdbreact';
import './stateList.css';
import Select from 'react-select';

let displayItems=[]
class Covidetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      isactive : false,
      stateCode : '',
      dropdownlabel :[
          {
          label:"zone",
          value:"zone"
          },
          {
          label:"county",
          value:"county"
          },
          {
          label:"gbu",
          value:"gbu"
          },
          {
          label:"sub",
          value:"sub"
          }
        ],
        dropdownvalues:{
          zone:{
            "NWE":["france","malasia"],
            "NA":["USA"]
          },
          county:{
            "france":["HIT1"],
            "malasia":["HIT2"],
            "USA":["HIT!","corona"]
          },
          gbu:{
            "HIT2":["subHit","sub2"],
            "corona":["subcorona","subcorona2"],
            "HIT!" :[ "subHit!1","subhit!2"],
            "HIT1" :["abc","bca"]
          },
          sub:{
            "subHit":["1","2"],
            "sub2":["3","4"],
            "subcorona":["5","6"],
            "subcorona2":["7","8"],
            "subHit!1":["9","10"],
            "subhit!2":["11","12"],
            "abc":["111"],
            "bca":["222"]
          }
        },
        selectedOption : [],
    }
  }
  _getStatus(key){
    const distName=key[0];
    const { active='',confirmed='',deceased='',recovered='',delta={}}=key[1];
    const deltaConfirmed = delta.confirmed ,deltaDeceased = delta.deceased ,deltaRecovered = delta.recovered;
    return(
      <tr className="distList">
          <td> { distName }</td>
          <td><span className="dayStatus">{ (deltaConfirmed>0) && '+' +  deltaConfirmed }</span>{ confirmed }</td>
          <td>{ active }</td>
          <td><span className="dayStatus">{ (deltaDeceased>0) && '+' +  deltaDeceased }</span>{ deceased }</td>
          <td><span className="dayStatus">{ (deltaRecovered>0) && '+' + deltaRecovered }</span>{ recovered }</td>
      </tr>
    )
  }
  _getDetailRecords(stateDetails,stateCode){
    const showList = (this.state.stateCode == stateCode )?true:false;
    return(
      <div className={"co-stateList " + (showList? "selected" : "disableFlag")}>
        <table>
          <thead>
          <tr>
            <th> District Names</th>
            <th>Confirmed </th>
            <th>Active </th>
            <th>Death </th>
            <th>recovered </th>
          </tr>
          </thead>
          <tbody>
            { Object.entries(stateDetails).map((key) => this._getStatus(key))}
          </tbody>
        </table>
      </div>
    )
  }
  getlistEnable = (e,stateCode) => {
    e.preventDefault();
    if(stateCode === this.state.stateCode){
      stateCode=''
    }
    this.setState({
        stateCode: stateCode
    });
  }
  _getStateElement(key){
    const stateCode=key[1].statecode;
    const stateDetails=key[1].districtData;
    const detialrecords=this._getDetailRecords(stateDetails,stateCode);
    const {active='',confirmed='',deaths='',recovered='',lastupdatedtime='',state='',deltaconfirmed='',deltadeaths='',deltarecovered=''}=this.props.stateList[stateCode];
    return (
      <div className={ `co-states-${stateCode}` } onClick={(e) => { this.getlistEnable(e,stateCode); }}>
        <div className="co-arrowField">
          <a href="javascript:void(0)" className="co-nextArrow" onClick={(e) => { this.getlistEnable(e,stateCode); }}> > </a>
        </div>
        <div className="co-state-status">
          <p><span>{ state }</span></p>
          <p><span className="dayStatus">{ (deltaconfirmed>0) && '+' + deltaconfirmed }</span><span>{ confirmed }</span></p>
          <p><span>{ active }</span></p>
          <p><span className="dayStatus">{ (deltadeaths>0) && '+' + deltadeaths }</span><span>{ deaths }</span></p>
          <p><span className="dayStatus">{ (deltarecovered>0) && '+' + deltarecovered }</span><span>{ recovered }</span></p>
        </div>
        { detialrecords }
      </div>
    )
  }
  _getHeader(){

  }
  _getStateInfo(){
    const covidDetails=this.props.coviddetails;
    return(
      <div className="co-totalList">
        <div className="co-stateTable-header co-state-status">
              <p><span>State Names</span></p>
              <p><span>Confirmed</span></p>
              <p><span>Active</span></p>
              <p><span>Death</span></p>
              <p><span>recovered</span></p>
        </div>
        {Object.entries(covidDetails).map((key) => this._getStateElement(key))}
      </div>
      
    )
  }

//----------------------------------------------------- select box fuctions ----------------------------------------------


displaySelectBox(){
  const dropdownlabel = this.state.dropdownlabel;
  if(dropdownlabel.length == 0 || !dropdownlabel){
    return null;
  }
  return (
    <div>
      {
        dropdownlabel.map((key,index) => this.renderSelectBox(key,index))
      }
    </div>
  )
}

handleChange(e,index){
  e.preventDefault();
  
  if(index==0 && e.target.value== "ALL"){
    displayItems=[]
    this.setState({
      selectedOption :[]
    })
    return null;
  }
  const selectedOptionChange=this.state.selectedOption;
  selectedOptionChange[index]=e.target.value;
  displayItems[index] = (e.target.value == "ALL") ? null : [e.target.value];
  this.setState({
    selectedOption :selectedOptionChange
  })
}

dropOptions(dataObject,index){
  let optionArr=[];
  if(index==0){
    Object.keys(dataObject).map((key) => {
      optionArr.push(key)
    })
    displayItems[index] = (!displayItems[index] || displayItems[index]=="ALL")? optionArr: displayItems[index];
    return optionArr;
  }

  const {dropdownvalues={},dropdownlabel=[],selectedOption}= this.state;
  const preOptions=displayItems[index-1],prevSelected=(selectedOption[index-1])?selectedOption[index-1]:'ALL';

  const prevDropVal = ((preOptions.indexOf(prevSelected)) != -1 && prevSelected!="ALL")? [prevSelected]: preOptions;
  const preDropLabel = dropdownlabel[index-1].value;
  const optionsList=dropdownvalues[preDropLabel];
  prevDropVal.map((key) => {
    const arrlist=optionsList[key];
    optionArr.push(...arrlist)
  })
  displayItems[index] = optionArr;
  return optionArr;
}

renderSelectBox(key,index){

  const {dropdownvalues={},dropdownlabel=[]}= this.state;
  const { selectedOption = [],dropZoneValues={} } = this.state;
  const { value='' } = key
  let dropValues,options=["ALL"];
  options.push(...this.dropOptions(dropdownvalues[value],index));
  return (
    <select value={(selectedOption[index])?selectedOption[index]:"ALL"} onChange={ (e) => this.handleChange(e,index)}>
      {options.map((key) => {
        return <option value={key}>{key}</option>
      })}
    </select>
  )
}
//----------------------------------------------------------  ends --------------------------------------------------------




  render(){
    if(!this.props.coviddetails || !this.props.stateList){
      return null
    }
    const header = this._getHeader()
    const stateList = this._getStateInfo();
    const dynamicSelectBox=this.displaySelectBox();

    return(
      <div>
        { dynamicSelectBox }
        { header }
        <CaseDetails totalCaseList={this.props.stateList["TT"]}></CaseDetails> 
        { stateList }
      </div>
    )
  }
}

export default Covidetails
