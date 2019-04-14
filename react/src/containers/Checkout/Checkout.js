import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchCategoriesIfNeeded } from "../../net/categories";

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
              <div className={`col-sm-offset-2 col-sm-10`}>
                <button type="submit" className={`btn btn-primary`}>
                  submit purchase
                </button>
              </div>
            </div>
          </form>
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

// <div class="singleColumn">
// 	<h2 th:text="#{checkout}"></h2>
// 	<p th:text="#{checkoutText}"></p>
// 	<br>

//       <form class="form-horizontal" action="#" th:action="@{/purchase}" th:object="${checkoutForm}"
//       	method="post" id="checkoutForm">

// 		<div class="form-group">
// 			<label for="email" class="col-sm-2 control-label" th:text="#{email}">
// 			</label>

// 			<div class="col-sm-10">
// 				<input type="email" class="form-control" name="email" th:field="*{email}"
// 							 maxlength="45"
// 							 placeholder="At least 8 chars one of which must be '@' and no more than 45 chars"
// 							 size="31"
// 							 value="">
//                   <div th:if="${#fields.hasErrors('email')}" th:errors="*{email}">
//                   	Email Error
//                 	</div>
// 			</div>
// 		</div>

// 		<div class="form-group">
// 			<label for="phone" class="col-sm-2 control-label" th:text="#{phone}">
// 			</label>

// 			<div class="col-sm-10">
// 				<input type="text" class="form-control" name="phone" th:field="*{phone}"
// 							 maxlength="16"
// 							 placeholder="At least 8 chars and no more than 30 chars"
// 							 size="31"
// 							 value="">
//                   <div th:if="${#fields.hasErrors('phone')}" th:errors="*{phone}">
//                   	Phone Error
//                 	</div>
// 			</div>
// 		</div>

// 		<div class="form-group">
// 			<label for="address" class="col-sm-2 control-label" th:text="#{address}">
// 			</label>

// 			<div class="col-sm-10">
// 				<input type="text" class="form-control" name="address" th:field="*{address}"
// 							 maxlength="45"
// 							 placeholder="At least 8 chars and no more than 45 chars"
// 							 size="31"
// 							 value="">
//                   <div th:if="${#fields.hasErrors('address')}" th:errors="*{address}">
//                   	Address Error
//                 	</div>
// 			</div>
// 		</div>

// 		<div class="form-group">
// 			<label for="creditcard" class="col-sm-2 control-label" th:text="#{creditCard}">
// 			</label>

// 			<div class="col-sm-10">
// 				<input type="text" class="form-control" name="creditcard" th:field="*{creditCard}"
// 							 maxlength="19"
// 							 placeholder="At least 8 chars and no more than 19 chars"
// 							 size="31"
// 							 value="">
//                   <div th:if="${#fields.hasErrors('creditCard')}" th:errors="*{creditCard}">
//                   	Credit card
//                 	</div>
// 			</div>
// 		</div>

// 		<div class="form-group">
// 			<div class="col-sm-offset-2 col-sm-10">
// 				<button type="submit" class="btn btn-primary">
// 					<span th:text="#{submit}"></span>
// 				</button>
// 			</div>
// 		</div>
// 	</form>

// 	<div id="infoBox">
// 		<ul>
// 			<li th:text="#{nextDayGuarantee}"></li>
// 			<li th:text="#{phone}">
// 				<span th:text="#{deliveryFee1}">
// 				</span>

// 				&euro;
// 				<span th:text="${#numbers.formatDecimal(deliverySurcharge, 0, 'COMMA', 2, 'POINT')}">
// 					10.00
// 				</span>

// 				<span th:text="#{deliveryFee2}">
// 				</span>
// 			</li>
// 		</ul>

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
