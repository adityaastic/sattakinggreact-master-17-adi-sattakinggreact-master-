import { Table } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import AdvertisementComponent from "../utilities/advertismentComponent";

function MonthlySatta({ gamedata, dropValue }) {
  const [data, setData] = useState([]);
  let [columns, setcolumn] = useState([]);
  const currentMonth = moment().tz("Asia/Kolkata").month();
  const currentYear = moment().tz("Asia/Kolkata").year();
  const currentMonthDays = moment().tz("Asia/Kolkata").daysInMonth();
  const [gameResult, setGameResult] = useState([]);
  useEffect(() => {
    if (gamedata) {
      setData(gamedata);
    }
  }, [gamedata]);
  var selectMonthDrop;
  useEffect(() => {
    if (dropValue) {
      setGameResult(dropValue);

      if (gameResult == "") {
        selectMonthDrop = moment().tz("Asia/Kolkata").format("MMMM");
      } else {
        selectMonthDrop = moment(
          `${dropValue?.year}-${dropValue?.month}-01`
        ).format("MMMM");
      }
    } else {
    }
  });

  useEffect(() => {
    if (data.length > 0) {
      let array = Object.keys(data[0]);
      for (let i = 0; i < array.length; i++) {
        array[i] = {
          title: array[i] === "day" ? selectMonthDrop : array[i],
          dataIndex: array[i],
          key: array[i],
        };
      }
      setcolumn(array);
    }
  }, [data]);

  useEffect(() => {
    if (!gamedata && !dropValue.selectedOption) {
      const moment = require("moment-timezone");
      function getDaysInMonth(year, month, timezone) {
        return moment.tz({ year: year, month: month }, timezone).daysInMonth();
      }

      // Get the current date in a specific timezone
      const timezone = "Asia/Kolkata";
      const date = moment.tz(timezone);

      fetch("https://api.sattakingvip.co.in/getmonthdata", {
        method: "POST", // or 'PUT' depending on your requirements
        headers: {
          "Content-Type": "application/json", // specify the content type
        },
        body: JSON.stringify({
          month: currentMonth + 1,
          year: currentYear,
          gameName: "",
          result: "",
          days: currentMonthDays,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => console.error(error));
    }
  }, [gamedata]);

  return (
    <div className="pt-3 monthYrTbl " id="monthTable">
      <AdvertisementComponent type="even" />
      {!(dropValue == null) && (
        <h5 className="text-white text-center m-3" style={{ display: "block" }}>
          {/* {dropValue?.selectedOption?.value} MONTHLY RECORD CHART{" "}
            {dropValue?.selectedMonth?.label || dropValue.selectMonthnew} -{" "}
            {dropValue?.selecYear?.value || currentYear} */}
          {dropValue?.gameName} MONTHLY RECORD CHART {selectMonthDrop} -{" "}
          {dropValue?.year || currentYear}
        </h5>
        // <h5 className="text-white text-center m-3" style={{ display: 'block' }}>{dropValue?.selectedOption?.value} RECORD CHART {dropValue?.selecYear?.value}</h5>
      )}
      <div className="table-responsive" id="scrollbar1">
        <Table dataSource={data} columns={columns} pagination={false} />;
      </div>
    </div>
  );
}

export default MonthlySatta;
