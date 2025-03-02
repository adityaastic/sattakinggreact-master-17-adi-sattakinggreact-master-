import Select from "react-select";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import MonthlySatta from "./monthlySattaTable";
import { useLocation } from "react-router-dom";
import AdvertisementComponent from "../utilities/advertismentComponent";
let monthFullName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function FooterDrop() {
  var location = useLocation();
  const isContact = location.pathname.includes("/contact");
  const isPrivacy = location.pathname.includes("/privacypolicy");
  const isDisclaimer = location.pathname.includes("/disclaimer");
  const isAbout = location.pathname.includes("/about");
  const isFaq = location.pathname.includes("/faq");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selecYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [sendList, sndList] = useState([]);
  const [selecteData, sendData] = useState();
  const [dropValue, getDropValue] = useState([]);
  const [tableData, setTableData] = useState({ tableTrue: true, pathName: "" });

  const currYear = moment.tz("Asia/Kolkata").format("YYYY");
  const selectMonthnew = moment().tz("Asia/Kolkata").format("MMMM");
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const YearGame = { selecYear, selectedOption, selectMonthnew, selectedMonth };

  useEffect(() => {
    fetch("https://api.sattakingvip.co.in/getGameName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => sndList(json))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleChangeYear = (selecYear) => {
    setSelectedYear(selecYear);
  };

  const handleChangeMonth = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "46px",
      height: "46px",
    }),
    input: (provided, state) => ({
      ...provided,
      minHeight: "46px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "46px",
      padding: "0 8px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      height: "46px",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "46px",
    }),
  };

  let monthArray = [];
  for (let i = 0; i < monthFullName.length; i++) {
    monthArray.push({ value: i + 1, label: monthFullName[i] });
  }

  async function apiData(params) {
    await fetch("https://api.sattakingvip.co.in/getmonthdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        month: params.month,
        year: params.year,
        gameName: params.gameName ? params.gameName : "",
        result: "",
        days: params.days,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        sendData(json);
      })
      .catch((error) => console.error(error));
  }

  function getAllGameDetails() {
    if (selectedMonth != null && selecYear != null && selectedOption != null) {
      if (isAbout || isContact || isDisclaimer || isPrivacy) {
        setTableData({
          tableTrue: false,
          pathName: isAbout
            ? isAbout
            : isContact
            ? isContact
            : isDisclaimer
            ? isDisclaimer
            : isPrivacy,
        });
      }
      let allData = {
        month: selectedMonth ? selectedMonth.value : "",
        year: selecYear ? selecYear.value : "",
        gameName: selectedOption ? selectedOption.value : "",
        result: "",
        days: moment(selecYear.value + "-" + selectedMonth.value).daysInMonth(),
      };
      if (
        selectedMonth.value > currentMonth &&
        currentYear == selecYear.value
      ) {
        // apiData(allData);
        toast.error("Selected month out of Date", {
          className: "toast-message",
        });
      } else if (
        selectedMonth != null &&
        selecYear != null &&
        selectedOption != null
      ) {
        apiData(allData);
        getDropValue(allData);
      }
    } else {
      return toast.error("All Fields Required", {
        className: "toast-message",
      });
    }
  }

  const currentYear = new Date().getFullYear();
  let arr = [];
  for (let year = currentYear - 9; year <= currentYear; year++) {
    arr.push({ value: year, label: year });
  }

  return (
    <div className="footer">
      {!(
        (isContact || isPrivacy || isDisclaimer || isAbout || isFaq) &&
        tableData.tableTrue
      ) && (
        <MonthlySatta
          gamedata={selecteData}
          dropValue={dropValue}
          style={{ display: "block" }}
        />
      )}
      <div className="yellow-container pt-5">
        <div className="bottom-container">
          <div className="selection-container">
            <div className="col-12">
              <div className="row">
                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                  <Select
                    menuPlacement="auto"
                    value={selectedMonth}
                    onChange={handleChangeMonth}
                    options={monthArray}
                    placeholder="Select Month"
                    styles={customStyles}
                  />
                </div>
                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                  <Select
                    menuPlacement="auto"
                    value={selecYear}
                    onChange={handleChangeYear}
                    options={arr}
                    placeholder="Select Year"
                    styles={customStyles}
                  />
                </div>
                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                  <Select
                    menuPlacement="auto"
                    value={selectedOption}
                    onChange={handleChange}
                    options={sendList}
                    placeholder="Select Game"
                    styles={customStyles}
                  />
                </div>
                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                  <button
                    className="form-control"
                    id="go-button"
                    onClick={getAllGameDetails}
                  >
                    Go
                  </button>
                  <ToastContainer
                    autoClose={2000}
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    pauseOnHover
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvertisementComponent type="random" />
      <a href="/">
        <button className="float-end refreshButton">Refresh</button>
      </a>
    </div>
  );
}
export default FooterDrop;
