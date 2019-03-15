package com.affablebean.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import com.affablebean.controller.CustomerOrderController;
import com.affablebean.model.CustomerOrder;

@Component
public class CustomerOrderResourceAssembler implements ResourceAssembler<CustomerOrder, Resource<CustomerOrder>> {

	@Override
	public Resource<CustomerOrder> toResource(CustomerOrder customerOrder) {
		return new Resource<>(customerOrder, linkTo(methodOn(CustomerOrderController.class).one(customerOrder.getId())).withSelfRel(),
				linkTo(methodOn(CustomerOrderController.class).all()).withRel("customerOrders"));
	}
}
