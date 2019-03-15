package com.affablebean.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import com.affablebean.controller.ProductController;
import com.affablebean.model.Product;

@Component
public class ProductResourceAssembler implements ResourceAssembler<Product, Resource<Product>> {

	@Override
	public Resource<Product> toResource(Product product) {
		return new Resource<>(product, linkTo(methodOn(ProductController.class).one(product.getId())).withSelfRel(),
				linkTo(methodOn(ProductController.class).all()).withRel("products"));
	}
}
