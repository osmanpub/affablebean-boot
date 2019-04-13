import React from "react";

export function CartItem(props) {
  const { item } = props;
  const { product } = item;
  const name = product.name;

  return (
    <React.Fragment>
      <tr>
        <td>
          <img
            src={"/static/img/products/" + name + ".png"}
            alt="{product.name}"
          />
        </td>
      </tr>
    </React.Fragment>
  );
}

{
  /* <tr th:class="${iterStat.odd} ? 'white' : 'lightBlue'">		
<td>
  <img th:src="@{__${prodPath}__/__${product.name}__.png}"
       th:alt="#{${product.name}}">
</td>

<td th:utext="#{${product.name}}"></td>

<td> 
  &euro; 
  <span th:text="${#numbers.formatDecimal(cartItem.total, 0, 'COMMA', 2, 'POINT')}">
    10.00
  </span>
  <br>
  <span class="smallText" 
    th:text="${#numbers.formatDecimal(product.price, 0, 'COMMA', 2, 'POINT')} + ' ' + #{unit}">
    10.00
  </span>
</td>			

<td>
  <div class="form-group">
    <div class="col-sm-10">
      <input type="number" class="form-control"
             th:id="'qty' + ${product.id}" 
             maxlength="2" size="2"
             th:value="${cartItem.quantity}"
             style="margin:5px; text-align: center;">
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary btn-sm" th:onclick="'updateCart(' + ${product.id} + ')'">
        <span th:text="#{update}"></span>
      </button>										
    </div>
  </div>
</td>
</tr> */
}
