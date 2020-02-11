import React from "react";
import { Link } from "react-router-dom";
import { getId } from "../../helpers/utils";
import { Order, OrderedProduct } from "../../interfaces/purchase";
import "./Confirmation.css";
import {
  ConfirmationText,
  DateProcessedRow,
  DeliveryAddressTable,
  DeliveryAddressTableTd,
  DeliverySurchargeCellLeft,
  DeliverySurchargeCellRight,
  OrderSummaryTable,
  TotalCellLeft,
  TotalCellRight
} from "./Confirmation.styles";

type Props = {
  order: Order;
};

export default function Confirmation(props: Props) {
  // BUG:for node, the orderedProducts and products arrays are not working!
  const { customer, orderedProducts, orderRecord, products } = props.order;

  const orderedProductsList = orderedProducts.map(
    (product: OrderedProduct, index: number) => {
      const rowCol = index % 2 === 0 ? "white" : "lightBlue";
      const qty = product.quantity;
      const subtotal = (products[index].price * qty).toFixed(2);

      return (
        <tr className={`${rowCol}`} key={getId(products[index])}>
          <td>{products[index].name}</td>
          <td className="quantityColumn">{qty}</td>
          <td className="confirmationPriceColumn">&euro; {subtotal}</td>
        </tr>
      );
    }
  );

  const tdStyle = {
    padding: "0 20px"
  };

  return (
    <div className="singleColumn">
      <ConfirmationText>
        <strong data-cy="confirm-success">
          Your order has been successfully processed and will be delivered
          within 24 hours.
        </strong>
        <br />
        <br />
        Please keep a note of your confirmation number:
        <strong>{orderRecord.confirmationNumber}</strong>
        <br />
        If you have a query concerning your order, feel free to&nbsp;
        <Link to="/contact">contact us</Link>
        <br />
        <br />
        Thank you for shopping at the Affable Bean Green Grocer!
      </ConfirmationText>
      <div className="summaryColumn">
        <OrderSummaryTable className="detailsTable">
          <tbody>
            <tr className="header">
              <th colSpan={3}>order summary</th>
            </tr>
            <tr className="tableHeading">
              <td>product</td>
              <td>quantity</td>
              <td>price</td>
            </tr>
            {orderedProductsList}
            <tr className="lightBlue">
              <td colSpan={3} style={tdStyle}>
                <hr />
              </td>
            </tr>
            <tr className="lightBlue">
              <DeliverySurchargeCellLeft colSpan={2}>
                <strong>surcharge:</strong>
              </DeliverySurchargeCellLeft>
              <DeliverySurchargeCellRight>
                &euro; {surcharge.toFixed(2)}
              </DeliverySurchargeCellRight>
            </tr>
            <tr className="lightBlue">
              <TotalCellLeft colSpan={2}>
                <strong>total:</strong>
              </TotalCellLeft>
              <TotalCellRight>
                &euro; {orderRecord.amount.toFixed(2)}
              </TotalCellRight>
            </tr>
            <tr className="lightBlue">
              <td colSpan={3} style={tdStyle}>
                <hr />
              </td>
            </tr>
            <tr className="lightBlue">
              <DateProcessedRow colSpan={3}>
                <strong>date processed: </strong>
                <span>{orderRecord.dateCreated}</span>
              </DateProcessedRow>
            </tr>
          </tbody>
        </OrderSummaryTable>
      </div>
      <div className="summaryColumn">
        <DeliveryAddressTable className="detailsTable">
          <tbody>
            <tr className="header">
              <th colSpan={3}>delivery address</th>
            </tr>
            <tr>
              <DeliveryAddressTableTd colSpan={3} className="lightBlue">
                {customer.name}
                <br />
                {customer.address}
                <br />
                {customer.cityRegion}
                <br />
                <hr />
                {customer.email}
                <br />
                {customer.phone}
              </DeliveryAddressTableTd>
            </tr>
          </tbody>
        </DeliveryAddressTable>
      </div>
    </div>
  );
}

const surcharge = 3;
