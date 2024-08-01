import React from "react";
import PropTypes from "prop-types";
import { useSelectedFreejoa } from "../contexts/SelectedFreejoaContext";
import LogoPlaceholder from "../images/example-2.svg";
import { FaTree } from "react-icons/fa";

const ListView = ({ data }) => {
  const { selectedFreejoa, setSelectedFreejoa } = useSelectedFreejoa(); // get the selected item from the context

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSelectItem = (item) => {
    setSelectedFreejoa(item);
    scrollToTop();
  };

  return (
    <ul className="location-list">
      {!data || data.length === 0 ? (
        <p>
          There are no feijoa trees near you. <br />
          Increase the filter or find one and upload it
        </p>
      ) : null}
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <button
            key={item._id}
            className={`location-list--item${
              selectedFreejoa && item._id === selectedFreejoa._id
                ? " active-list—item"
                : ""
            }`}
            onClick={() => handleSelectItem(item)}
          >
            {item.image ? (
              <div
                className="location-list--item-image"
                style={{
                  backgroundImage: `url(${item.image[0].data})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            ) : (
              <div
                className="location-list--item-image"
                style={{
                  backgroundImage: `url(${LogoPlaceholder})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
            <div className="location-list--item-container">
              <div className="location-list--item-filter">
                {/* <span>Under 1 km</span> */}
                <div className="location-list--item-tree">
                  <span>{item.amount}</span>
                  <FaTree />
                </div>
              </div>
              <span className="location-list--item-title">{item.title}</span>
              {/* <Probability text="High Probability" type="high" />
                        <div className="location-list--item-visited">
                          <em>Visited on 28/02/2024</em>
                        </div> */}
            </div>
          </button>
        ))}
    </ul>
  );
};

ListView.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ListView;
