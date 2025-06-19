import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
function ItemIndex() {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState<Item | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getDataInfo();
  }, []);
  const getDataInfo = () => {
    axios
      .get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDataProduct(res.data);
      })
      .then((err) => console.log(err));
  };
  const returnPage = () => {
    navigate("/dashboard");
  };
  return (
    <div className="product-div gray-back">
      <div className="prev-page" onClick={returnPage}>
        <GrFormPrevious />
      </div>
      <div className="fs-60px fw-600 mt-5">{dataProduct?.name}</div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4">
        <Image fluid className="image-product" src={dataProduct?.image_url} />
      </div>
      <div className="d-flex flex-xl-row flex-column align-items-center justify-content-between mt-5 w-100">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <h1 className="fw-600">Price:</h1>
          <h2 className="fw-500 gray-color ml-20px">{dataProduct?.price} $</h2>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-small">
          <h1 className="fw-600">Added At:</h1>{" "}
          <h2 className="fw-500 gray-color ml-20px">
            {dataProduct?.created_at.slice(0, 10)}
          </h2>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center mt-3">
        <h1 className="fw-600">Updated At:</h1>
        <h2 className="fw-500 gray-color ml-20px">
          {dataProduct?.updated_at.slice(0, 10)}
        </h2>
      </div>
    </div>
  );
}

export default ItemIndex;
