import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import moment from "moment/moment";
import ProfilePic from "../public/Images/profile-circle-2 1profil.png";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import DateNoti from "../Components/DateNoti";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

import AddresscardIcon from "../public/Images/address-card-regular.png";
import ShedualIcon from "../public/Images/shedual-icon.png";
import TrashIcon from "../public/Images/trash-solid.png";
import PeneditIcon from "../public/Images/pen-to-square-solid.png";
import InfluencerDetailsPopUp from "../Components/InfluencerDetailsPopUp";
import InfluencerTableModal from "../Components/InfluencerTableModal";

export default function SingleCampaignsTable() {
  const ref = useRef();
  const router = useRouter();
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [action, setAction] = useState();
  const [actionContChoose, setActionContChoose] = useState("Default");
  const [multiSelections, setMultiSelections] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [infuDetailShow, setInfuDetailShow] = useState(false);
  const [actionShow, setActionShow] = useState(false);
  const optionLabel = ["Product Designer", "UI", "App Design", "UX"];

  const handleActionClose = () => setActionShow(false);
  const handleActionShow = () => setActionShow(true);
  const handleInfuDetailClose = () => setInfuDetailShow(false);
  const handleInfuDetailShow = () => setInfuDetailShow(true);

  function handleAction(actionType) {
    handleActionShow();
    setAction(actionType);
  }

  return (
    <Row>
      <Col lg={9} className="TableCol cpsinglecampaign-TableCol">
        <div className="cpsinglecampaign_list">
          <h2 className="heading">Single Campagain Table</h2>
          <Table>
            <thead className="custTableHead">
              <tr>
                
                <th style={{paddingLeft:25}}>Username</th>        
                <th className="center">Campaigns</th>
                <th className="center">CPC</th>
                <th className="center">CPT</th>
                <th className="center">Price</th>
                <th className="center">Overlap</th>
                <th className="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((num, index) => {
                return (
                  <tr
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfuDetailShow();
                    }}
                  >
                    <td>
                      <div className="userinfo">                        
                        <div
                          onClick={handleInfuDetailShow}
                          style={{ margin: "0px 10px" }}
                        >
                          <Image src={ProfilePic} width="50px" height="50px" />
                        </div>
                        <div onClick={handleInfuDetailShow}>
                          <span>Minhas Asif</span>
                          <span>Multiple Sclerosis</span>
                        </div>
                      </div>
                    </td>
                    <td className="center">50</td>
                    <td className="center">$7</td>
                    <td className="center">$10</td>
                    <td className="center">$20 </td>
                    <td className="center">20</td>
                    <td className="center" onClick={(e) => e.stopPropagation()}>
                      <DropdownButton
                        variant="link"
                        className="campfilter-dropdown"
                        id="dropdown-basic-button"
                        title={<BsThreeDotsVertical />}
                      >
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
                      </DropdownButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="cpprevious_btn">
            <Button className="ligBtn" onClick={() => router.push("campaigns")}>
              Previous
            </Button>
          </div>
        </div>
      </Col>
      <Col lg={3}>
        <DateNoti />
      </Col>

      <InfluencerDetailsPopUp
        handleInfuDetailClose={handleInfuDetailClose}
        infuDetailShow={infuDetailShow}
        setInfuDetailShow={setInfuDetailShow}
      />

      {/* actionModal */}

      <InfluencerTableModal
        actionShow={actionShow}
        handleActionClose={handleActionClose}
        action={action}
        actionContChoose={actionContChoose}
        setActionContChoose={setActionContChoose}
        optionLabel={optionLabel}
        ref={ref}
        setMultiSelections={setMultiSelections}
        multiSelections={multiSelections}
      />
    </Row>
  );
}
