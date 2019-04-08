import React from "react";
import { HeaderMain, HeaderWrapper, WidgetBar } from "./Header.styles";

export function Header(props) {
  return (
    <HeaderWrapper>
      <HeaderMain>
        <WidgetBar />
        <a href="/index">
          <img src="/static/img/logo.png" alt="Affable Bean logo" />
        </a>
        <img src="/static/img/logoText.png" alt="the affable bean" />
      </HeaderMain>
    </HeaderWrapper>
  );
}
