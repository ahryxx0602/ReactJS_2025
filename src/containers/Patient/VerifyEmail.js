import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
        });
      } else {
        this.setState({
          statusVerify: false,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    let { statusVerify } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          <div className="verify-content-left">
            {statusVerify === true ? (
              <div className="info-booking success">
                <i className="far fa-check-circle"></i>
                <FormattedMessage id="patient.verify-email.success" />
              </div>
            ) : (
              <div className="info-booking fail">
                <i className="fas fa-times-circle"></i>
                <FormattedMessage id="patient.verify-email.fail" />
              </div>
            )}
            <button className="btn-go-home" onClick={this.returnToHome}>
              Quay về trang chủ
            </button>
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
