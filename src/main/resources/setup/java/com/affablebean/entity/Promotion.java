/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.affablebean.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author osman
 */
@Entity
@Table(name = "promotion")
@XmlRootElement
@NamedQueries({
	@NamedQuery(name = "Promotion.findAll", query = "SELECT p FROM Promotion p"),
	@NamedQuery(name = "Promotion.findById", query = "SELECT p FROM Promotion p WHERE p.id = :id"),
	@NamedQuery(name = "Promotion.findByName", query = "SELECT p FROM Promotion p WHERE p.name = :name"),
	@NamedQuery(name = "Promotion.findByDiscount", query = "SELECT p FROM Promotion p WHERE p.discount = :discount"),
	@NamedQuery(name = "Promotion.findBySale", query = "SELECT p FROM Promotion p WHERE p.sale = :sale"),
	@NamedQuery(name = "Promotion.findByCategoryId", query = "SELECT p FROM Promotion p WHERE p.categoryId = :categoryId"),
	@NamedQuery(name = "Promotion.findByProductId", query = "SELECT p FROM Promotion p WHERE p.productId = :productId"),
	@NamedQuery(name = "Promotion.findByQty", query = "SELECT p FROM Promotion p WHERE p.qty = :qty"),
	@NamedQuery(name = "Promotion.findBySold", query = "SELECT p FROM Promotion p WHERE p.sold = :sold"),
	@NamedQuery(name = "Promotion.findByDescription", query = "SELECT p FROM Promotion p WHERE p.description = :description")})
public class Promotion implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Basic(optional = false)
  @Column(name = "id")
	private Integer id;
	@Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 45)
  @Column(name = "name")
	private String name;
	@Basic(optional = false)
  @NotNull
  @Column(name = "discount")
	private int discount;
	@Column(name = "sale")
	private Boolean sale;
	@Column(name = "category_id")
	private Integer categoryId;
	@Column(name = "product_id")
	private Integer productId;
	@Column(name = "qty")
	private Integer qty;
	// @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
	@Column(name = "sold")
	private BigDecimal sold;
	@Size(max = 255)
  @Column(name = "description")
	private String description;

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
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof Promotion)) {
			return false;
		}
		Promotion other = (Promotion) object;
		return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
	}

	@Override
	public String toString() {
		return "com.affablebean.entity.Promotion[ id=" + id + " ]";
	}
	
}
