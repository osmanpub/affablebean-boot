package com.affablebean.service;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.affablebean.domain.MsgFeedback;
import com.affablebean.domain.MsgSubject;
import com.affablebean.repository.MsgFeedbackRepository;

@Service
public class MsgFeedbackService {

	@Resource
	private MsgFeedbackRepository repository;

	@Transactional
	public void save(Object... msg) {

		MsgFeedback mf = new MsgFeedback();

		mf.setName((String) msg[0]);
		mf.setEmail((String) msg[1]);
		mf.setMsg((String) msg[2]);
		mf.setSubjectId((MsgSubject) msg[3]);

		repository.save(mf);
	}
}
