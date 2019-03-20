package com.affablebean.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import com.affablebean.controller.MsgFeedbackController;
import com.affablebean.domain.MsgFeedback;

@Component
public class MsgFeedbackResourceAssembler implements ResourceAssembler<MsgFeedback, Resource<MsgFeedback>> {

	@Override
	public Resource<MsgFeedback> toResource(MsgFeedback msgFeedback) {
		return new Resource<>(msgFeedback,
				linkTo(methodOn(MsgFeedbackController.class).one(msgFeedback.getId())).withSelfRel(),
				linkTo(methodOn(MsgFeedbackController.class).all()).withRel("feedbacks"));
	}
}
