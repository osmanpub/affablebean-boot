package com.affablebean.form;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CheckoutForm {

	@Email
	@NotNull
	@Size(min = 8, max = 64)
	private String email;

	@NotNull
	@Size(min = 3, max = 64)
	private String name;

	@NotNull
	@Size(min = 8, max = 32)
	private String phone;

	@NotNull
	@Size(min = 8, max = 256)
	private String address;

	@NotNull
	@Size(min = 2, max = 2)
	private String cityRegion = "NY"; // hard coded for now :(

	@NotNull
	@Size(min = 16, max = 19)
	private String creditCard;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getCreditCard() {
		return creditCard;
	}

	public void setCreditCard(String creditCard) {
		this.creditCard = creditCard;
	}

	@Override
	public String toString() {
		return "CheckoutForm [email=" + email + ", name=" + name + ", phone=" + phone + ", address=" + address
				+ ", cityRegion=" + cityRegion + ", creditcard=" + creditCard + "]";
	}

}
