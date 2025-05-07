import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils/constant";
import { getScheduleByDate } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }
  async componentDidMount() {
    let { language } = this.props;

    console.log("VietNam:", moment(new Date()).format("dddd - DD/MM"));
    console.log(
      "English:",
      moment(new Date()).locale("en").format("ddd - DD/MM")
    );
    this.setArrDays(language);
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }

    this.setState({
      allDays: allDays,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.dataSchedule ? res.dataSchedule : [],
        });
      }
      console.log("Doctor ID from parent:", this.props.doctorIdFromParent);
      console.log("check res schedule by date", res);
    }
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;
    console.log("check all available time", allAvailableTime);
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            <option>
              {this.props.language === LANGUAGES.VI
                ? "Chọn ngày khám"
                : "Choose a date"}
            </option>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fas fa-clock"></i>
            <span>
              {language === LANGUAGES.VI
                ? "Thời gian khám bệnh"
                : "Available time"}
            </span>
          </div>
          <div className="time-content">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              allAvailableTime.map((item, index) => {
                let timeDisplay =
                  language === LANGUAGES.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn || "N/A";
                return <button key={index}>{timeDisplay}</button>;
              })
            ) : (
              <div className="no-schedule">
                {language === LANGUAGES.VI ? (
                  <span>Không có lịch hẹn xin hãy chọn các ngày khác</span>
                ) : (
                  <span>No schedule please choose another day</span>
                )}
                <i className="fas fa-times"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
