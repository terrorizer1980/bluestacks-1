import React from "react"
import Row from "./../Row";
import "./Table.css";
import gamesData from "./gamesdata";

class Table extends React.Component {
    state = {
        game_data : gamesData,
    }
    dateChange = (d, i) => {
        const game_data = [...this.state.game_data];
        game_data[i].date = d;
        this.setState({game_data});
    }
    render () {
        const { currentTab, language, mobile } = this.props;
        const { game_data } = this.state;
        const today = new Date();
        const todayDateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        return <div className="campaignTable">
        <div className="tableHeader">
            <span>{`${language=='en' ? "DATE" : "Gérer"}`}</span>
            <span>{`${language=='en' ? "CAMPAIGNS" : "CAMPAGNES"}`}</span>
            <span>{`${language=='en' ? "VIEW" : "VUE"}`}</span>
            <span className="action">{ mobile ? "RESCHEDULE" : "ACTION"}</span>
        </div>
        {
            game_data.map((game, index)=>{  
                const gameDate = new Date(game.date);
                const idx = index;
                const gameDateString = `${gameDate.getFullYear()}-${gameDate.getMonth()+1}-${gameDate.getDate()}`;
                const _upcoming = currentTab===0 && new Date(todayDateString) < new Date(gameDateString);
                const _live = currentTab===1 && new Date(todayDateString).toDateString() === new Date(gameDateString).toDateString();
                const _past = currentTab===2 && new Date(todayDateString) > new Date(gameDateString);
                if(!_upcoming && !_live && !_past) return null;
                return <Row language={language} todayDateString={todayDateString} mobile={mobile} dateChange={(date=>this.dateChange(date, idx))} game={ game } />
            })
        }
        
    </div>
    }
}

export default Table;