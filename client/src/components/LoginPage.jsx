import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../apiCalls";
import { Form, Button, Row, Col } from 'react-bootstrap'

const Login = () => {
  const { isFetching, dispatch, state } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //add input value
  const [inputValue] = useState();
  const [passwordValue] = useState();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  return (
  <>
    <div className='sml-banner-image'>
      <div className="dark-grey-bg white-text">
        <h1 className="varela">Login</h1>
        <h3 className="courier">Welcome back to PairPro!</h3>
      </div>
    </div>
    <div className="vertical-center white-bg top-10vh">
    <Row className="full-width">
      <Col xs={3}></Col>
  
      <Col xs={6}>
    <Form onSubmit ={onSubmit}>
      <Form.Group data-testid="email input" ClassName="form-group mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email"
          id='email'
          name='email'
          value={inputValue}
          placeholder='Enter your email' 
          onChange={onChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group cdata-testid="password input" className="form-group mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          id='password'
          name='password'
          value={passwordValue}
          placeholder='Enter your password' 
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" data-testid="add-btn">
      {isFetching ? "loading" : "Log in"}
      </Button>
    </Form>
    </Col>
  
    <Col xs={3}></Col>
    </Row>
    </div>
  </>
  )
}

export default Login;
