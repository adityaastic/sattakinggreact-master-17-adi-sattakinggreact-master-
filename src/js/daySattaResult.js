import "../App.css";
import moment from "moment";
import { useState, useEffect } from "react";
import myImage from "../images/new.gif";
import App from "../App";
import FooterDrop from "./footerDrop";
import { useLocation } from "react-router-dom";
const momenttz = require("moment-timezone");
function DaySattaResult({ dayGameData }) {
  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm");
  const location = useLocation();
  const isDisc = location.pathname.includes("/disclaimer");
  const isContact = location.pathname.includes("/contact");
  const isPrivacy = location.pathname.includes("/privacypolicy");
  const isAbout = location.pathname.includes("/about");
  const isFaq = location.pathname.includes("/faq");

  const [data, setGameData] = useState([]);

  useEffect(() => {
    setGameData(dayGameData);
  }, [dayGameData]);

  // based on current date and time get data
  const getTodayResult = (gameData) => {
    const itemTime = moment(gameData.open_time, "HH:mm");
    const currentMoment = moment(currentTime, "HH:mm");

    if (gameData?.curr_date?.date === currentDate) {
      return currentMoment.isSameOrAfter(itemTime)
        ? gameData?.curr_date?.result || ""
        : "";
    }
    return "";
  };

  return (
    <div>
      {/* <App sectiondata={dayData} /> */}

      <div className="col-12 daywisereport">
        {!(isContact || isPrivacy || isDisc || isAbout || isFaq) && (
          <div className="row">
            {data && data.length > 0 ? (
              data.map((gameData, index) => (
                <div key={index} className="game_column col-md-6 col-sm-12">
                  <div className="d-flex align-items-center flex-column col-lg-12">
                    <h6 className="mb-0 pt-2 fw-bold fs-6">
                      {gameData?.game_name}
                    </h6>
                    <p className="mb-0 fs-6 textColor">
                      ( {gameData?.open_time} )
                    </p>
                    <div className="d-flex align-items-end text-center">
                      <div>
                        <span className="">{` { ${
                          gameData?.prev_date?.result || "NULL"
                        } }`}</span>
                      </div>
                      <div>
                        <img
                          src={myImage}
                          width="20"
                          height="10"
                          alt="updateimg"
                        ></img>
                      </div>
                      <div>
                        <span>
                          [<span>{getTodayResult(gameData)}</span>]
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        )}
        <FooterDrop />
      </div>
    </div>
  );
}

export default DaySattaResult;
