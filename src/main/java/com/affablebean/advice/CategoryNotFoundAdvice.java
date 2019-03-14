package com.affablebean.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.affablebean.exception.CategoryNotFoundException;

@ControllerAdvice
public class CategoryNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(CategoryNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String categoryNotFoundHandler(CategoryNotFoundException ex) {
		return ex.getMessage();
	}
}
