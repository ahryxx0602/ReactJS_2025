import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils/constant";
import { getScheduleByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailPrice = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    let { isShowDetailInfo } = this.state;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">Phòng khám chuyên khoa da liễu</div>
          <div className="detail-address">232 Nguyễn Đình Tựu</div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false && (
            <div className="short-info">
              GIÁ KHÁM: 250.000 đ
              <span onClick={() => this.showHideDetailPrice(true)}>
                Xem chi tiết
              </span>
            </div>
          )}

          {isShowDetailInfo === true && (
            <>
              <div className="title-price">GIÁ KHÁM:</div>
              <div className="detail-price">
                <div className="price">
                  <span className="left">Giá khám</span>
                  <span className="right">250.000 đ</span>
                </div>
                <div className="note">jsalkdjklsajdklsajdljasldjkla</div>
              </div>
              <div className="payment">sadm;sakdl;ákd;lákd;</div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailPrice(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
