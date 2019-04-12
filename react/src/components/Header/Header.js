import React from "react";
import { Link } from "react-router-dom";
import { HeaderMain, HeaderWrapper } from "./Header.styles";
import WidgetBar from "../WidgetBar";

export function Header(props) {
  return (
    <HeaderWrapper>
      <HeaderMain>
        <WidgetBar />
        <Link to={"/"}>
          <img src="/static/img/logo.png" alt="Affable Bean logo" />
        </Link>
      </HeaderMain>
    </HeaderWrapper>
  );
}
