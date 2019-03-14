package com.affablebean.exception;

public class ProductNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3896146139774939779L;

	public ProductNotFoundException(Long id) {
		super("Could not find product " + id);
	}
}
