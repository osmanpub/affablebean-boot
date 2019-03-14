package com.affablebean.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.affablebean.exception.PromotionNotFoundException;

@ControllerAdvice
public class PromotionNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(PromotionNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String resourceNotFoundHandler(PromotionNotFoundException ex) {
		return ex.getMessage();
	}
}
