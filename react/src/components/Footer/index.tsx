import React from "react";
import { Link } from "react-router-dom";
import { FooterText, FooterWrapper } from "./Footer.styles";

export default function Footer() {
  return (
    <FooterWrapper>
      <br />
      <FooterText>
        <Link to={"/privacy"} data-cy="privacy" data-testid="privacy">
          <button className="btn btn-link">Privacy</button>
        </Link>
        <Link to={"/contact"} data-cy="contact" data-testid="contact">
          <button className="btn btn-link">Contact</button>
        </Link>
        &nbsp;&copy;&nbsp;2019 the affable bean company
      </FooterText>
    </FooterWrapper>
  );
}
