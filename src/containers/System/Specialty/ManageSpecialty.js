import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",

      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data && data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new Specialty Success!!");
    } else {
      toast.error("Something wrong, please try again!!");
      console.log("Check state", this.state);
    }
  };
  render() {
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">
            <span>Quản lý chuyên khoa</span>
          </div>
          <div className="add-new-specialty">
            <div className="row">
              <div className="col-6 form-group">
                <label>Tên chuyên khoa</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label>Ảnh chuyên khoa</label>
                <div className="preview-img-container">
                  <input
                    id="preview-img"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="preview-img">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div
              className="col-md-1 btn btn-primary btn-save-specialty"
              onClick={() => {
                this.handleSaveNewSpecialty();
              }}
            >
              Save Specialty
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
