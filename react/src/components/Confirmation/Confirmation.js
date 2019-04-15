import React from "react";
import { Link } from "react-router-dom";
import { ConfirmationText } from "./Confirmation.styles";
import "./Confirmation.css";

export function Confirmation() {
  const { customer, orderedProducts, orderRecord, products } = this.props.order;

  return (
    <div className="singleColumn">
      <ConfirmationText>
        <strong>
          Your order has been successfully processed and will be delivered
          within 24 hours.
        </strong>
        <br />
        <br />
        Please keep a note of your confirmation number:
        <strong>{orderRecord.confirmationNumber}</strong>
        <br />
        If you have a query concerning your order, feel free to
        <Link to="/contact">contact us</Link>
        <a href="/contact">contact us</a>.
        <br />
        <br />
        Thank you for shopping at the Affable Bean Green Grocer!
      </ConfirmationText>
      <br />
    </div>
  );
}
