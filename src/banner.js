import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
const momenttz = require('moment-timezone')


const Banner = () => {
    const todayDate = moment(new Date()).format('lll')
    var currentDate = moment(new Date).tz('Asia/Kolkata').format("YYYY-MM-DD")
    var prevDate = moment(new Date).subtract(1, 'days').tz('Asia/Kolkata').format("YYYY-MM-DD")

    const [gamedata, setGameData] = useState([])
    useEffect(() => {
        fetch("https://api.sattakingvip.co.in/getData", {
          method: "POST", // or 'PUT' depending on your requirements
          headers: {
            "Content-Type": "application/json", // specify the content type
          },
          body: JSON.stringify({
            game_name: "",
            curr_date: currentDate,
            prev_date: prevDate,
            open_time: "market_sunday_time_open",
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            setGameData(json);
          })
          .catch((error) => console.error(error));

    }, []);
    return (
        <>
            <div className="banner text-white p-3 sattaReal">
                <h5 className=''>{todayDate}</h5>
                {gamedata.map((game, index) => (
                    game.game_name == 'MORNING STAR' || game.game_name == 'DEV DARSHAN' ? (<div key={index} className="game mb-4">
                        <h3>{game.game_name}</h3>
                        <h5>{game?.curr_date?.result || '--'}</h5>
                    </div>) : ''
                ))}

            </div>
        </>
    );
};

export default Banner;
