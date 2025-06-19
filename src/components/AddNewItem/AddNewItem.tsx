import { useRef, useState, type FormEvent } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNewItem() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
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
    image.current?.click();
  };

  const returnPage = () => {
    navigate("/dashboard");
  };
  const addNewData = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/items",
        {
          name: name?.current?.value,
          price: price?.current?.value,
          image: image?.current?.files?.[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-start justify-content-center edit-div gray-back">
      <div className="prev-page" onClick={returnPage}>
        <GrFormPrevious />
      </div>
      <h1 className="mt-5 fw-600">ADD NEW ITEM</h1>
      <Form className="w-100 mt-5" onSubmit={addNewData}>
        <div className="w-100 d-flex flex-xl-row flex-column align-items-center justify-content-start">
          <div className="w-100">
            <Form.Group>
              <Form.Label className="fs-32px fw-500 gray-color">
                Name
              </Form.Label>
              <Form.Control
                className="add-input"
                type="text"
                ref={name}
                placeholder="Enter the product name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fs-32px fw-500 gray-color">
                Price
              </Form.Label>
              <Form.Control
                className="add-input"
                type="text"
                ref={price}
                placeholder="Enter the product price"
                required
              />
            </Form.Group>
          </div>
          <div className="photo-upload-div w-100">
            <Form.Group>
              <Form.Label
                htmlFor="file-upload"
                className="d-flex flex-column fs-32px fw-500 gray-color"
              >
                Image
                <Form.Control
                  type="file"
                  id="file-upload"
                  ref={image}
                  accept="image/*"
                  onChange={fileChange}
                  style={{ display: "none" }}
                  required
                />
                <div
                  onClick={handleImageClick}
                  className="d-flex edit-upload-image"
                >
                  {selectedImage ? (
                    <Image
                      fluid
                      src={selectedImage}
                      alt="Selected"
                      style={{
                        width: "208px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Image fluid src="/images/Upload icon larg.png" />
                  )}
                </div>
              </Form.Label>
            </Form.Group>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center w-100 mt-120">
          <Button className="update-btn" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddNewItem;
