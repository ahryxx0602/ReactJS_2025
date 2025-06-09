import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [14, 15],
      //15
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty"></div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div>
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        //dataScheduleTime={dataScheduleTime}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
