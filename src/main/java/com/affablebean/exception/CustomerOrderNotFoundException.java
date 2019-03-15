package com.affablebean.exception;

public class CustomerOrderNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1559360766655684177L;

	public CustomerOrderNotFoundException(Integer id) {
		super("Could not find customer " + id);
	}
}
