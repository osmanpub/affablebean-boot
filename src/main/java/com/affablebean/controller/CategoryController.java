package com.affablebean.controller;

import com.affablebean.assembler.CategoryResourceAssembler;
import com.affablebean.domain.Category;
import com.affablebean.exception.CategoryNotFoundException;
import com.affablebean.repository.CategoryRepository;

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
public class CategoryController {

	@Autowired
	private CategoryRepository repository;

	@Autowired
	private CategoryResourceAssembler assembler;

	@GetMapping("/categories")
	public Resources<Resource<Category>> all() {

		List<Resource<Category>> categories = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(categories, linkTo(methodOn(CategoryController.class).all()).withSelfRel());
	}

	@PostMapping("/categories")
	public ResponseEntity<?> newCategory(@RequestBody Category newCategory) throws URISyntaxException {

		Resource<Category> resource = assembler.toResource(repository.save(newCategory));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/categories/{id}")
	public Resource<Category> one(@PathVariable Short id) {

		Category category = repository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
		return assembler.toResource(category);
	}

	@PatchMapping("/categories/{id}")
	public ResponseEntity<?> replaceCategory(@RequestBody Category newCategory, @PathVariable Short id)
			throws URISyntaxException {

		Category updatedCategory = repository.findById(id).map(category -> {
			category.setName(newCategory.getName());
			return repository.save(category);

		}).orElseGet(() -> {
			newCategory.setId(id);
			return repository.save(newCategory);
		});

		Resource<Category> resource = assembler.toResource(updatedCategory);
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@DeleteMapping("/categories/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable Short id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
