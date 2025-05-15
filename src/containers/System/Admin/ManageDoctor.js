import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { toast } from "react-toastify";
import { getDetailInfoDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  //Khoi tao
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      HasOldData: false,
      //List info doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  buildDataInputSelect = (inputData, type) => {
    console.log("Check inputData", inputData);
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.lastName} ${item.firstName}`;
          let labelVi = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.valueEn} USD`;
          let labelVi = `${item.valueVi} VND`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.valueEn}`;
          let labelVi = `${item.valueVi}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      console.log("allRequiredDoctorInfo:", this.props.allRequiredDoctorInfo);
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      console.log("resPayment:", resPayment);
      console.log("resProvince:", resProvince);
      console.log("resPrice:", resPrice);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,

      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listProvince, listPrice } = this.state;
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;

        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
  };

  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id={"admin.manage-doctor.title"} />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.select-doctor"} />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id={"admin.manage-doctor.select-doctor"} />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id={"admin.manage-doctor.intro"} />
            </label>
            <textarea
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.price"} />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id={"admin.manage-doctor.choose-price"} />
              }
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.payment"} />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id={"admin.manage-doctor.choose-payment"} />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.province"} />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id={"admin.manage-doctor.choose-province"} />
              }
              name="selectedProvince"
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.clinic-name"} />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.clinic-address"} />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-doctor.note"} />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <FormattedMessage id={"admin.manage-doctor.save"} />
          ) : (
            <FormattedMessage id={"admin.manage-doctor.add"} />
          )}
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
