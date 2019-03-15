package com.affablebean.exception;

public class MsgFeedbackNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4911704767183845004L;

	public MsgFeedbackNotFoundException(Integer id) {
		super("Could not find message feedback " + id);
	}
}
