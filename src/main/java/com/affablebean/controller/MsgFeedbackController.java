package com.affablebean.controller;

import com.affablebean.assembler.MsgFeedbackResourceAssembler;
import com.affablebean.domain.MsgFeedback;
import com.affablebean.exception.MsgFeedbackNotFoundException;
import com.affablebean.repository.MsgFeedbackRepository;

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
public class MsgFeedbackController {

	@Autowired
	private MsgFeedbackRepository repository;

	@Autowired
	private MsgFeedbackResourceAssembler assembler;

	@GetMapping("/feedbacks")
	public Resources<Resource<MsgFeedback>> all() {

		List<Resource<MsgFeedback>> feedbacks = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(feedbacks, linkTo(methodOn(MsgFeedbackController.class).all()).withSelfRel());
	}

	@PostMapping("/feedbacks")
	public ResponseEntity<?> newMsgFeedback(@RequestBody MsgFeedback newMsgFeedback) throws URISyntaxException {

		Resource<MsgFeedback> resource = assembler.toResource(repository.save(newMsgFeedback));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/feedbacks/{id}")
	public Resource<MsgFeedback> one(@PathVariable Integer id) {

		MsgFeedback feedback = repository.findById(id).orElseThrow(() -> new MsgFeedbackNotFoundException(id));
		return assembler.toResource(feedback);
	}

	@DeleteMapping("/feedbacks/{id}")
	public ResponseEntity<?> deleteMsgFeedback(@PathVariable Integer id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
