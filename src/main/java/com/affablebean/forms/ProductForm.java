package com.affablebean.forms;

import javax.validation.constraints.NotNull;

public class ProductForm {

	@NotNull
	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "ProductForm [id=" + id + "]";
	}

}
