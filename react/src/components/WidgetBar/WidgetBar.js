import React from "react";
import { Link } from "react-router-dom";
import { HeaderWidget, WidgetBarWrapper } from "./WidgetBar.styles";

export function WidgetBar(props) {
  return (
    <WidgetBarWrapper>
      <HeaderWidget>
        <div>
          <Link className="bubble" to={"/checkout"}>
            proceed to checkout &#x279f
          </Link>
        </div>
      </HeaderWidget>
    </WidgetBarWrapper>
  );
}
