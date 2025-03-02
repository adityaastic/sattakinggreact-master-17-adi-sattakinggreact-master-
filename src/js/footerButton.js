import React from "react";
import { Link } from "react-router-dom";

function FooterButton() {
  return (
    <div className="footerButton">
    
      <Link to="/">SATTA KING | &nbsp;</Link>
      <Link to="/about">ABOUT | &nbsp;</Link>
      <Link to="/contact">CONTACT | &nbsp;</Link>
      <Link to="/faq">FAQ | &nbsp;</Link>
      <Link to="/disclaimer">DISCLAIMER | &nbsp;</Link>
      <Link to="/privacypolicy">PRIVACY POLICY |</Link>
      <br />
      <br />© 2020 <Link to="/">SATTA-KINGG.CO</Link>
    </div>
  );
}

export default FooterButton;
