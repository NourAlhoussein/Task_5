import { useRef, useState, type FormEvent } from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirmation = useRef<HTMLInputElement>(null);
  const profile_image = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
      console.log("Selected file: ", selectedFile.name);
    }
  };
  const handleImageClick = (event: React.MouseEvent) => {
    event.preventDefault();
    profile_image.current?.click();
  };
  const backToLogin = () => {
    navigate("/");
  };
  const sendDataOfSignUp = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/register",
        {
          first_name: first_name.current?.value,
          last_name: last_name.current?.value,
          user_name: first_name.current?.value + "_" + last_name.current?.value,
          email: email.current?.value,
          password: password.current?.value,
          password_confirmation: password_confirmation.current?.value,
          profile_image: profile_image.current?.files?.[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container
      fluid
      className="background-gradient min-h-100vh  d-flex justify-content-center align-items-center montserrat py-40"
    >
      <div className="signup-card-style d-flex justify-content-center align-items-center">
        <Image fluid src="/Task_5/images/logo.png" />
        <div className="mt-30 fw-600 fs-22px">SIGN UP</div>
        <div className="gray-color fs-14px fw-400 mt-9 text-center">
          Fill in the following fields to create an account.
        </div>
        <Form className="w-100 px-30 mt-50" onSubmit={sendDataOfSignUp}>
          <Form.Group>
            <Form.Label className="gray-color fs-14px fw-400">Name</Form.Label>
            <div className="d-flex gap-20px">
              <Form.Control
                className="input-signin h-44px"
                type="text"
                placeholder="First Name"
                ref={first_name}
              />{" "}
              <Form.Control
                className="input-signin h-44px"
                type="text"
                placeholder="Last Name"
                ref={last_name}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-16">
            <Form.Label className="gray-color fs-14px fw-400">Email</Form.Label>
            <Form.Control
              className="input-signin h-44px"
              type="email"
              placeholder="Enter your email"
              ref={email}
            />
          </Form.Group>
          <Form.Group className="mt-16">
            <Form.Label className="gray-color fs-14px fw-400">
              Password
            </Form.Label>
            <div className="d-flex gap-20px">
              <Form.Control
                className="input-signin h-44px"
                type="password"
                placeholder="Enter password"
                ref={password}
              />{" "}
              <Form.Control
                className="input-signin h-44px"
                type="password"
                placeholder="Re-enter your password"
                ref={password_confirmation}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-16">
            <Form.Label
              htmlFor="file-upload"
              className="d-flex flex-column gray-color fs-14px fw-400"
            >
              Profile Image
              <Form.Control
                type="file"
                id="file-upload"
                ref={profile_image}
                accept="image/*"
                onChange={fileChange}
                style={{ display: "none" }}
              />
              <div onClick={handleImageClick} className="d-flex upload-image">
                {selectedImage ? (
                  <Image
                    fluid
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }} // Adjust size as needed
                  />
                ) : (
                  <Image fluid src="/Task_5/images/Upload icon.png" />
                )}
              </div>
            </Form.Label>
          </Form.Group>
          <Button type="submit" className="w-100 mt-30 form-button">
            SIGN UP
          </Button>
        </Form>
        <div className="mt-30">
          Don’t have an account?{" "}
          <span
            className="text-decoration-underline primary-color cursor-pointer"
            onClick={backToLogin}
          >
            Sign in
          </span>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
