import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Form, Row, Figure } from "react-bootstrap";
import FilterDetail from "./FilterDetail";
import { FiCalendar } from "react-icons/fi";
import { BsFillCaretDownFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import CampaignTable from "./CampaignTable";
import Modal from "react-bootstrap/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import SliderHorizontal from "../public/svg/slider_horizontal";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "react-datepicker/dist/react-datepicker.css";

export default function FilterCampaignSec() {
  const ref = useRef();

  const [showFilter, setShowFilter] = useState(false);
  const [show, setShow] = useState(false);
  const [switchNav, setSwitchNav] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [multiSelections, setMultiSelections] = useState([]);
  const [exportShow, setExportShow] = useState(false);
  const [displayPostTypeImg, setDisplayPostTypeImg] = useState("");
  const [PostTypeImg, setPostTypeImg] = useState({});
  const [socialMediaValue, setSocailMediaValue] = useState("");
  const test_Option = ["A", "B", "C", "D", "EE", "FFF", "GGG"];

  const socialMedia = ["Instagram", "YouTube", "TikTok"];

  const [data, setData] = useState({
    amountCurrencyType: "CHF",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleExportClose = () => setExportShow(false);
  const handleExportShow = () => setExportShow(true);

  useEffect(() => {
    setSwitchNav("Default");
  }, []);

  const hannleNextStep = (step) => {
    setSwitchNav(step);
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      var size = event.target.files[0].size;
      var type = event.target.files[0].type;
      if (
        type == "image/png" ||
        type == "image/jpg" ||
        type == "image/jpeg" ||
        type == "application/pdf"
      ) {
        var file = event.target.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          var searhData = fileReader.result;
          setPostTypeImg({
            imageData: searhData,
            imageName: file.name,
            type: type,
          });
        };

        var url = URL.createObjectURL(file);
        setDisplayPostTypeImg(url);
      }
    } else {
      setPostTypeImg({});
      setDisplayPostTypeImg("");
    }
  };

  const upload = () => {
    document.getElementById("selectImage").click();
  };

  const removePostUp = () => {
    setPostTypeImg({});
    setDisplayPostTypeImg("");
  };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="mainFilterSec">
      <Row>
        <Col lg={12}>
          <div className="contentNav">
            <div className="heading">
              <h2>Campaigns</h2>
              <span>20 new Campaigns</span>
            </div>
            <div>
              <Button
                className={`ligBtn  cpfilterbtn ${
                  showFilter
                    ? "outlinedBtn cmmBtn active"
                    : "outlinedBtn cmmBtn"
                }`}
                onClick={() => setShowFilter((prevState) => !prevState)}
              >
                <SliderHorizontal /> Filters
              </Button>
              <Button
                className="ligBtn cpexportcmnbtn cmmBtn"
                onClick={handleExportShow}
              >
                Export{" "}
              </Button>
              <Button className="primBtn cmmBtn" onClick={handleShow}>
                Add Campaign
              </Button>
            </div>
          </div>
        </Col>
        {showFilter && <FilterDetail />}
        <CampaignTable />
      </Row>

      {/* Add New Campagin Button Modal */}

      <Modal
        className="campModalAdd AddcampaginModal"
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title id="AddnewCampagin">
            <h2>Create Campaign</h2>
          </Modal.Title>
          <div className="campModalNav">
            <Button
              className={
                switchNav === "Info" || switchNav === "Default" ? "active" : ""
              }
              onClick={() => setSwitchNav("Info")}
            >
              Info
            </Button>
            <Button
              className={switchNav === "Target" ? "active" : ""}
              onClick={() => setSwitchNav("Target")}
            >
              Target
            </Button>
            <Button
              className={switchNav === "Inst" ? "active" : ""}
              onClick={() => setSwitchNav("Inst")}
            >
              Instructions
            </Button>
          </div>
          <Button className="btn-close" onClick={handleClose}>
            <CgClose color="#6D728E" />
          </Button>
        </Modal.Header>

        {(switchNav === "Info" || switchNav === "Default") && (
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-20" controlId="formGroupEmail">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGridState">
                  <Form.Label>Client</Form.Label>
                  <div className="cpformfild-wrap">
                    <Typeahead
                      id="basic-typeahead-single"
                      labelKey="name"
                      options={test_Option}
                      placeholder="Please Select"
                    />
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please Select"
                    rows={3}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Product Info</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please Select"
                    rows={3}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-24 startfinishdate-group"
                  controlId="formGroupEmail"
                >
                  <Form.Label>Start & Finish date</Form.Label>
                  <div className="startfinishdate-fild">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        components={{
                          OpenPickerIcon: FiCalendar,
                        }}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="startfinishdate-fild">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        value={endDate}
                        onChange={(newValue) => {
                          setEndDate(newValue);
                        }}
                        components={{
                          OpenPickerIcon: FiCalendar,
                        }}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Package</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Select defaultValue="Choose...">
                      <option>Please Select</option>
                      <option>Package 1</option>
                      <option>Package 2</option>
                      <option>Package 3</option>
                    </Form.Select>
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20" controlId="formGroupEmail">
                  <Form.Label>Report</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Select defaultValue="Choose...">
                      <option>Please Select</option>
                      <option>Report 1</option>
                      <option>Report 2</option>
                      <option>Report 3</option>
                    </Form.Select>
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-20 cpamount-fildiv"
                  controlId="formGroupEmail"
                >
                  <Form.Label>Amount</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Control type="number" placeholder="Please Select" />
                  </div>
                  <div className="cpformfild-wrap">
                    <Form.Select
                      defaultValue="Choose..."
                      value={data.amountCurrencyType}
                      onChange={(e) => onChange(e)}
                      name="amountCurrencyType"
                    >
                      <option value="">Please Select</option>
                      <option value="CHF">CHF</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </Form.Select>
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              {/*
              <Col md={12}>
                <Form.Group className="mb-20" controlId="formGroupEmail">
                  <Form.Label>Target Audience Info</Form.Label>
                  <Form.Control type="text" placeholder="Enter Target Audience Info" style={{backgroundColor: "#fff"}}/>
                </Form.Group>
              </Col>
              */}
            </Row>
            <Row className="cpbtn-row">
              <Col md={12}>
                <Button
                  className="primBtn cmmBtn"
                  style={{ width: "100%" }}
                  onClick={() => hannleNextStep("Target")}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        )}
        {switchNav === "Target" && (
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Number of Influencers</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Control type="number" placeholder="Number" />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Influencer size</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Select defaultValue="Choose...">
                      <option>Please Select</option>
                      <option>Size 1</option>
                      <option>Size 2</option>
                      <option>Size 3</option>
                    </Form.Select>
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24">
                  <Form.Label>Disease area</Form.Label>
                  <div className="cpformfild-wrap">
                    <Typeahead
                      id="basic-typeahead-multiple"
                      labelKey="name"
                      multiple
                      onChange={setMultiSelections}
                      options={test_Option}
                      placeholder="Please Select"
                      selected={multiSelections}
                    />
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGridState">
                  <Form.Label>Location</Form.Label>
                  <div className="cpformfild-wrap">
                    <Typeahead
                      id="basic-typeahead-single"
                      labelKey="name"
                      options={test_Option}
                      placeholder="Please Select"
                    />
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24">
                  <Form.Label>Age range</Form.Label>
                  <div className="cpformfild-wrap">
                    <Typeahead
                      id="basic-typeahead-multiple"
                      labelKey="name"
                      multiple
                      onChange={setMultiSelections}
                      options={test_Option}
                      placeholder="Please Select"
                      selected={multiSelections}
                    />
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Gender</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Select defaultValue="Choose...">
                      <option>Please Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Target audience info</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Info"
                    rows={3}
                    style={{ height: "auto" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="cpbtn-row">
              <Col md={12}>
                <Button
                  className="primBtn cmmBtn"
                  style={{ width: "100%" }}
                  onClick={() => hannleNextStep("Inst")}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        )}
        {switchNav === "Inst" && (
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGridState">
                  <Form.Label>Social media</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Select
                      defaultValue="Choose..."
                      value={socialMediaValue}
                      onChange={(e) => setSocailMediaValue(e.target.value)}
                    >
                      <option>Please Select</option>
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                    </Form.Select>

                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-24" controlId="formGroupEmail">
                  <Form.Label>Post type</Form.Label>
                  <div className="cpformfild-wrap">
                    <Form.Select defaultValue="Choose...">
                      <option>Please Select</option>
                      {socialMediaValue == "Instagram" ? (
                        <>
                          <option>Post</option>
                          <option>Reel</option>
                          <option>Story</option>
                        </>
                      ) : socialMediaValue == "YouTube" ? (
                        <>
                          <option>10sec video</option>
                          <option>30sec video</option>\
                          <option>60sec video</option>
                        </>
                      ) : (
                        socialMediaValue == "TikTok" && (
                          <>
                            <option>Post</option>
                          </>
                        )
                      )}
                    </Form.Select>
                    <BsFillCaretDownFill
                      color="#9F9FB0"
                      className="downarrow-iconsvg"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="formFile" className="mb-24">
                  <Form.Label>Image:</Form.Label>
                  <input
                    style={{ display: "none" }}
                    id="selectImage"
                    type="file"
                    name="profile"
                    onChange={handleFileChange}
                  />
                  <Button
                    onClick={upload}
                    className="ligBtn Change_profile_photo"
                  >
                    Upload
                  </Button>
                  {displayPostTypeImg && (
                    <p className="cpfilename-p">{PostTypeImg.imageName}</p>
                  )}

                  {displayPostTypeImg && (
                    <div className="imageupload-previewdiv">
                      {PostTypeImg.imageData &&
                      PostTypeImg.type == "application/pdf" ? (
                        <div className="imageupload-boxdiv">
                          <div className="imageupload-close">
                            <CgClose color="#ffffff" onClick={removePostUp} />
                          </div>
                          <embed
                            src={displayPostTypeImg}
                            width="100%"
                            height="100%"
                          />
                        </div>
                      ) : (
                        <div className="imageupload-boxdiv">
                          <div className="imageupload-close">
                            <CgClose color="#ffffff" onClick={removePostUp} />
                          </div>
                          <Figure.Image alt="80x80" src={displayPostTypeImg} />
                        </div>
                      )}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group
                  className="mb-24"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={displayPostTypeImg ? 3 : 10}
                    style={{ height: "auto" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="cpbtn-row">
              <Col md={12}>
                <Button
                  className="primBtn cmmBtn"
                  style={{ width: "100%" }}
                  onClick={() => hannleNextStep("final")}
                >
                  Add new Campagin
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        )}
      </Modal>

      {/* export Modal */}
      <Modal
        show={exportShow}
        onHide={handleExportClose}
        className="expoModalOuter"
      >
        <Modal.Body>
          <b>Do you want to export:</b>
          <br />
          <div
            className="expoModalCOnt"
            style={{ justifyContent: "flex-start" }}
          >
            <Form.Check
              type="checkbox"
              label="All"
              style={{ marginRight: "10px" }}
            />
            <Form.Check type="checkbox" label="Selected" />
          </div>
          <div className="btnCenCont">
            <Button className="primBtn cmmBtn expoBtn">Export</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
