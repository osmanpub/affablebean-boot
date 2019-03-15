package com.affablebean.exception;

public class PromotionNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7225191521158738044L;

	public PromotionNotFoundException(Integer id) {
		super("Could not find promotion " + id);
	}
}
