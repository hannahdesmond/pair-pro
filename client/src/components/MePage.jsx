import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const Me = () => {
  const [me, setMe] = useState([]);
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    state.isLoggedIn
      ? axios
          .get(`/api/users/me`)
          .then((res) => {
            const me = res.data;
            setMe(me);
            // navigate("/me");
          })
          .catch(() => {
            // navigate('/login')
          })
      : navigate("/login");
  }, [navigate, state.isLoggedIn]);

  return (
    <>
    <div className="sml-banner-image">
      <div className="dark-grey-bg white-text  full-width courier">
        <h2>Hi, {me.name}!</h2> <h4>dont't forget to add any new languages</h4>
      </div>
    </div>
    <div data-testid="person-cards" className="card-container">
      <Container fluid>
        <Row>
          <Col md={2}></Col>
          <Col md={3}>
            <Card className="me-card">
              <Card.Img variant="top "src={me.image} alt="profile picture" />
            </Card>
            <br></br>
          </Col>
          <Col md={5}>
            <Card className="me-card">
              <Card.Body>
                <Card.Text>Languages: {me.languages}</Card.Text>
                <Card.Text>Bio: {me.bio}</Card.Text>
                <Button variant="primary">Edit your Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Me;
