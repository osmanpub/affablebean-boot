package com.affablebean.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "product")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "lastUpdate", "orderedProductCollection" }, ignoreUnknown = true)
public class Product implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8800952473434944288L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;

	@Size(max = 255)
	@Column(name = "description")
	@NotBlank
	private String description;

	@Basic(optional = false)
	@Column(name = "last_update")
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date lastUpdate;

	@Basic(optional = false)
	@Column(name = "name")
	@NotBlank
	private String name;

	@Basic(optional = false)
	@Column(name = "price")
	@NotBlank
	private BigDecimal price;

	@JoinColumn(name = "category_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Category category;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
	private Collection<OrderedProduct> orderedProductCollection;

	public Product() {
	}

	public Product(Integer id) {
		this.id = id;
	}

	public Product(Integer id, String name, BigDecimal price) {
		this.id = id;
		this.name = name;
		this.price = price;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Collection<OrderedProduct> getOrderedProductCollection() {
		return orderedProductCollection;
	}

	public void setOrderedProductCollection(Collection<OrderedProduct> orderedProductCollection) {
		this.orderedProductCollection = orderedProductCollection;
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
		if (!(obj instanceof Product)) {
			return false;
		}
		Product other = (Product) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", category=" + category + ", description=" + description + ", lastUpdate="
				+ lastUpdate + ", name=" + name + ", price=" + price + "]";
	}

}
