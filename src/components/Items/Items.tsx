import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
const ITEMS_PER_PAGE = 8;
function Items() {
  const [items, setItems] = useState<Array<Item>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState<Boolean>(false);
  const [itemDeleted, setItemDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const default_image = "/images/default photo.png";

  useEffect(() => {
    getItems();
  }, [itemDeleted]);
  const getItems = () => {
    setLoading(true);
    axios
      .get("https://web-production-3ca4c.up.railway.app/api/items", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteItem = () => {
    axios
      .delete(
        `https://web-production-3ca4c.up.railway.app/api/items/${itemIdToDelete}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setItemDeleted(!itemDeleted);
        setShowDelete(false);
      })
      .catch((err) => console.log(err));
    console.log(itemIdToDelete);
  };
  const showDeleteLayer = (id: number) => {
    setShowDelete(true);
    setItemIdToDelete(id);
  };
  // pagination code
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Get items for the current page
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const currentItems = getCurrentItems();

  // Generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
        pageNumbers.push("...");
      }
    }
    return pageNumbers;
  };
  return (
    <div className="items gray-back">
      <div className="position-relative d-flex flex-column align-items-center justify-content-center">
        <input
          className="search-dash"
          type="search"
          placeholder="Search product by name "
        />
        <div className="search-icon">
          <IoIosSearch />
        </div>
      </div>
      <div className="d-flex flex-column align-items-xl-end align-items-center justify-content-center  w-100">
        <Link to={"/dashboard/add"} className="add-btn">
          ADD NEW PRODUCT
        </Link>
      </div>
      {loading && <div className="gray-color mt-5 ">Loading ....</div>}
      <div className="mt-5 w-100">
        <div className="grid">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="item"
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <Image
                fluid
                src={item.image_url}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src = default_image;
                }}
              />
              {hoveredItemId === item.id && (
                <div className="hover-layer">
                  <Link
                    to={`/dashboard/Info/${item.id}`}
                    className="fw-400 fs-30px text-center black-color"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-3 d-flex gap-10px">
                    <Link
                      to={`/dashboard/edit/${item.id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                    <Button
                      className="delete-btn"
                      onClick={() => {
                        showDeleteLayer(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
              {showDelete && (
                <div className="showing-delete">
                  <div className="card-delete">
                    <div className="fw-600 fs-22px text-center">
                      ARE YOU SHURE YOU WANT TO DELETE THE PRODUCT?
                    </div>
                    <div className="mt-5 d-flex gap-100px">
                      <Button onClick={() => deleteItem()} className="btn-yes">
                        Yes
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDelete(false);
                        }}
                        className="btn-no"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pagination">
          <Button
            className="prev-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </Button>
          {generatePageNumbers().map((number, index) => (
            <Button
              key={index}
              onClick={() => {
                if (typeof number === "number") {
                  setCurrentPage(number);
                }
              }}
              className={number === currentPage ? "pag-active" : "pag-disable"} // Add active class
            >
              {number}
            </Button>
          ))}
          <Button
            className="next-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdNavigateNext />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Items;
