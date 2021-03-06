import React, { useEffect, useState } from "react";
import { Row, Col, Jumbotron, Table, Button } from "react-bootstrap";
import API from "../../utils/API.js";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../images/logo.png";
import "./admin.css";


const useStyles = makeStyles(() => ({
  root: {
    width: "40%",
  },
}));

export default function Admin() {
  const [quotes, setQuotes] = useState([]);
  const [messages, setMessages] = useState([]);

  function loadQuotes() {
    API.getQuotes()
      .then((res) => setQuotes(res.data))
      .catch((err) => console.log(err));
  }

  function loadMessages() {
    API.getMessages()
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadQuotes();
  }, []);


  function handleLogout(e) {
    e.preventDefault();
    API.logout().then(() => {
      window.location.replace("/login");
    });
  }

  useEffect(() => {
    loadMessages();
  }, []);

  function deleteMessage(id) {
    API.deleteMessage(id)
      .then(() => loadMessages())
      .catch((err) => console.log(err));
  }

  function deleteQuote(id) {
    API.deleteQuote(id)
      .then(() => loadQuotes())
      .catch((err) => console.log(err));
  }
  const classes = useStyles();

  return (
    <div>
      <Row className='admin-head mt-2'>
        <Col>
          <h2 id="josh-text">Josh Campbell Page</h2>
        </Col>
        <Col>
          <button className='btn logout' onClick={handleLogout} ><i className="fas fa-sign-out-alt"></i>Log Out</button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='text-center mb-5'><img className='logo-admin' alt={logo} src={logo}></img></div>
        </Col>
      </Row>


      <div className='container'>
        <Row>
          <Col>
            <button className="btn float-left" onClick={loadQuotes}><i className="fas fa-redo-alt fa-2x"></i></button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Jumbotron id="jumbo">
              <h1 className="text-center">Quotes</h1>

              <Table responsive className="text-center">
                {quotes.length ? (
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote._id}>
                        <td className="td-admin">{quote.date}</td>
                        <td className="td-admin">
                          {quote.firstName} {quote.lastName}
                        </td>
                        <td>
                          <Link className="btn" to={"/admin/" + quote._id}>
                            View Quote
                          </Link>
                          <button
                            className="btn"
                            onClick={() => deleteQuote(quote._id)}
                          >
                            <i className="fas fa-trash delete"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <caption>
                    <h3>No Results to Display</h3>
                  </caption>
                )}
              </Table>
            </Jumbotron>
          </Col>

          <Col>
            <button className="btn float-left" onClick={loadMessages}><i className="fas fa-redo-alt fa-2x"></i></button>
          </Col>

          <Col xs={12}>
            <Jumbotron id="jumbo">
              <h1 className="text-center">Messages</h1>
              <Table responsive className="text-center">
                {messages.length ? (
                  <tbody>
                    {messages.map((messages) => (
                      <tr key={messages._id}>
                        <td className="td-admin">{messages.date}</td>
                        <td className={classes.root}>
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <p className='td-admin'>{messages.name}</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                <span className='sms-header'>Email:</span> {messages.emailMessage}
                                <br />
                                <br />
                                <span className='sms-header'>Message:</span> {messages.message}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => deleteMessage(messages._id)}
                          >
                            <i className="fas fa-trash delete"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <caption>
                    <h3>No Results to Display</h3>
                  </caption>
                )}
              </Table>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    </div>
  );
}
