package com.affablebean.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import com.affablebean.controller.CategoryController;
import com.affablebean.model.Category;

@Component
public class CategoryResourceAssembler implements ResourceAssembler<Category, Resource<Category>> {

	@Override
	public Resource<Category> toResource(Category category) {
		return new Resource<>(category, linkTo(methodOn(CategoryController.class).one(category.getId())).withSelfRel(),
				linkTo(methodOn(CategoryController.class).all()).withRel("categories"));
	}
}
