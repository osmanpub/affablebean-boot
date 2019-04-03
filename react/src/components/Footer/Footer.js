import React from "react";
import { FooterDivider, FooterWrapper } from "./Footer.styles";

export function Footer(props) {
  return (
    <FooterWrapper>
      <div>
        <br />
        <FooterDivider />
        <p>
          <button>Privacy</button>
          <button>Contact</button>
          &nbsp;&copy;&nbsp;2019 the affable bean company
        </p>
      </div>
    </FooterWrapper>
  );
}
