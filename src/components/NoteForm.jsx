import React from "react";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import Calendar from "react-calendar";
import { Row, Card, Form, Button, Accordion } from "react-bootstrap";

import { Spacer } from ".";

function NoteForm({
  date,
  title,
  active,
  isEdit,
  onOpen,
  content,
  onChange,
  onSubmit,
  onDiscard,
  validated,
}) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Card style={{ maxWidth: "350px", minWidth: "100%", overflow: "hidden" }}>
        <Accordion activeKey={active}>
          <Accordion.Toggle
            role="button"
            eventKey="active"
            as={Card.Header}
            onClick={onOpen}
            className={`text-left px-3 px-sm-3 ${
              active !== "active" ? "border-bottom-0" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <span>Add Note</span>
              <Spacer />
              <Icon path={mdiPlus} size={0.8} />
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="active">
            <Card.Body className="p-3 py-3 p-sm-3">
              <Form className="text-left" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicTitle">
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Control
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => onChange("Title", e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicContent">
                  <Form.Control
                    type="text"
                    as="textarea"
                    value={content}
                    placeholder="Content"
                    onChange={(e) => onChange("Content", e.target.value)}
                  />
                </Form.Group>
                <Row className="px-3">
                  <Button
                    className="mr-2"
                    onClick={onDiscard}
                    variant="outline-secondary"
                  >
                    Discard
                  </Button>
                  <Spacer />
                  <Button variant="primary" type="submit" disabled={!validated}>
                    {isEdit ? "Update" : "Save"}
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>
      <Card
        className="text-center mt-3 mt-sm-4 border-none"
        style={{ width: "330px", overflow: "hidden" }}
      >
        <Accordion activeKey={active}>
          <Accordion.Collapse eventKey="active">
            <Calendar
              value={date}
              className="card"
              minDate={new Date()}
              onChange={(e) => onChange("Date", e)}
            />
          </Accordion.Collapse>
        </Accordion>
      </Card>
    </div>
  );
}

export default NoteForm;
