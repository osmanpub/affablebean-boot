import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchCategoriesIfNeeded } from "../../net/categories";
import {
  InfoBox,
  PriceBox,
  PriceBoxTd,
  PriceBoxSubTotalTd
} from "./Checkout.styles";
export class Checkout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const { cart, match } = this.props;

    return (
      <div>
        <Header cart={cart} url={match.url} />
        <div className="singleColumn">
          <h2>checkout</h2>
          <p>
            In order to purchase the items in your shopping cart, please provide
            us with the following information:
          </p>
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="name" className={`col-sm-2 control-label`}>
                name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  maxlength="45"
                  placeholder="At least 8 chars and no more than 45 chars"
                  size="31"
                  value=""
                />
              </div>
            </div>
            <div className="form-group">
              <label for="email" className={`col-sm-2 control-label`}>
                email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  maxlength="45"
                  placeholder="At least 8 chars and no more than 45 chars"
                  size="31"
                  value=""
                />
              </div>
            </div>
            <div className="form-group">
              <label for="phone" className={`col-sm-2 control-label`}>
                phone
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  maxlength="45"
                  placeholder="At least 8 chars and no more than 30 chars"
                  size="31"
                  value=""
                />
              </div>
            </div>
            <div className="form-group">
              <label for="address" className={`col-sm-2 control-label`}>
                address
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  maxlength="45"
                  placeholder="At least 8 chars and no more than 45 chars"
                  size="31"
                  value=""
                />
              </div>
            </div>
            <div className="form-group">
              <label for="creditcard" className={`col-sm-2 control-label`}>
                credit card
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="creditcard"
                  maxlength="45"
                  placeholder="At least 16 chars and no more than 19 chars"
                  size="31"
                  value=""
                />
              </div>
            </div>
            <div className="form-group">
              <div className={`col-sm-offset-2 col-sm-10`}>
                <button type="submit" className={`btn btn-primary`}>
                  submit purchase
                </button>
              </div>
            </div>
          </form>
          <InfoBox>
            <ul>
              <li>Next-day delivery is guaranteed</li>
              <li>
                A &euro; 3.00 delivery surcharge is applied to all purchase
                orders
              </li>
            </ul>
          </InfoBox>
          <PriceBox>
            <tbody>
              <tr>
                <PriceBoxTd>subtotal:</PriceBoxTd>
                <PriceBoxSubTotalTd className="checkoutPriceColumn">
                  &euro;
                  {cart.subtotal.toFixed(2)}
                </PriceBoxSubTotalTd>
              </tr>
            </tbody>
          </PriceBox>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;

  return {
    cart
  };
};

export default connect(mapStateToProps)(Checkout);

// 	<div id="infoBox">

// 		<table id="priceBox">
// 			<tr>
// 				<td th:text="#{subtotal} + ':'"></td>
// 				<td class="checkoutPriceColumn">
// 					&euro;
// 					<span th:text="${#numbers.formatDecimal(cart.subtotal, 0, 'COMMA', 2, 'POINT')}"></span>
// 				</td>
// 			</tr>

// 			<tr>
// 				<td th:text="#{surcharge} + ':'"></td>
// 				<td class="checkoutPriceColumn">
// 					&euro;
// 					<span th:text="${#numbers.formatDecimal(deliverySurcharge, 0, 'COMMA', 2, 'POINT')}"></span>
// 				</td>
// 			</tr>

// 			<tr>
// 				<td class="total" th:text="#{total} + ':'"></td>
// 				<td class="total checkoutPriceColumn">
// 					&euro;
// 					<span th:with="total=${cart.subtotal} + ${deliverySurcharge}"
// 						th:text="${#numbers.formatDecimal(total, 0, 'COMMA', 2, 'POINT')}"></span>
// 				</td>
// 			</tr>
// 		</table>
// 	</div>
// </div>
