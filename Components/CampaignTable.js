import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Pagination,
  Table,
  Figure,
} from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRouter } from "next/router";
import { MdOutlineDateRange } from "react-icons/md";

import Image from "next/image";
import moment from "moment/moment";
import ProfilePic from "../public/Images/profile-circle-2 1profil.png";

import AddresscardIcon from "../public/Images/address-card-regular.png";
import ShedualIcon from "../public/Images/shedual-icon.png";
import TrashIcon from "../public/Images/trash-solid.png";
import PeneditIcon from "../public/Images/pen-to-square-solid.png";
import PreviousCommentsComponent from "./PreviousCommentsComponent";
import TimePicker from "react-times";

import "react-times/css/material/default.css";
import "react-datepicker/dist/react-datepicker.css";

export default function CampaignTable() {
  const ref = useRef();
  const router = useRouter();
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  let [isActive, setIsActive] = useState("Preparation");
  const [tableChange, setTableChange] = useState("Preparation");
  const [action, setAction] = useState();
  const [actionShow, setActionShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [actionContChoose, setActionContChoose] = useState("Default");
  const [multiSelections, setMultiSelections] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [editShow, setEditShow] = useState(false);
  const [beginDate, setBeginDate] = useState(new Date().toLocaleDateString());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [commentText, setCommentText] = useState("");
  const calendarRef = useRef();
  const [allDay, setAllDay] = useState(false);
  const optionLabel = ["Product Designer", "UI", "App Design", "UX"];
  const options = ["A", "B", "C", "D", "EE", "FFF", "GGG"];

  const [previousComments, setPreviousComments] = useState([
    "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    "Cicero are also reproduced in their exact original form",
  ]);

  const handleAlertClose = () => setShowAlert(false);
  const handleActionClose = () => setActionShow(false);
  const handleActionShow = () => setActionShow(true);
  const handleEditClose = () => setEditShow(false);

  const handleAlertShow = () => {
    setShowAlert(true);
    handleActionClose();
  };

  function handleSwitch(camp) {
    setIsActive((isActive = camp));
    setTableChange(camp);
  }

  function handleAction(actionType) {
    handleActionShow();
    setAction(actionType);
  }

  const openDateRange = () => {
    setOpenDatePicker(true);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.hour + ":" + event.minute);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.hour + ":" + event.minute);
  };

  const handleSelect = (event) => {
    setBeginDate(new Date(event).toLocaleDateString());
    setOpenDatePicker(false);
  };

  const handleAllDayCheck = (event) => {
    console.log(event);
    setAllDay(event.target.checked);
  };

  const handlePreviousCommentAction = (actionName, position) => {
    if (actionName === "remove") {
      setPreviousComments(
        previousComments.filter((comment, index) => {
          return index !== position;
        })
      );
    }
    if (actionName === "edit") {
      setEditing(true);
    }
    if (actionName === "cancel") {
      setEditing(false);
    }
  };

  const saveComment = (newComment, index) => {
    let temp = previousComments;
    temp[index] = newComment;
    setPreviousComments(
      previousComments.map((comment, pos) => {
        if (pos === index) {
          {
            return newComment;
          }
        } else {
          return comment;
        }
      })
    );
  };

  const addComent = () => {
    setPreviousComments([...previousComments, commentText]);
    setCommentText("");
  };

  return (
    <Col lg={12}>
      <div className="campainTableContainer">
        <div className="miniNav">
          <Button
            variant="link"
            className={`switchBtn1 ${
              isActive === "Preparation" ? "activeBtn" : "inactiveBtn"
            }`}
            onClick={() => {
              handleSwitch("Preparation");
            }}
          >
            Campaigns in preparation<span>03</span>
          </Button>
          <Button
            variant="link"
            className={`switchBtn1 ${
              isActive === "Ongoing" ? "activeBtn" : "inactiveBtn"
            }`}
            onClick={() => {
              handleSwitch("Ongoing");
            }}
          >
            Ongoing campaigns<span>01</span>
          </Button>
          <Button
            variant="link"
            className={`switchBtn1 ${
              isActive === "Finished" ? "activeBtn" : "inactiveBtn"
            }`}
            onClick={() => {
              handleSwitch("Finished");
            }}
          >
            Finished campaigns<span>02</span>
          </Button>
          <Button
            variant="link"
            className={`switchBtn1 ${
              isActive === "Report" ? "activeBtn" : "inactiveBtn"
            }`}
            onClick={() => {
              handleSwitch("Report");
            }}
          >
            Archived campaigns<span>06</span>
          </Button>
        </div>
        <Table className="cptablecampaing" cellPadding={10} cellSpacing={10} responsive>
          <thead className="custTableHead">
            <tr>
              <th className="cp-thClients">
                {" "}
                <Form>
                  <Form.Check type="checkbox" label="Clients" />
                </Form>
              </th>
              <th>Product</th>
              <th>Start & Finish Date</th>
              <th>Influencers</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((num, index) => {
              return (
                <tr
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("singlecampaignstable");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className="userinfo">
                      <Form>
                        <Form.Check
                          type="checkbox"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Form>
                      <div style={{ margin: "0px 10px" }}>
                        <Image src={ProfilePic} width="50px" height="50px" />
                      </div>
                      <div>
                        <span>Minhas Asif</span>
                        <span>Multiple Sclerosis</span>
                      </div>
                    </div>
                  </td>
                  <td>Depression App</td>
                  <td>
                    <div className="dateBox">
                      {`${moment(dateRange[0]).format("LL")} - ${moment(
                        dateRange[1]
                      ).format("LL")}`}{" "}
                      <MdOutlineDateRange
                        style={{ marginLeft: "5px" }}
                        size={20}
                      />
                    </div>
                  </td>
                  <td>50</td>
                  <td>$700</td>
                  <td align="center" onClick={(e) => e.stopPropagation()}>
                    <DropdownButton
                      className="campfilter-dropdown"
                      variant="link"
                      id="dropdown-basic-button"
                      title={<BsThreeDotsVertical />}
                    >
                      {tableChange == "Preparation" ? (
                        <Dropdown.Item
                          onClick={() => handleAction("StarttoOngoing")}
                        >
                          <span>{/* <BsPlusLg color="#C7CCE1" /> */}</span>
                          Start campaign
                        </Dropdown.Item>
                      ) : tableChange == "Ongoing" ? (
                        <Dropdown.Item
                          onClick={() => handleAction("OngoingtoFinished")}
                        >
                          <span>{/* <BsPlusLg color="#C7CCE1" /> */}</span>
                          Finish campaign
                        </Dropdown.Item>
                      ) : (
                        tableChange == "Finished" && (
                          <>
                            <Dropdown.Item /*onClick={() => handleAction('FinishedToReport')}*/
                            >
                              <span>{/* <BsPlusLg color="#C7CCE1" /> */}</span>
                              Archive
                            </Dropdown.Item>
                            <Dropdown.Item /*onClick={() => handleAction('FinishedToReport')}*/
                            >
                              <span>{/* <BsPlusLg color="#C7CCE1" /> */}</span>
                              Create report
                            </Dropdown.Item>
                          </>
                        )
                      )}
                      <Dropdown.Item onClick={() => handleAction("Contact")}>
                        <Image alt="AddresscardIcon" src={AddresscardIcon} />
                        Contact
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("Note")}>
                        <Image alt="PeneditIcon" src={PeneditIcon} />
                        Note
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("Schedule")}>
                        <Image alt="ShedualIcon" src={ShedualIcon} />
                        Schedule
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Image alt="TrashIcon" src={TrashIcon} />
                        Remove
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="cptable-breadcrums">
          <Pagination>
            <Pagination.First />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item active>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{32}</Pagination.Item>
            <Pagination.Last />
          </Pagination>
        </div>
      </div>

      {/* actionModal */}

      <Modal className="cpStartcampaign-modal" centered show={actionShow} onHide={handleActionClose}>
        {action === "StarttoOngoing" && (
          <Modal.Body className="actdionModal">
            <div className="actionCloseImage" onClick={handleActionClose}>
              <Image
                src="/Images/close.png"
                alt="close"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            <h2>Start campaign</h2>

            <div className="actionDm">
              <div className="mvBtnSec">
                <Button>Campaigns in preparation</Button> to{" "}
                <Button>Ongoing campaigns</Button>
              </div>
              <div className="btnRightCont">
                <Button
                  className="primBtn cmmBtn sendBtn"
                  onClick={handleAlertShow}
                >
                  Move
                </Button>
              </div>
            </div>
          </Modal.Body>
        )}

        {action === "OngoingtoFinished" && (
          <Modal.Body className="actdionModal">
            <div className="actionCloseImage" onClick={handleActionClose}>
              <Image
                src="/Images/close.png"
                alt="close"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            <h2 className="text-left">Are you sure?</h2>
            <p style={{color: '#7E839F'}}>
              Are you sure you want to finish the campaign? Operation cannot be
              undone.
            </p>
            <div className="btnCenterContainer cpbtnfinishareyou">
              <Button
                className="primBtn cpnobtn ligBtn cmmBtn sendBtn"
                onClick={handleActionClose}
              >
                No
              </Button>
              <Button
                className="primBtn cmmBtn sendBtn"
                onClick={handleActionClose}
              >
                Yes
              </Button>
            </div>
          </Modal.Body>
        )}

        {action === "Contact" && (
          <Modal.Body className="actdionModal">
            
            <div className="actionCloseImage" onClick={handleActionClose}>
              <Image
                src="/Images/close.png"
                alt="close"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            
            <h2 className="text-left">Contact @Client</h2>

            {actionContChoose === "Direct Message" && (
              <div className="actionDm">
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="messageHeading">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    type="text"
                    placeholder="Text"
                    style={{ backgroundColor: "#fff" }}
                    className="emailModalTextArea"
                  />
                </Form.Group>
                <div className="btnRightCont">
                  <Button className="primBtn cmmBtn sendBtn">Send</Button>
                </div>
              </div>
            )}
            {(actionContChoose === "Default" ||
              actionContChoose === "Email") && (
              <div className="actionDm">
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="emailModalSubject">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Subject"
                    style={{ backgroundColor: "#fff" }}
                    className="emailModalTextField"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="emailModalSubject">
                    Receiver
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    style={{ backgroundColor: "#fff" }}
                    className="emailModalTextField"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="emailModalSubject">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ backgroundColor: "#fff" }}
                    placeholder="Enter Message"
                    className="emailModalTextArea"
                  />
                </Form.Group>
                <div className="btnRightCont">
                  <Button className="primBtn cmmBtn sendBtn">Send</Button>
                </div>
              </div>
            )}
          </Modal.Body>
        )}

        {action === "Note" && (
          <Modal.Body className="scheduleModal actdionModal ">
            <div className="actionCloseImage" onClick={handleActionClose}>
              <Image
                src="/Images/close.png"
                alt="close"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            <h2 className="text-left">Note</h2>
            <Form.Label className="emailModalSubject">Type</Form.Label>
            <Form.Select
              onChange={(e) => setActionContChoose(e.target.value)}
              defaultValue="Choose..."
              className="noteModalTextField"
            >
              <option>Comment</option>
              <option>Label</option>
            </Form.Select>
            {(actionContChoose === "Default" ||
              actionContChoose === "Comment") && (
              <div className="mt-3">
                <Form.Label className="scheduleModalSubject">
                  Comment
                </Form.Label>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Control
                    className="emailModalTextArea"
                    as="textarea"
                    value={commentText}
                    placeholder="Enter comment"
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    style={{ backgroundColor: "#fff" }}
                  />
                </Form.Group>

                {previousComments.length > 0 ? (
                  <div className="noteModalPreviousWrapper">
                    <Form.Label className="emailModalSubject">
                      Previous Comments
                    </Form.Label>
                    {previousComments.map((comment, index) => (
                      <PreviousCommentsComponent
                        key={index}
                        comment={comment}
                        handleEditClose={handleEditClose}
                        handlePreviousCommentAction={
                          handlePreviousCommentAction
                        }
                        index={index}
                        saveComment={saveComment}
                      />
                    ))}
                  </div>
                ) : null}
                <div className="btnRightCont">
                  <Button
                    className="primBtn cmmBtn noteModalBtn"
                    onClick={addComent}
                  >
                    Add Comment
                  </Button>
                </div>
              </div>
            )}
            {actionContChoose === "Label" && (
              <div className="noteModalGroup">
                <Form.Group className="labelGroup" controlId="formGridState">
                  <Form.Label className="noteModalSelection">
                    Existing labels:
                  </Form.Label>
                  {optionLabel?.length > 3 ? (
                    <>
                      <Form.Label className="noteModalOptions">{`${optionLabel[0]}`}</Form.Label>
                      <span className="noteModalSelection">, </span>
                      <Form.Label className="noteModalOptions">{`${optionLabel[1]}`}</Form.Label>
                      <span className="noteModalSelection">, </span>
                      <Form.Label className="noteModalOptions">{`${optionLabel[2]}`}</Form.Label>
                    </>
                  ) : (
                    optionLabel.map((label) => {
                      <>
                        <Form.Label className="noteModalOptions">
                          {label}
                        </Form.Label>
                        <span className="noteModalSelection">, </span>
                      </>;
                    })
                  )}
                  <Typeahead
                    defaultSelected={optionLabel.slice(0, 1)}
                    id="public-methods-example"
                    allowNew
                    onChange={handleLabelChange}
                    labelKey="name"
                    multiple
                    options={optionLabel}
                    placeholder="Add Label"
                    newSelectionPrefix="Add a new label: "
                    ref={ref}
                  />
                </Form.Group>
                <div className="btnRightCont">
                  <Button className="primBtn cmmBtn schedultBtn">Save</Button>
                </div>
              </div>
            )}
          </Modal.Body>
        )}

        {action === "Schedule" && (
          <Modal.Body className="scheduleModal actdionModal">
            <div className="actionCloseImage" onClick={handleActionClose}>
              <Image
                src="/Images/close.png"
                alt="close"
                width="10px"
                height="10px"
                objectFit="contain"
              />
            </div>
            <h2 className="text-left">Schedule</h2>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="emailModalSubject">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add Title"
                className="scheduleModalTextField"
                style={{ backgroundColor: "#fff" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="emailModalSubject">Type</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                className="scheduleModalTextField"
              >
                <option>Please Select</option>
                <option>Meeting</option>
                <option>Task</option>
                <option>Reminder</option>
              </Form.Select>
            </Form.Group>
            <div className="dateTime">
              <div className="dateCont">
                <Form.Label className="emailModalSubject">Date</Form.Label>
                <Form.Control
                  type="text"
                  value={`${beginDate}`}
                  style={{ backgroundColor: "#fff" }}
                  className="emailModalTextField"
                  onClick={openDateRange}
                />
              </div>
              <div className="timeLabel">
                <Form.Label className="emailModalSubject">Time</Form.Label>
                <div className="timeContainer">
                  <div style={{ marginRight: "10px" }}>
                    <TimePicker
                      time={startTime}
                      onTimeChange={handleStartTimeChange}
                    />
                  </div>
                  <span>-</span>
                  <TimePicker
                    time={endTime}
                    onTimeChange={handleEndTimeChange}
                  />
                </div>
              </div>
              <div className="allDayCont">
                <span className="emailModalSubject">{"All Day "}</span>
                <Form.Check
                  type="checkbox"
                  checked={allDay}
                  onChange={handleAllDayCheck}
                  className="checkboxContainer"
                />
              </div>
            </div>
            {openDatePicker && (
              <div className="date" ref={calendarRef}>
                <Calendar onChange={handleSelect} minDate={new Date()} />
              </div>
            )}
            {/* <Form.Group
              className="mb-3 scheduleDateGroup"
              controlId="formGroupEmail"
            >
              <Form.Label className="emailModalSubject">Date</Form.Label>
              <Form.Control
                type="text"
                value={`${beginDate}`}
                style={{ backgroundColor: "#fff" }}
                className="emailModalTextField"
                onClick={openDateRange}
              />
              <div className="timeCont">
                <Form.Label className="emailModalSubject">Time</Form.Label>
                <TimePicker
                  time={startTime}
                  onTimeChange={handleStartTimeChange}
                />
                <TimePicker time={endTime} onTimeChange={handleEndTimeChange} />
              </div>
              <div className="checkboxCont">
                <span className="emailModalSubject">{"All Day "}</span>
                <Form.Check
                  type="checkbox"
                  checked={allDay}
                  onChange={handleAllDayCheck}
                />
              </div>
            </Form.Group> */}
            <Form.Group
              className="mb-3 scheduleModalInfluenersGroup"
              controlId="formGroupEmail"
            >
              <Form.Label className="emailModalSubject">Influencer</Form.Label>
              <Typeahead
                id="basic-typeahead-multiple"
                labelKey="name"
                multiple
                onChange={setMultiSelections}
                options={options}
                placeholder="Please Select"
                selected={multiSelections}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="emailModalSubject">Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Add description"
                className="scheduleModalTextField"
                rows={2}
                style={{ backgroundColor: "#fff" }}
              />
            </Form.Group>
            <div className="btnRightCont">
              <Button className="primBtn cmmBtn schedultBtn">Save</Button>
            </div>
          </Modal.Body>
        )}
      </Modal>

      <Modal show={showAlert} onHide={handleAlertClose}>
        <Modal.Body className="actdionModal">
          <h2>
            Are you sure you want to move this Campaigns in preparation to
            Ongoing campaigns?
          </h2>

          <div className="btnCenterCont">
            <Button
              className="primBtn cmmBtn sendBtn"
              onClick={() => setShowAlert(false)}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Col>
  );
}
