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
      inputData.map((item, index) => {
        let object = {};
        let labelEn =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueEn;
        let labelVi =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueVi;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
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
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      this.setState({
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
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
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
              placeholder={"Chọn bác sĩ"}
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id={"admin.manage-doctor.intro"} />
            </label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>Choose Price</label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChangeSelect}
              options={this.state.listPrice}
              placeholder={"Chọn giá"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Choose pay method</label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChangeSelect}
              options={this.state.listPayment}
              placeholder={"Chọn phương thức thanh toán"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Choose Province</label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChangeSelect}
              options={this.state.listProvince}
              placeholder={"Chọn tỉnh thành"}
            />
          </div>

          <div className="col-4 form-group">
            <label>Clinic Name</label>
            <input className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label>Clinic Adress</label>
            <input className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label>Note</label>
            <input className="form-control" />
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
