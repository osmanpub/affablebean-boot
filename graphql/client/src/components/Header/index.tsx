import React from "react";
import { Link } from "react-router-dom";
import WidgetBar from "../WidgetBar";
import "./Header.css";
import { HeaderMain, HeaderWrapper, Logo } from "./Header.styles";

type Props = {
  url: string;
};

export default function Header(props: Props) {
  const { url } = props;

  return (
    <HeaderWrapper>
      <HeaderMain>
        <WidgetBar url={url} />
        <Logo>
          <Link to={"/"} data-cy="home-logo">
            <img src="/static/img/logo.png" alt="Affable Bean logo" />
          </Link>
        </Logo>
        <img
          alt="the affable bean"
          id="logoText"
          src="/static/img/logoText.png"
        />
      </HeaderMain>
    </HeaderWrapper>
  );
}
