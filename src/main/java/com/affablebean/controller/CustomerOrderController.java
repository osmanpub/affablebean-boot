package com.affablebean.controller;

import com.affablebean.assembler.CustomerOrderResourceAssembler;
import com.affablebean.domain.CustomerOrder;
import com.affablebean.exception.CustomerOrderNotFoundException;
import com.affablebean.repository.CustomerOrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
public class CustomerOrderController {

	@Autowired
	private CustomerOrderRepository repository;

	@Autowired
	private CustomerOrderResourceAssembler assembler;

	@GetMapping("/customerOrders")
	public Resources<Resource<CustomerOrder>> all() {

		List<Resource<CustomerOrder>> customerOrders = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(customerOrders, linkTo(methodOn(CustomerOrderController.class).all()).withSelfRel());
	}

	@PostMapping("/customerOrders")
	public ResponseEntity<?> newCustomerOrder(@RequestBody CustomerOrder newCustomerOrder) throws URISyntaxException {

		Resource<CustomerOrder> resource = assembler.toResource(repository.save(newCustomerOrder));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/customerOrders/{id}")
	public Resource<CustomerOrder> one(@PathVariable Integer id) {

		CustomerOrder customerOrder = repository.findById(id).orElseThrow(() -> new CustomerOrderNotFoundException(id));
		return assembler.toResource(customerOrder);
	}

	@DeleteMapping("/customerOrders/{id}")
	public ResponseEntity<?> deleteCustomerOrder(@PathVariable Integer id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
