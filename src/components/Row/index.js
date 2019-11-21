import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Row.css"
import price from "./price.png"
import csv from "./csv.png"
import report from "./report.png"
import Popup from "./../Popup"
import calendar from "./calendar.png"


const getDaysText = (days) => {
    if(days===0)return " live ";
    if(days<0) return " Days Ahead"
    return "Days Ago";
}


const Row = ({ game, todayDateString, dateChange }) => {
    const { img, name, region, date } = game;
    const dateStringSplit = new Date(date).toString().split(" ");
    const [isPopup, changePopupState] = useState(false);

    const diffdays = Math.floor((new Date(todayDateString) - new Date(date))/(60*60*24*1000));
    


    return <div>
    <div className="tableRow">
        <div className="datename blok">
            <div className="date">
                <span>
                    {dateStringSplit[1].toUpperCase()} {dateStringSplit[3]}, {dateStringSplit[2]}
                </span>
                <span>
                    {Math.abs(diffdays) || null} {getDaysText(diffdays)}
                </span>
            </div>
            <div className="name">
                <figure><img className="gameicon" src={img} alt={name} /></figure>
                <span>{name}</span>
                <span>{region}</span>
            </div>
        </div>
        <div onClick={()=>{ toggleScroll(); changePopupState(true)} } className="pricing blok">
            <img src={price} className="act" alt={name + " price"}  />
            <span>View Price</span>
        </div>
        <div className="actions blok">
            <div className="csv">
                <img src={csv} className="act" alt={name + " csv"} />
                <span>CSV</span>
            </div>
            <div className="report">
                <img src={report} className="act" alt={name + " report"} />
                <span>Report</span>
            </div>
            <div className="scheduleAgain">
                <div className="calWrap">
                <DatePicker
                withPortal
                selected={new Date(date)}
                onChange={dateChange}
                />
                </div>
                <img src={calendar} className="act" alt={name + " calendar"} />
                <span>Schedule Again</span>
            </div>
        </div>
    </div>
        <div style={{width: "90%"}} className="separator"></div>
        {isPopup ? <Popup game={game} closePopup={()=>{ toggleScroll(); changePopupState(false)}} /> : null}
    </div>
}

export default Row;




const toggleScroll = () => {
    const isBlocked = document.getElementsByTagName('body')[0].classList.contains('block');
    if(isBlocked){
        return document.getElementsByTagName('body')[0].classList.remove('block')
    }
    document.getElementsByTagName('body')[0].classList.add('block')
}