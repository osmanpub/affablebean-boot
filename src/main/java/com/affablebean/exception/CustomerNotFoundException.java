package com.affablebean.exception;

public class CustomerNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1559360766655684177L;

	public CustomerNotFoundException(Long id) {
		super("Could not find customer order " + id);
	}
}
