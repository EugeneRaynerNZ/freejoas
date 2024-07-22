import React from "react";

const ActiveListItem = ({ item }) => {

  if (!item) {
    return <p>No selected Freejoa found</p>;
  }

  const imageURL = item.image[0].data;

  return (
    <div className="active-list-item">
      {item && (
        <>
          <p>Here is the selected/actived Freejoa item</p>
          <p>Freejoa ID: {item._id}</p>
          <img src={imageURL} alt="freejoa"></img>
        </>
      )}
    </div>
  );
};

export default ActiveListItem;
