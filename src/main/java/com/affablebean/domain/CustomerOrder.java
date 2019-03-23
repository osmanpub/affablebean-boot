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

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "customer_order")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "dateCreated", "orderedProductCollection" }, ignoreUnknown = true)
public class CustomerOrder implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1100076091463044952L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;

	@Basic(optional = false)
	@Column(name = "amount")
	@NotBlank
	private BigDecimal amount;

	@Basic(optional = false)
	@Column(name = "confirmation_number")
	@NotBlank
	private int confirmationNumber;

	@Basic(optional = false)
	@Column(name = "date_created")
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date dateCreated;

	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	@ManyToOne(optional = false)
	private Customer customer;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "customerOrder")
	private Collection<OrderedProduct> orderedProductCollection;

	public CustomerOrder() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public int getConfirmationNumber() {
		return confirmationNumber;
	}

	public void setConfirmationNumber(int confirmationNumber) {
		this.confirmationNumber = confirmationNumber;
	}

	public Collection<OrderedProduct> getOrderedProductCollection() {
		return orderedProductCollection;
	}

	public void setOrderedProductCollection(Collection<OrderedProduct> orderedProductCollection) {
		this.orderedProductCollection = orderedProductCollection;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
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
		if (!(obj instanceof CustomerOrder)) {
			return false;
		}
		CustomerOrder other = (CustomerOrder) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "CustomerOrder [id=" + id + ", amount=" + amount + ", dateCreated=" + dateCreated
				+ ", confirmationNumber=" + confirmationNumber + "]";
	}

}