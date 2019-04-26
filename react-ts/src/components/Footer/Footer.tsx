import React from "react";
import { Link } from "react-router-dom";
import { FooterText, FooterWrapper } from "./Footer.styles";
import { Props } from "../../interfaces/props";

export function Footer(props: Props | {}) {
  return (
    <FooterWrapper>
      <br />
      <FooterText>
        <Link to={"/privacy"}>
          <button className={`btn btn-link`}>Privacy</button>
        </Link>
        <Link to={"/contact"}>
          <button className={`btn btn-link`}>Contact</button>
        </Link>
        &nbsp;&copy;&nbsp;2019 the affable bean company
      </FooterText>
    </FooterWrapper>
  );
}