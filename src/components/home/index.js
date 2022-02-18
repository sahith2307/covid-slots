import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import "./index.css";
export default class Home extends Component {
  state = {
    findButton: true,
    states: [],
    districts: [],
    districtId: "",
    searchedData: [],
    searchedData1: [],
    searchedData2: [],
    todayDate: 0,
    pincodeNo: "",
  };

  componentDidMount() {
    this.fetchStateData();
  }
  changeDistrictId = (id) => {
    this.setState({ districtId: id });
  };
  fetchSearchData = async () => {
    const { districtId } = this.state;
    const date = new Date();
    const dateformater = date.getMonth() + 1 + "-" + date.getFullYear();
    const formedDate1 = date.getDate() + "-" + dateformater;
    const formedDate2 = date.getDate() + 1 + "-" + dateformater;
    const formedDate3 = date.getDate() + 2 + "-" + dateformater;
    console.log(formedDate3);
    const dataUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${formedDate1}`;
    const response = await fetch(dataUrl);
    const data = await response.json();
    const dataUrl1 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${formedDate2}`;
    const response1 = await fetch(dataUrl1);
    const data1 = await response1.json();
    const dataUrl2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${formedDate3}`;
    const response2 = await fetch(dataUrl2);
    const data2 = await response2.json();
    this.setState({
      searchedData: data.sessions,
      searchedData2: data2.sessions,
      searchedData1: data1.sessions,
      todayDate: date.getDate(),
    });
  };
  fetchStateData = async () => {
    const stateUrl = "http://api.ngminds.com/states.json";
    const response = await fetch(stateUrl);
    const data = await response.json();
    this.setState({ states: data.states });
  };
  fetchByPincode = async () => {
    const { pincodeNo } = this.state;
    const date = new Date();
    const dateformater = date.getMonth() + 1 + "-" + date.getFullYear();
    const formedDate1 = date.getDate() + "-" + dateformater;
    const formedDate2 = date.getDate() + 1 + "-" + dateformater;
    const formedDate3 = date.getDate() + 2 + "-" + dateformater;
    console.log(formedDate3);
    const dataUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincodeNo}&date=${formedDate1}`;
    const response = await fetch(dataUrl);
    const data = await response.json();
    const dataUrl1 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincodeNo}&date=${formedDate2}`;
    const response1 = await fetch(dataUrl1);
    const data1 = await response1.json();
    const dataUrl2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincodeNo}&date=${formedDate3}`;
    const response2 = await fetch(dataUrl2);
    const data2 = await response2.json();
    this.setState({
      searchedData: data.sessions,
      searchedData2: data2.sessions,
      searchedData1: data1.sessions,
      todayDate: date.getDate(),
    });
  };
  fetchDistrictData = async (id) => {
    const districtUrl = `http://api.ngminds.com/${id}.json`;
    const response = await fetch(districtUrl);
    const data = await response.json();
    this.setState({ districts: data.districts });
  };
  getFilterOptions = () => {
    const { findButton, states, districts } = this.state;
    if (findButton) {
      return (
        <div className="m-auto mt-3 w-75 d-flex flex-row justify-content-around">
          <Form.Select
            className="w-25"
            onChange={(event) => {
              this.fetchDistrictData(event.target.value);
            }}
          >
            <option value="1">Select State</option>
            {states?.map((each, index) => {
              return (
                <option key={each.state_id} value={each.state_id}>
                  {each.state_name}
                </option>
              );
            })}
          </Form.Select>
          <Form.Select
            placeholder="Select District"
            className="w-25"
            onChange={(event) => {
              this.changeDistrictId(event.target.value);
            }}
          >
            <option value="1">Select District</option>
            {districts?.map((each, index) => {
              return (
                <option key={each.district_id} value={each.district_id}>
                  {each.district_name}
                </option>
              );
            })}
          </Form.Select>
          <button className="btn btn-info" onClick={this.fetchSearchData}>
            Search
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <input
            value={this.state.pincodeNo}
            type="text"
            placeholder="Enter your PIN"
            onChange={(event) => {
              this.setState({ pincodeNo: event.target.value });
            }}
          />
          <button className="btn btn-info" onClick={this.fetchByPincode}>
            Search
          </button>
        </div>
      );
    }
  };
  displayData = () => {
    const { searchedData, searchedData1, searchedData2, todayDate } =
      this.state;
    const date = new Date();
    const dateformater = date.getMonth() + 1 + "-" + date.getFullYear();
    return (
      <>
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-3 text-end pt-2">
                <a
                  href="javascript:;"
                  class="text-decoration-none text-secondary"
                >
                  <h2>〈</h2>
                </a>
              </div>
              <div class="col">
                <div class="card my-2">
                  <div class="card-body py-1 my-1">
                    <strong>
                      <small>{todayDate + "-" + dateformater}</small>
                    </strong>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card my-2">
                  <div class="card-body py-1 my-1">
                    <strong>
                      <small>{todayDate + 1 + "-" + dateformater}</small>
                    </strong>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card my-2">
                  <div class="card-body py-1 my-1">
                    <strong>
                      <small>{todayDate + 2 + "-" + dateformater}</small>
                    </strong>
                  </div>
                </div>
              </div>

              <div class="col-auto pt-2">
                <a
                  href="javascript:;"
                  class="text-decoration-none text-secondary"
                >
                  <h2>〉</h2>
                </a>
              </div>
            </div>
          </div>
        </div>

        {searchedData?.map((each) => {
          const dateValues1 = searchedData1?.filter(
            (each1) => each.center_id === each1.center_id
          )[0];
          const dateValues2 = searchedData2?.filter(
            (each2) => each.center_id === each2.center_id
          )[0];
          const classForFee =
            each.fee_type == "Free" ? "bg-success" : "bg-warning";
          const avileClass1 =
            each.available_capacity === undefined
              ? ""
              : each.available_capacity <= 10 && each.available_capacity !== 0
              ? "text-warning"
              : each.available_capacity > 10
              ? "text-success"
              : "text-danger";
          const avileClass2 =
            each.available_capacity === undefined
              ? ""
              : dateValues1?.available_capacity <= 10 &&
                dateValues1?.available_capacity !== 0
              ? "text-warning"
              : dateValues1?.available_capacity > 10
              ? "text-success"
              : "text-danger";
          const avileClass3 =
            dateValues2?.available_capacity === undefined
              ? "text-dark"
              : dateValues2?.available_capacity <= 10
              ? "text-warning"
              : dateValues2?.available_capacity > 10
              ? "text-success"
              : "text-danger";
          console.log(each);
          return (
            <div class="card-body">
              <div class="row py-3 border-bottom">
                <div class="col-3">
                  <div class="text-primary">{each.name}</div>
                  <div class="text-muted">
                    <small>
                      {each.address},{each.block_name},{each.pincode}
                    </small>
                  </div>
                  <div>
                    <span class="me-1">
                      {each.vaccine}
                      {each.fee === "0" ? "" : `:${each.fee}`}
                    </span>
                    <span class={`badge ${classForFee}`}>{each.fee_type}</span>
                  </div>
                  <small class="d-block">
                    <span class="text-primary me-3">
                      Age Limit: {each.min_age_limit}&above
                    </span>
                    <span>
                      Dose:
                      {each.available_capacity_dose1 > 0 &&
                      each.available_capacity_dose2 > 0
                        ? "#1 and #2"
                        : each.available_capacity_dose1 > 0
                        ? "#1"
                        : each.available_capacity_dose2 > 0
                        ? "#2"
                        : "Precaution"}
                    </span>
                  </small>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <div class="card-body d-table">
                      <div class="d-table-cell h-100 align-middle text-center">
                        <strong class={avileClass1}>
                          {each.available_capacity
                            ? each.available_capacity
                            : "BOOKED"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card h-100">
                    <div class="card-body d-table">
                      <div class="d-table-cell h-100 align-middle text-center">
                        <strong class={avileClass2}>
                          {dateValues1?.available_capacity
                            ? dateValues1?.available_capacity
                            : "BOOKED"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <div class="card-body d-table">
                      <div class="d-table-cell h-100 align-middle text-center">
                        <strong class={avileClass3}>
                          {dateValues2?.available_capacity
                            ? dateValues2?.available_capacity
                            : dateValues2?.available_capacity === undefined
                            ? "N/A"
                            : "Booked"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  render() {
    const { findButton, states } = this.state;

    return (
      <div>
        <h1 className="text-center">Search Your Nearest Vaccination Center</h1>
        <div className="text-center">
          <button
            className={`btn ${findButton && "btn-primary"}`}
            onClick={() => {
              this.setState((prev) => ({ findButton: true }));
            }}
          >
            Find by District
          </button>
          <button
            className={`btn ${!findButton && "btn-primary"}`}
            onClick={() => {
              this.setState((prev) => ({ findButton: false }));
            }}
          >
            Find by PIN
          </button>
        </div>
        {this.getFilterOptions()}
        {this.displayData()}
      </div>
    );
  }
}
