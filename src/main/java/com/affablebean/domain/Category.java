package com.affablebean.domain;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "category")
@JsonIgnoreProperties(value = { "productCollection" }, ignoreUnknown = true)
public class Category implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4907487147078828473L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Short id;

	@Basic(optional = false)
	@Column(name = "name")
	@NotBlank
	private String name;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	private Collection<Product> productCollection;

	public Category() {
	}

	public Category(String name) {
		this.name = name;
	}

	public Short getId() {
		return id;
	}

	public void setId(Short id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Collection<Product> getProductCollection() {
		return productCollection;
	}

	public void setProductCollection(Collection<Product> productCollection) {
		this.productCollection = productCollection;
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
		if (!(obj instanceof Category)) {
			return false;
		}
		Category other = (Category) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + "]";
	}

}