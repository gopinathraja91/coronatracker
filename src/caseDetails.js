import React,{ Component } from 'react'
import './caseDetails.css';

class CaseDetails extends Component{
    constructor(props){
        super(props)
    }
    peopleAffectedList(details={}){
        return (
          <div className="co-total-affected">
            {Object.entries(details).map((key,index)=>{
              return (
                <div className={`case-${key[0]}`} >
                    {(index==0?<p><h4>{`CoronaVirus Cases`}</h4></p> : <p><span >{key[0]}</span></p>)}
                     <p> <span>{key[1]}</span></p>
                </div>
              )
            })}
          </div>
        )
      }
      displayClosedCases(details={}){
        return (
          <div>
            {Object.entries(details).map((key)=>{
              return (
                <div>
                    <p>
                      <span>{key[0]}</span>
                      <span>{key[1]}</span>
                    </p>
                </div>
              )
            })}
          </div>
        )
      }
      getImage(){

        return(
            <img src="./corona.jpg" />
        )
      }
    render(){
        const {active='',confirmed='',deaths='',recovered='',lastupdatedtime='',state='',deltaconfirmed='',deltadeaths='',deltarecovered=''}=this.props.totalCaseList;
        const totalAffected=this.peopleAffectedList({confirmed,deaths,recovered});
        const closedCases=this.displayClosedCases({deaths,recovered});
        const coronaImg=this.getImage();
        return(
            <div className="co-total-cases">
                { totalAffected }
                { coronaImg }
                { closedCases }
            </div>
        )
    }

}

export default CaseDetails