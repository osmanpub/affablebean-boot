import React from "react";
import { Link } from "react-router-dom";
import { FooterText, FooterWrapper } from "./Footer.styles";

export default function Footer() {
  return (
    <FooterWrapper>
      <br />
      <FooterText>
        <Link to={"/privacy"} data-cy="privacy">
          <button className="btn btn-link">Privacy</button>
        </Link>
        <Link to={"/contact"} data-cy="contact">
          <button className="btn btn-link">Contact</button>
        </Link>
        &nbsp;&copy;&nbsp;2019 the affable bean company
      </FooterText>
    </FooterWrapper>
  );
}
