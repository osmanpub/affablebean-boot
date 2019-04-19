import React from "react";
import { Link } from "react-router-dom";
import { HeaderMain, HeaderWrapper, Logo } from "./Header.styles";
import WidgetBar from "../WidgetBar";
import "./Header.css";
import { HeaderProps } from "../../interfaces/props";

export function Header(props: HeaderProps) {
  const { cart, url } = props;

  return (
    <HeaderWrapper>
      <HeaderMain>
        <WidgetBar cart={cart} url={url} />
        <Logo>
          <Link to={"/"}>
            <img src="/static/img/logo.png" alt="Affable Bean logo" />
          </Link>
        </Logo>
        <img
          id="logoText"
          src="/static/img/logoText.png"
          alt="the affable bean"
        />
      </HeaderMain>
    </HeaderWrapper>
  );
}
