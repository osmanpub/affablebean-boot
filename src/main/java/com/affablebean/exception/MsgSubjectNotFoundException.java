package com.affablebean.exception;

public class MsgSubjectNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2261009936761844960L;

	public MsgSubjectNotFoundException(Integer id) {
		super("Could not find message subject " + id);
	}
}
