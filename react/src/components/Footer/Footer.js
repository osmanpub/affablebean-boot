import React from "react";
import { FooterDivider, FooterText, FooterWrapper } from "./Footer.styles";

export function Footer(props) {
  return (
    <FooterWrapper>
      <br />
      <FooterDivider />
      <FooterText>
        <button className="btn btn-link">Privacy</button>
        <button className="btn btn-link">Contact</button>
        &nbsp;&copy;&nbsp;2019 the affable bean company
      </FooterText>
    </FooterWrapper>
  );
}
