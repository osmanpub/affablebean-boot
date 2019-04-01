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
import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "customer")
@JsonIgnoreProperties(value = { "customerOrderCollection" }, ignoreUnknown = true)
public class Customer implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2950330004809284770L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;

	@Basic(optional = false)
	@Column(name = "address")
	@NotBlank
	private String address;

	@Basic(optional = false)
	@Column(name = "cc_number")
	@NotBlank
	@Digits(fraction = 0, integer = 19)
	private String ccNumber;

	@Basic(optional = false)
	@Column(name = "city_region")
	@NotBlank
	private String cityRegion;

	@Basic(optional = false)
	@Column(name = "email")
	@Email
	@NotBlank
	private String email;

	@Basic(optional = false)
	@Column(name = "name")
	@NotBlank
	private String name;

	@Basic(optional = false)
	@Column(name = "phone")
	@NotBlank
	private String phone;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
	private Collection<CustomerOrder> customerOrderCollection;

	public Customer() {
	}

	public Customer(String name, String email, String phone, String address, String cityRegion, String ccNumber) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.cityRegion = cityRegion;
		this.ccNumber = ccNumber;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCityRegion() {
		return cityRegion;
	}

	public void setCityRegion(String cityRegion) {
		this.cityRegion = cityRegion;
	}

	public String getCcNumber() {
		return ccNumber;
	}

	public void setCcNumber(String ccNumber) {
		this.ccNumber = ccNumber;
	}

	public Collection<CustomerOrder> getCustomerOrderCollection() {
		return customerOrderCollection;
	}

	public void setCustomerOrderCollection(Collection<CustomerOrder> customerOrderCollection) {
		this.customerOrderCollection = customerOrderCollection;
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
		if (!(obj instanceof Customer)) {
			return false;
		}
		Customer other = (Customer) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", name=" + name + ", email=" + email + ", phone=" + phone + ", address="
				+ address + ", cityRegion=" + cityRegion + ", ccNumber=" + ccNumber + "]";
	}

}