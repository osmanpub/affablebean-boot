package com.affablebean.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.affablebean.exception.MsgSubjectNotFoundException;

@ControllerAdvice
public class MsgSubjectNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(MsgSubjectNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String resourceNotFoundHandler(MsgSubjectNotFoundException ex) {
		return ex.getMessage();
	}
}
