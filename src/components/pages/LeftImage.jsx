import React from "react";

const LeftImage = () => {
  return (
    <React.Fragment>
    <div className="logo col-sm-12">
      <img src="/images/index.png" className="image-fluid" alt="logo"></img>
    </div>
    <div className="image">
      <img src="/images/login.png" alt="login" className="img-fluid loginimg" />
    </div>
    </React.Fragment>
  );
};

export default LeftImage;
