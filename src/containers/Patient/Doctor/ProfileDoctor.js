import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }

  renderTimeBooking = (dataScheduleTime) => {
    let { language } = this.props;

    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataScheduleTime.timeTypeData.valueVi
          : dataScheduleTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataScheduleTime.date / 1000)
              .format("ddd - DD/MM/YYYY")
          : moment
              .unix(+dataScheduleTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
    return;
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataScheduleTime } = this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    console.log("Check: ", dataProfile);
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{language === "vi" ? nameVi : nameEn}</div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataScheduleTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          <span>Giá khám:</span>
          {dataProfile &&
          dataProfile.Doctor_Infor &&
          language === LANGUAGES.VI ? (
            <NumberFormat
              className="currency"
              value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"VND"}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_Infor &&
          language === LANGUAGES.EN ? (
            <NumberFormat
              className="currency"
              value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
            />
          ) : (
            ""
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
