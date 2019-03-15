package com.affablebean.controller;

import com.affablebean.assembler.MsgSubjectResourceAssembler;
import com.affablebean.exception.MsgSubjectNotFoundException;
import com.affablebean.model.MsgSubject;
import com.affablebean.repository.MsgSubjectRepository;

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
public class MsgSubjectController {

	@Autowired
	MsgSubjectRepository repository;

	@Autowired
	MsgSubjectResourceAssembler assembler;

	@GetMapping("/subjects")
	public Resources<Resource<MsgSubject>> all() {

		List<Resource<MsgSubject>> subjects = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());

		return new Resources<>(subjects, linkTo(methodOn(MsgSubjectController.class).all()).withSelfRel());
	}

	@PostMapping("/subjects")
	public ResponseEntity<?> newMsgSubject(@RequestBody MsgSubject newMsgSubject) throws URISyntaxException {

		Resource<MsgSubject> resource = assembler.toResource(repository.save(newMsgSubject));

		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@GetMapping("/subjects/{id}")
	public Resource<MsgSubject> one(@PathVariable Integer id) {

		MsgSubject subject = repository.findById(id).orElseThrow(() -> new MsgSubjectNotFoundException(id));
		return assembler.toResource(subject);
	}

	@DeleteMapping("/subjects/{id}")
	public ResponseEntity<?> deleteMsgSubject(@PathVariable Integer id) {

		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
