import React from "react";
import { Link } from "react-router-dom";
import { HeaderMain, HeaderWrapper, Logo } from "./Header.styles";
import WidgetBar from "../WidgetBar";
import "./Header.css";

export function Header(props) {
  const { cart } = props;

  return (
    <HeaderWrapper>
      <HeaderMain>
        <WidgetBar cart={cart} />
        <Logo>
          <Link to={"/"}>
            <img src="/static/img/logo.png" alt="Affable Bean logo" />
          </Link>
        </Logo>
        <img
          className="logoText"
          src="/static/img/logoText.png"
          alt="the affable bean"
        />
      </HeaderMain>
    </HeaderWrapper>
  );
}
