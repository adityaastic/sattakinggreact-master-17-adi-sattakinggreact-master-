import "./App.css";
import moment from "moment";
import "moment-timezone";
import React, { useState, useEffect } from "react";
import Disclaimer from "./js/disclaimer";
import FAQ from "./js/faq";
import ContactUs from "./js/contact";
import PrivacyPolicy from "./js/privacy";
import AboutUs from "./js/about";
import { useLocation } from "react-router-dom";
import trackVisitor from "./utilities/tracker";
import DaySattaResult from "./js/daySattaResult";
import AdvertisementComponent from "./utilities/advertismentComponent";
import { Helmet } from "react-helmet";
const momenttz = require("moment-timezone");

function App() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const isDisc = location.pathname.includes("/disclaimer");
  const isContact = location.pathname.includes("/contact");
  const isPrivacy = location.pathname.includes("/privacypolicy");
  const isAbout = location.pathname.includes("/about");
  const isFaq = location.pathname.includes("/faq");

  const currentTime = moment().format("HH:mm");
  const [datagame, setDataFor] = useState([]);
  const todayDate = moment(new Date()).format("lll");

  var currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  var prevDate = moment()
    .subtract(1, "days")
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD");
  useEffect(() => {
    trackVisitor();
  }, []);

  useEffect(() => {
    fetch("https://api.sattakingvip.co.in/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        // Sort data based on open_time
        const sortedData = json.sort((a, b) => {
          const timeA = moment(a.open_time, "HH:mm");
          const timeB = moment(b.open_time, "HH:mm");
          return timeA.diff(timeB);
        });

        // Set sorted data into state
        setData(sortedData);
      })
      .catch((error) => console.error(error));
  }, [currentDate, prevDate]);

  function pageScroll() {
    const tableSection = document.getElementById("monthTable");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (data?.length > 0) {
      // Convert current time to a moment object for comparison
      const currentMoment = moment(currentTime, "HH:mm");

      // Process and filter the data
      const processedData = data.map((item) => {
        const itemTime = moment(item.open_time, "HH:mm");
        const resultAvailable = item?.curr_date?.result ? true : false;

        return {
          gameName: item.game_name,
          result: resultAvailable ? item?.curr_date?.result : "WAIT",
          openTime: item.open_time,
          isAvailable: resultAvailable,
          itemTime: itemTime,
        };
      });

      // Sort the processed data by open_time
      const sortedProcessedData = processedData.sort((a, b) => {
        return a.itemTime.diff(b.itemTime);
      });

      // Separate records into those with available results and those with "wait"
      const availableResults = sortedProcessedData.filter(
        (item) => item.isAvailable
      );
      const upcomingRecords = sortedProcessedData.filter(
        (item) => !item.isAvailable
      );

      // Determine the records to display
      let recordsToDisplay = [];

      if (availableResults.length > 0) {
        // Show available results and include records up to the next upcoming record
        recordsToDisplay = [...availableResults];

        const lastAvailableIndex = sortedProcessedData.indexOf(
          availableResults[availableResults.length - 1]
        );
        const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
        if (nextRecord) {
          recordsToDisplay.push(nextRecord);
        }
      } else {
        // No available results, show up to 3 upcoming records with "wait"
        recordsToDisplay = [...upcomingRecords.slice(0, 3)];
      }

      // Ensure only 3 records are shown
      if (recordsToDisplay.length > 3) {
        // Remove the oldest record if more than 3 records are present
        recordsToDisplay = recordsToDisplay.slice(-3);
      }

      // Update state with the processed and limited data
      setDataFor(recordsToDisplay);

      // Debugging log
    }
  }, [data, currentTime]);

  return (
    <div className="App">
      {/* seo setup start */}
      <Helmet>
        <title></title>
        <meta name="description" content="sattaking" />
        <meta
          name="Keywords"
          content="satta-kingg, satta kingg, sattakingreal, satta king real, sattaking real, Satta King, Satta King live result, Satta king online result, Satta king online, Satta king result today, Gali result, Desawar result, Faridabad result, Gaziyabad result, Satta matka king, Satta Bazar, Black satta king, Satta king 2017, satta king 2018, Gali Leak Number, Gali Single Jodi, Black Satta Result, Desawar Single Jodi, Satta king up, Satta king desawar, Satta king gali, Satta king 2019 chart, Satta baba king, Satta king chart, Gali live result, Disawar live result, Satta Number, Matka Number, Satta.com, Satta Game, Gali Number, Delhi Satta king,"
        />
        <link rel="canonical" href="https://satta-kingg.co" />
      </Helmet>
      {/* seo setup end */}
      <div className=" col-12">
        <div className="row">
          <a
            href="http://s-king.co/"
            className="rounded-button col-md-4 col-sm-12"
          >
            Satta king
          </a>
          <a
            href="http://satta-leak.co/"
            className="rounded-button  col-md-4 col-sm-12"
          >
            Satta Leak
          </a>
          <a
            className="rounded-button  col-md-4 col-sm-12"
            onClick={pageScroll}
          >
            Result chart
          </a>
        </div>
      </div>
      <marquee className="marqu">
        Satta king, Sattaking, Satta king 2020, Satta king up, Satta result,
        Satta king result, Satta king online, Gali result, Desawar result, Satta
        king chart, Satta king live, Gali satta, Deshawar live result, Gali live
        result, Satta matka, Satta matka king, Satta king up, Satta king 2020
        chart, Satta king desawar, Satta king gali, Gali live result, Disawar
        live result, Satta Number, Satta Game, Gali Number, Delhi Satta king,
        Satta Bazar, Black satta king, Gali Single Jodi, Black Satta Result,
        Desawar Single Jodi
      </marquee>
      <div className="col-12 text-center header-heading">
        <h6>SATTA KING, SATTAKING, SATTA RESULT</h6>
        <h1>WWW.SATTAKINGG.CO</h1>
      </div>
      <div className="banner text-white p-3 sattaReal">
        <h5 className="color">{todayDate} </h5>
        {datagame?.map((todayData, index) => (
          <div key={index} className="game">
            <h3 className="mb-0">{todayData?.gameName}</h3>
            <h5 className=" lh-1 blinking-text">{todayData?.result || ""}</h5>
          </div>
        ))}
      </div>
      <AdvertisementComponent type="odd" />
      <DaySattaResult dayGameData={data} />

      {isDisc && <Disclaimer style={{ display: "none" }} />}
      {isContact && <ContactUs style={{ display: "none" }} />}
      {isPrivacy && <PrivacyPolicy style={{ display: "none" }} />}
      {isAbout && <AboutUs style={{ display: "none" }} />}
      {isFaq && <FAQ style={{ display: "none" }} />}
    </div>
  );
}

export default App;
