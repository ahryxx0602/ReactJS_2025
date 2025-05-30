import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      doctorId: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGender();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataScheduleTime != prevProps.dataScheduleTime) {
      if (
        this.props.dataScheduleTime &&
        !_.isEmpty(this.props.dataScheduleTime)
      ) {
        let doctorId = this.props.dataScheduleTime.doctorId;
        let timeType = this.props.dataScheduleTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataScheduleTime) => {
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
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataScheduleTime) => {
    let { language } = this.props;

    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataScheduleTime.doctorData.lastName} ${dataScheduleTime.doctorData.firstName}`
          : `${dataScheduleTime.doctorData.firstName} ${dataScheduleTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let doctorId = this.props.dataScheduleTime?.doctorId || "";
    let timeType = this.props.dataScheduleTime?.timeType || "";
    let language = this.props.language;
    let doctorName = this.buildDoctorName(this.props.dataScheduleTime);
    let timeString = this.buildTimeBooking(this.props.dataScheduleTime);
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGenders: this.state.selectedGenders
        ? this.state.selectedGenders.value
        : "",
      doctorId,
      timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking a new Appointment success!");
      this.props.closeBookingClose();
    } else {
      toast.error("Booking a new Appointment fail!");
    }
  };
  render() {
    let { isOpenModal, closeBookingClose, dataScheduleTime } = this.props;
    let doctorId = "";
    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      doctorId = dataScheduleTime.doctorId;
    }

    console.log("Check: ", dataScheduleTime);
    return (
      <Modal
        isOpen={isOpenModal}
        className="booking-modal-container"
        size="lg"
        centered
        //   backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingClose}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataScheduleTime)} */}
            <div className="doctor-info">
              {/* Profile - Doctor */}
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataScheduleTime={dataScheduleTime}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.genders" />
                </label>
                <Select
                  value={this.state.selectedGenders}
                  onChange={this.handleOnChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn btn-primary btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.confirm" />
            </button>
            <button
              className="btn btn-warning btn-booking-cancel"
              onClick={closeBookingClose}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
