package com.affablebean.controller;

import com.affablebean.assembler.ProductResourceAssembler;
import com.affablebean.domain.Product;
import com.affablebean.exception.ProductNotFoundException;
import com.affablebean.repository.ProductRepository;

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
public class ProductController {

	@Autowired
	private ProductRepository repository;

	@Autowired
	private ProductResourceAssembler assembler;

	@GetMapping("/products")
	public Resources<Resource<Product>> all() {

		List<Resource<Product>> products = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(products, linkTo(methodOn(ProductController.class).all()).withSelfRel());
	}

	@PostMapping("/products")
	public ResponseEntity<?> newProduct(@RequestBody Product newProduct) throws URISyntaxException {

		Resource<Product> resource = assembler.toResource(repository.save(newProduct));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/products/{id}")
	public Resource<Product> one(@PathVariable Integer id) {

		Product product = repository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
		return assembler.toResource(product);
	}

	@PatchMapping("/products/{id}")
	public ResponseEntity<?> replaceProduct(@RequestBody Product newProduct, @PathVariable Integer id)
			throws URISyntaxException {

		Product updatedProduct = repository.findById(id).map(product -> {
			product.setCategory(newProduct.getCategory());
			product.setDescription(newProduct.getDescription());
			product.setName(newProduct.getName());
			product.setPrice(newProduct.getPrice());
			return repository.save(product);

		}).orElseGet(() -> {
			newProduct.setId(id);
			return repository.save(newProduct);
		});

		Resource<Product> resource = assembler.toResource(updatedProduct);
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
