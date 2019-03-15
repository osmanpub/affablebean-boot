package com.affablebean.controller;

import com.affablebean.assembler.PromotionResourceAssembler;
import com.affablebean.exception.PromotionNotFoundException;
import com.affablebean.model.Promotion;
import com.affablebean.repository.PromotionRepository;

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
public class PromotionController {

	@Autowired
	PromotionRepository repository;

	@Autowired
	PromotionResourceAssembler assembler;

	@GetMapping("/promotions")
	public Resources<Resource<Promotion>> all() {

		List<Resource<Promotion>> promotions = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(promotions, linkTo(methodOn(PromotionController.class).all()).withSelfRel());
	}

	@PostMapping("/promotions")
	public ResponseEntity<?> newPromotion(@RequestBody Promotion newPromotion) throws URISyntaxException {

		Resource<Promotion> resource = assembler.toResource(repository.save(newPromotion));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/promotions/{id}")
	public Resource<Promotion> one(@PathVariable Integer id) {

		Promotion promotion = repository.findById(id).orElseThrow(() -> new PromotionNotFoundException(id));
		return assembler.toResource(promotion);
	}

	@PatchMapping("/promotions/{id}")
	public ResponseEntity<?> replacePromotion(@RequestBody Promotion newPromotion, @PathVariable Integer id)
			throws URISyntaxException {

		Promotion updatedPromotion = repository.findById(id).map(promotion -> {
			promotion.setDescription(newPromotion.getDescription());
			promotion.setDiscount(newPromotion.getDiscount());
			promotion.setName(newPromotion.getName());
			promotion.setQty(newPromotion.getQty());
			promotion.setSale(newPromotion.getSale());
			return repository.save(promotion);

		}).orElseGet(() -> {
			newPromotion.setId(id);
			return repository.save(newPromotion);
		});

		Resource<Promotion> resource = assembler.toResource(updatedPromotion);
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@DeleteMapping("/promotions/{id}")
	public ResponseEntity<?> deletePromotion(@PathVariable Integer id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
