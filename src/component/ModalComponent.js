import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import DetailModal from "./DetailModal";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ModalComponent({
  show,
  onClose,
  modalName,
  data,
  handleShow,
  fetchMoreData,
  page,
  setCountry,
  country,
  totalResults,
  seachValue,
  setSeachValue,
  onEnterSearch,
  isEven,
  setIsEven,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [contactDetails, setContactDetails] = useState({});

  const onCloseDetails = () => setShowDetails(false);
  const handleViewDetails = (data) => {
    setContactDetails(data);
    setShowDetails(true);
  };
  const handleSearch = (e) => {
    console.log("first");
    onEnterSearch();
    setSeachValue(e.target.value);
  };
  const onChangeCheckbox = () => {
    setIsEven((isEven) => !isEven);
  };
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "0px" }}>
          <div style={{ margin: "10px" }}>
            <Link to="/button-a">
              <Button
                variant="secondary"
                onClick={() => handleShow("Modal A")}
                style={{ marginRight: "20px", backgroundColor: "#46139f" }}
              >
                Indian Contacts
              </Button>
            </Link>
            <Link to="/button-b">
              <Button
                variant="secondary"
                style={{ backgroundColor: "#ff7f50" }}
                onClick={() => handleShow("Modal B")}
              >
                US Contacts
              </Button>
            </Link>
          </div>
          <div style={{ margin: "10px" }}>
            <Form.Label htmlFor="Search">Search</Form.Label>
            <div style={{ display: "flex" }}>
              <Form.Control
                type="text"
                id="Search"
                value={seachValue}
                onChange={handleSearch}
                aria-describedby="Search"
              />
              <Button
                variant="primary"
                style={{ marginLeft: "10px" }}
                onClick={onEnterSearch}
              >
                Search
              </Button>
            </div>
          </div>

          <div
            style={{ overflowY: "auto", height: "300px" }}
            id="scrollableDiv"
          >
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={data.length !== totalResults}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>You read all news posts.</b>
                </p>
              }
              loader={<p style={{ textAlign: "center" }}>Loading.....</p>}
              scrollableTarget="scrollableDiv"
            >
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((contact, i) => {
                    if (isEven && i % 2 === 0) return <tr></tr>;
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{contact.source.name}</td>
                        <td>{contact.title}</td>
                        <td
                          onClick={() => handleViewDetails(contact)}
                          style={{ color: "blue" }}
                        >
                          View More
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </InfiniteScroll>
          </div>

          <Form style={{ padding: "5px" }}>
            <Form.Check.Input
              type="checkbox"
              isValid
              checked={isEven}
              onChange={onChangeCheckbox}
              style={{ marginRight: "10px" }}
            />
            <Form.Check.Label>Only Even</Form.Check.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button
              variant="secondary"
              style={{
                backgroundColor: "#ffffff",
                border: "#46139f 2px solid",
                color: "#46139f",
              }}
              onClick={onClose}
            >
              Close
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <DetailModal
        showDetails={showDetails}
        onCloseDetails={onCloseDetails}
        contactDetails={contactDetails}
      />
    </>
  );
}
