package com.affablebean.controller;

import com.affablebean.assembler.CustomerResourceAssembler;
import com.affablebean.exception.CustomerNotFoundException;
import com.affablebean.model.Customer;
import com.affablebean.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class CustomerController {

	@Autowired
	CustomerRepository repository;

	@Autowired
	CustomerResourceAssembler assembler;

	@GetMapping("/customers")
	public Resources<Resource<Customer>> all() {

		List<Resource<Customer>> customers = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(customers, linkTo(methodOn(CustomerController.class).all()).withSelfRel());
	}

	@PostMapping("/customers")
	public ResponseEntity<?> newCustomer(@RequestBody Customer newCustomer) throws URISyntaxException {

		Resource<Customer> resource = assembler.toResource(repository.save(newCustomer));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/customers/{id}")
	public Resource<Customer> one(@PathVariable Integer id) {

		Customer customer = repository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
		return assembler.toResource(customer);
	}

	@PutMapping("/customers/{id}")
	public ResponseEntity<?> replaceCustomer(@RequestBody Customer newCustomer, @PathVariable Integer id)
			throws URISyntaxException {

		Customer updatedCustomer = repository.findById(id).map(customer -> {
			customer.setAddress(newCustomer.getAddress());			
			customer.setCcNumber(newCustomer.getCcNumber());			
			customer.setCityRegion(customer.getCityRegion());
			customer.setCustomerOrderCollection(customer.getCustomerOrderCollection());
			customer.setEmail(customer.getEmail());
			customer.setName(newCustomer.getName());
			customer.setPhone(customer.getPhone());
			return repository.save(customer);

		}).orElseGet(() -> {
			newCustomer.setId(id);
			return repository.save(newCustomer);
		});

		Resource<Customer> resource = assembler.toResource(updatedCustomer);
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@DeleteMapping("/customers/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable Integer id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
