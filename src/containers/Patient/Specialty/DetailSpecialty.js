import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import Header from "../../Header/Header";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>Hello from Detail Specialty</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
