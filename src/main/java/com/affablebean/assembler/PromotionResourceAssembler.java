package com.affablebean.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import com.affablebean.controller.PromotionController;
import com.affablebean.model.Promotion;

@Component
public class PromotionResourceAssembler implements ResourceAssembler<Promotion, Resource<Promotion>> {

	@Override
	public Resource<Promotion> toResource(Promotion promotion) {
		return new Resource<>(promotion, linkTo(methodOn(PromotionController.class).one(promotion.getId())).withSelfRel(),
				linkTo(methodOn(PromotionController.class).all()).withRel("promotions"));
	}
}
