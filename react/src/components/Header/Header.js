import React from "react";
import { Link } from "react-router-dom";
import { HeaderMain, HeaderWrapper, HomeLogo } from "./Header.styles";
import WidgetBar from "../WidgetBar";

export function Header(props) {
  const { cart } = props;

  return (
    <HeaderWrapper>
      <HeaderMain>
        <WidgetBar cart={cart} />
        <HomeLogo>
          <Link to={"/"}>
            <img src="/static/img/logo.png" alt="Affable Bean logo" />
          </Link>
        </HomeLogo>
      </HeaderMain>
    </HeaderWrapper>
  );
}
