package com.affablebean.exception;

public class CategoryNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1491494482040903967L;

	public CategoryNotFoundException(Short id) {
		super("Could not find category " + id);
	}
}
