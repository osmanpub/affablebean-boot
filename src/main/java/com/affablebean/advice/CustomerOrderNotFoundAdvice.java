package com.affablebean.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.affablebean.exception.CustomerOrderNotFoundException;

@ControllerAdvice
public class CustomerOrderNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(CustomerOrderNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String resourceNotFoundHandler(CustomerOrderNotFoundException ex) {
		return ex.getMessage();
	}
}
