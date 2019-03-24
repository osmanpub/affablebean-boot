package com.affablebean.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "ordered_product")
public class OrderedProduct implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8817504540585670297L;

	@EmbeddedId
	protected OrderedProductPK orderedProductPK;

	@Basic(optional = false)
	@Column(name = "quantity")
	@NotBlank
	private Short quantity;

	@JoinColumn(name = "customer_order_id", referencedColumnName = "id", insertable = false, updatable = false)
	@ManyToOne(optional = false)
	private CustomerOrder customerOrder;

	@JoinColumn(name = "product_id", referencedColumnName = "id", insertable = false, updatable = false)
	@ManyToOne(optional = false)
	private Product product;

	public OrderedProduct() {
	}

	public OrderedProduct(OrderedProductPK orderedProductPK) {
		this.orderedProductPK = orderedProductPK;
	}

	public OrderedProduct(OrderedProductPK orderedProductPK, short quantity) {
		this.orderedProductPK = orderedProductPK;
		this.quantity = quantity;
	}

	public OrderedProduct(int customerOrderId, int productId) {
		this.orderedProductPK = new OrderedProductPK(customerOrderId, productId);
	}

	public OrderedProductPK getOrderedProductPK() {
		return orderedProductPK;
	}

	public void setOrderedProductPK(OrderedProductPK orderedProductPK) {
		this.orderedProductPK = orderedProductPK;
	}

	public Short getQuantity() {
		return quantity;
	}

	public void setQuantity(Short quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public CustomerOrder getCustomerOrder() {
		return customerOrder;
	}

	public void setCustomerOrder(CustomerOrder customerOrder) {
		this.customerOrder = customerOrder;
	}

	@Override
	public int hashCode() {
		return Objects.hash(orderedProductPK);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof OrderedProduct)) {
			return false;
		}
		OrderedProduct other = (OrderedProduct) obj;
		return Objects.equals(orderedProductPK, other.orderedProductPK);
	}

	@Override
	public String toString() {
		return "OrderedProduct [orderedProductPK=" + orderedProductPK + ", quantity=" + quantity + ", product="
				+ product + ", customerOrder=" + customerOrder + "]";
	}

}