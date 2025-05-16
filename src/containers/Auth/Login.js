import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import logo from "../../assets/images/logo-black.svg";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    console.log(
      "username: ",
      this.state.username,
      "password: ",
      this.state.password
    );
    console.log("all state ", this.state);

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log(e);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    //JSX
    return (
      <div className="login-background">
        <div className="logo">
        <img
                className="img-logo"
                src={logo}
              />
        </div>
        <div className="login-container">
          <div className="login-content">
            <div className="login-content-row">
              <div className="col-12 text-login">LOGIN</div>
              <div className="col-12 form-group login-input">
                <label>USERNAME:</label>
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChangeUsername(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>PASSWORD:</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control input-text"
                    placeholder="Enter your Password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangePassword(event)}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                  <span onClick={this.handleShowHidePassword}>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </button>
              </div>
              <div className="col-12">
                <span className="forgot-password">Forgot your password</span>
              </div>
              <div className="col-12 text-center mt-3">
                <span className="text-other-login">Or login with:</span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-google-plus-g google"></i>
                <i className="fab fa-facebook-f facebook"></i>
              </div>
            </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
