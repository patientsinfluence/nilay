import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { HiOutlineMinusSm } from "react-icons/hi";
import { FiCalendar } from "react-icons/fi";
export default function FilterDetail() {
  const [startDateRange, setStartDateRange] = useState([null, null]);
  const [endDateRange, setEndDateRange] = useState([null, null]);

  const test_Option = ["A", "B", "C", "D", "EE", "FFF", "GGG"];

  return (
    <Col>
      <div className="filterContainer">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Company</Form.Label>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                options={test_Option}
                placeholder="Select Company"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Client</Form.Label>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                options={test_Option}
                placeholder="Select Client"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Location</Form.Label>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                options={test_Option}
                placeholder="Select Location"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Disease Area</Form.Label>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                options={test_Option}
                placeholder="Select Disease Area"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Platform</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Select Platform</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Youtube</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Numbers of Influencer</Form.Label>
              <Row className="mb-6 dashiconcol">
                <HiOutlineMinusSm color="#7e839f" className="dashicon" />
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Control
                    type="text"
                    placeholder="Min"
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Control type="text" placeholder="Max" />
                </Form.Group>
              </Row>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Influencer Size</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Select Influencer Size</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Promotion Type</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Select Promotion Type</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3 starteand-col">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Start</Form.Label>
              <div className="startfinishdate-fild">
              <DatePicker
                selectsRange={true}
                onChange={(date) => setStartDateRange(date)}
                startDate={startDateRange[0]}
                endDate={startDateRange[1]}
                placeholderText="Select Start Date"
              />
              <FiCalendar color="#6D728E" />
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>End</Form.Label>
              <div className="startfinishdate-fild">
              <DatePicker
                selectsRange={true}
                onChange={(date) => setEndDateRange(date)}
                startDate={endDateRange[0]}
                endDate={endDateRange[0]}
                minDate={startDateRange[0]}
                placeholderText="Select End Date"
              />
              <FiCalendar color="#6D728E" />
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Budget</Form.Label>
              <Row className="mb-3 dashiconcol">
                <HiOutlineMinusSm color="#7e839f" className="dashicon" />
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Control type="text" placeholder="Min" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Control type="text" placeholder="Max" />
                </Form.Group>
              </Row>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState"></Form.Group>
          </Row>
        </Form>
        <div className="btnCont">
          <Button className="primBtn cmmBtn">Filter</Button>
          <Button className="ligBtn cmmBtn">
            <span className="clrBtn">00</span>Clear all filter
          </Button>
        </div>
      </div>
    </Col>
  );
}
