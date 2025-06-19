import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const moveToSignUp = () => {
    navigate("/signup");
  };
  const sendDataOfLogin = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/login",
        {
          email: email.current?.value,
          password: password.current?.value,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setErrorMessage(err.response.data.msg);
      });
  };
  return (
    <Container
      fluid
      className="background-gradient min-h-100vh  d-flex justify-content-center align-items-center montserrat"
    >
      <div className="login-card-style d-flex justify-content-center align-items-center py-40 my-60px my-95px">
        <Image fluid src="/Task_5/images/logo.png" />
        <div className="mt-30 fw-600 fs-22px">SIGN IN</div>
        <div className="gray-color fs-14px fw-400 mt-9 text-center">
          Enter your credentials to access your account
        </div>
        <Form className="w-100 px-30 mt-50" onSubmit={sendDataOfLogin}>
          <Form.Group>
            <Form.Label className="gray-color fs-14px fw-400">Email</Form.Label>
            <Form.Control
              className="input-signin"
              type="email"
              placeholder="Enter your email"
              ref={email}
            />
          </Form.Group>
          <Form.Group className="mt-20">
            <Form.Label className="gray-color fs-14px fw-400">
              Password
            </Form.Label>
            <Form.Control
              className="input-signin"
              type="password"
              placeholder="Enter your password"
              ref={password}
            />
          </Form.Group>
          {errorMessage && (
            <div className="red-color fs-14px">{errorMessage}</div>
          )}
          <Button type="submit" className="w-100 mt-30 form-button">
            SIGN IN
          </Button>
        </Form>
        <div className="mt-30">
          Don’t have an account?{" "}
          <span
            onClick={moveToSignUp}
            className="text-decoration-underline primary-color cursor-pointer"
          >
            Create one
          </span>
        </div>
      </div>
    </Container>
  );
}

export default login;
