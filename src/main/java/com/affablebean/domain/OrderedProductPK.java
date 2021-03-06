package com.affablebean.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class OrderedProductPK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3648458571429198808L;

	@Basic(optional = false)
	@Column(name = "customer_order_id")
	private Integer customerOrderId;

	@Basic(optional = false)
	@Column(name = "product_id")
	private Integer productId;

	public OrderedProductPK() {
	}

	public OrderedProductPK(int customerOrderId, int productId) {
		this.customerOrderId = customerOrderId;
		this.productId = productId;
	}

	public Integer getCustomerOrderId() {
		return customerOrderId;
	}

	public void setCustomerOrderId(Integer customerOrderId) {
		this.customerOrderId = customerOrderId;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(customerOrderId, productId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof OrderedProductPK)) {
			return false;
		}
		OrderedProductPK other = (OrderedProductPK) obj;
		return customerOrderId == other.customerOrderId && productId == other.productId;
	}

	@Override
	public String toString() {
		return "OrderedProductPK [customerOrderId=" + customerOrderId + ", productId=" + productId + "]";
	}

}