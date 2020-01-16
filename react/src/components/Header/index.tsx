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
