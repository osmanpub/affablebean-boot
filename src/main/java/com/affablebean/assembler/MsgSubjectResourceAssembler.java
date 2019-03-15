package com.affablebean.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import com.affablebean.controller.MsgSubjectController;
import com.affablebean.model.MsgSubject;

@Component
public class MsgSubjectResourceAssembler implements ResourceAssembler<MsgSubject, Resource<MsgSubject>> {

	@Override
	public Resource<MsgSubject> toResource(MsgSubject msgSubject) {
		return new Resource<>(msgSubject, linkTo(methodOn(MsgSubjectController.class).one(msgSubject.getId())).withSelfRel(),
				linkTo(methodOn(MsgSubjectController.class).all()).withRel("subjects"));
	}
}
