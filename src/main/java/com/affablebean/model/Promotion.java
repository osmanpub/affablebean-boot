package com.affablebean.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "promotion")
@XmlRootElement
public class Promotion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4012313487132279750L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;

	@Column(name = "category_id")
	private Integer categoryId;

	@Size(max = 255)
	@Column(name = "description")
	private String description;

	@Basic(optional = false)
	@NotNull
	@Column(name = "discount")
	private int discount;

	@Basic(optional = false)
	@NotNull
	@Size(min = 1, max = 45)
	@Column(name = "name")
	private String name;

	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "qty")
	private Integer qty;

	@Column(name = "sale")
	private Boolean sale;

	// @Max(value=?) @Min(value=?)//if you know range of your decimal fields
	// consider using these annotations to enforce field validation
	@Column(name = "sold")
	private BigDecimal sold;

	public Promotion() {
	}

	public Promotion(Integer id) {
		this.id = id;
	}

	public Promotion(Integer id, String name, int discount) {
		this.id = id;
		this.name = name;
		this.discount = discount;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public Boolean getSale() {
		return sale;
	}

	public void setSale(Boolean sale) {
		this.sale = sale;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	public BigDecimal getSold() {
		return sold;
	}

	public void setSold(BigDecimal sold) {
		this.sold = sold;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof Promotion)) {
			return false;
		}
		Promotion other = (Promotion) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Promotion [id=" + id + ", name=" + name + ", discount=" + discount + ", sale=" + sale + ", categoryId="
				+ categoryId + ", productId=" + productId + ", qty=" + qty + ", sold=" + sold + ", description="
				+ description + "]";
	}

}
