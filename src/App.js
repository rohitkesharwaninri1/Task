import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ModalComponent from "./component/ModalComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, BrowserRouter } from "react-router-dom";
export default function App() {
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("in");
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [seachValue, setSeachValue] = useState("");
  const [isEven, setIsEven] = useState(false);
  const click = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=a38fda923e944d5e88f6507d8235c286&page=${page}&pageSize=10`;
    await axios.get(url).then((response) => {
      setContacts(response.data.articles);
      setFilterContacts(response.data.articles);
      setTotalResults(response.data.totalResults);
    });
  };

  useEffect(() => {
    click();
  }, []);

  useEffect(() => {
    setContacts([]);
    setFilterContacts([]);
    setTotalResults(0);
    setPage(1);
    click();
  }, [country]);

  const handleClose = () => setShow(false);
  const handleShow = (modalname) => {
    modalname === "Modal A" ? setCountry("in") : setCountry("us");
    setContacts([]);
    setFilterContacts([]);
    setTotalResults(0);
    setPage(1);
    click();
    setShow(true);
    setModalName(modalname);
  };
  const fetchMoreData = () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=a38fda923e944d5e88f6507d8235c286&page=${page}&pageSize=10`;
    axios.get(url).then((response) => {
      setContacts([...contacts, ...response.data.articles]);
      setFilterContacts([...contacts, ...response.data.articles]);
    });
  };
  const onEnterSearch = () => {
    if (seachValue !== "") {
      const newContactList = contacts.filter((data) => {
        let newStr = data.source.name + " " + data.title;
        return newStr.toLowerCase().includes(seachValue.toLowerCase());
      });
      setFilterContacts(newContactList);
    } else {
      setFilterContacts(contacts);
    }
  };

  return (
    <BrowserRouter>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Link to="/button-a">
          <Button
            variant="primary"
            onClick={() => handleShow("Modal A")}
            style={{ marginRight: "10px", backgroundColor: "#46139f" }}
          >
            Button A
          </Button>
        </Link>
        <Link to="/button-b">
          <Button
            variant="primary"
            style={{ backgroundColor: "#ff7f50" }}
            onClick={() => handleShow("Modal B")}
          >
            Button B
          </Button>
        </Link>
        <ModalComponent
          show={show}
          onClose={handleClose}
          modalName={modalName}
          data={filterContacts}
          totalResults={totalResults}
          handleShow={handleShow}
          fetchMoreData={fetchMoreData}
          page={page}
          setCountry={setCountry}
          country={country}
          seachValue={seachValue}
          setSeachValue={setSeachValue}
          onEnterSearch={onEnterSearch}
          isEven={isEven}
          setIsEven={setIsEven}
        />
      </div>
    </BrowserRouter>
  );
}
