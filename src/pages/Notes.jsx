import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";

import Icon from "@mdi/react";
import { mdiFilter } from "@mdi/js";
import { Row, Col, Card, Container, Dropdown } from "react-bootstrap";

import { Spacer, NoteForm, NoteList, NoteModal } from "../components";
import { addNote, updateNote, deleteNote, updateSortBy } from "../actions";
import { uid } from "../utils";

function Notes({
  size,
  notes,
  settings,
  addNoteToState,
  updateNoteInState,
  deleteNoteInState,
  updateSortBySetting,
}) {
  // state
  const isSmall = useMemo(() => size.width <= 768, [size.width]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [active, setActive] = useState("active");
  const [modalData, setModalData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  // effects
  useEffect(() => {
    if (isSmall) {
      setActive(null);
    } else {
      setActive("active");
    }
  }, [isSmall]);

  useEffect(() => {
    setValidated(!!(title && date));
  }, [title, content, date]);

  // methods
  const emptyStateProps = () => {
    const emptyState = {
      title: "No Notes Found",
      img: "images/empty-state.svg",
      subtitle: "When you are ready, go ahead and add a note",
    };
    if (searchText && notes.length) {
      emptyState.img = "images/empty-search.svg";
      emptyState.subtitle = "To widen your search, change or remove filters";
    }
    return emptyState;
  };

  const toggleModal = (show, note) => {
    setModalShow(show);
    if (show && note) {
      setModalData({ ...note });
    } else {
      setModalData({});
    }
  };

  const populateForm = ({ date, title, content, id }) => {
    handleFormChange("Id", id);
    handleFormChange("Title", title);
    handleFormChange("Content", content);
    handleFormChange("Date", new Date(date));
  };

  const clearForm = () => {
    setId("");
    setTitle("");
    setContent("");
    setIsEdit(false);
    setDate(new Date());
  };

  const scrollTop = () => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  const closeFormWhenSmall = () => {
    if (isSmall) {
      setActive(null);
    }
  };

  const toggleFormActive = () => {
    setActive(active === "active" ? null : "active");
  };

  const filteredNotes = () => {
    const { sortBy } = settings;

    let sortedNotes = notes.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return sortedNotes.filter(({ title }) =>
      title.toLowerCase().includes(searchText)
    );
  };

  // handlers
  const handleFormChange = (prop, value) => {
    switch (prop) {
      case "Date":
        setDate(value);
        break;
      case "Title":
        setTitle(value);
        break;
      case "Content":
        setContent(value);
        break;
      case "Id":
        setId(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    if (e.preventDefault) e.preventDefault();

    if (!validated) return;

    if (isEdit) {
      updateNoteInState({ title, content, date: date.toDateString(), id });
    } else {
      addNoteToState({ title, content, date: date.toDateString(), id: uid() });
    }
    clearForm();
    closeFormWhenSmall();
  };

  const handleFormDiscard = () => {
    clearForm();
    closeFormWhenSmall();
  };

  const handleSearch = (searchText) => {
    setSearchText((searchText || "").toLowerCase());
  };

  const handleEdit = (note) => {
    setIsEdit(true);
    setActive("active");

    populateForm(note);
    scrollTop();
  };

  const handleDelete = (note) => {
    if (isEdit) return;

    deleteNoteInState(note);
  };

  return (
    <Container className="p-3 p-sm-4">
      <NoteModal
        {...modalData}
        show={modalShow}
        onHide={() => toggleModal(false)}
      />
      <Card>
        <div className="d-flex px-3 pt-3 px-sm-4">
          <h2 className="pb-1">Notes</h2>
          <Spacer />
          <Dropdown alignRight>
            <Dropdown.Toggle size="sm" variant="outline-secondary">
              <Icon path={mdiFilter} size={0.9}></Icon>
            </Dropdown.Toggle>
            <Dropdown.Menu className="note-dropdown">
              <Dropdown.Header>Sort by</Dropdown.Header>
              <Dropdown.Item
                active={settings.sortBy === "date"}
                onClick={() => updateSortBySetting("date")}
              >
                Date
              </Dropdown.Item>
              <Dropdown.Item
                active={settings.sortBy === "title"}
                onClick={() => updateSortBySetting("title")}
              >
                Title
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <hr className="mt-1" />
        <Row className="px-3 px-sm-4">
          <Col xs={12} lg={"auto"} className="pb-3 pt-sm-2 pb-sm-4">
            <NoteForm
              date={date}
              title={title}
              active={active}
              isEdit={isEdit}
              content={content}
              validated={validated}
              onOpen={toggleFormActive}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              onDiscard={handleFormDiscard}
            />
          </Col>
          <hr
            className={`d-sm-none full-width ${
              active === "active" ? "mt-0" : "mt-n3"
            }`}
          />
          <Col xs={12} lg={"auto"} className="flex-grow-1 pb-3 pt-sm-2 pb-sm-4">
            <NoteList
              isEdit={isEdit}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              notes={filteredNotes()}
              emptyState={emptyStateProps()}
              onShow={(n) => toggleModal(true, n)}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    settings: state.settings,
  };
};

export default connect(mapStateToProps, {
  addNoteToState: addNote,
  updateNoteInState: updateNote,
  deleteNoteInState: deleteNote,
  updateSortBySetting: updateSortBy,
})(Notes);
