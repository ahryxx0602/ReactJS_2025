import React, { Component } from "react";
import { use } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./detailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailDoctor: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInfoDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { DetailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (DetailDoctor && DetailDoctor.positionData) {
      nameVi = `${DetailDoctor.positionData.valueVi}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`;
      nameEn = `${DetailDoctor.positionData.valueEn}, ${DetailDoctor.lastName} ${DetailDoctor.firstName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  DetailDoctor.image ? DetailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{language === "vi" ? nameVi : nameEn}</div>
              <div className="down">
                {DetailDoctor.Markdown && DetailDoctor.Markdown.description && (
                  <span>{DetailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <h3>
              <i className="fas fa-calendar-alt"></i> Thông tin lịch khám bệnh
            </h3>
            <div className="content-doctor-schedule">
              <div className="content-left">
                <DoctorSchedule
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
              <div className="content-right">
                <DoctorExtraInfo
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
            </div>
          </div>
          <div className="detail-info-doctor">
            {DetailDoctor &&
              DetailDoctor.Markdown &&
              DetailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DetailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor">
            <h1>
              <i className="fas fa-comment"></i> Đánh giá bác sĩ
            </h1>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
