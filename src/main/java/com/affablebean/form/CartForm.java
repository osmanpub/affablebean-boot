package com.affablebean.form;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class CartForm {

	@NotNull
	private Integer productId;

	@NotNull
	@Min(0)
	@Max(999)
	private Short quantity;

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Short getQuantity() {
		return quantity;
	}

	public void setQuantity(Short quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "CartForm [productId=" + productId + ", quantity=" + quantity + "]";
	}

}
