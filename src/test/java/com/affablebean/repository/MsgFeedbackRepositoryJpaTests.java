package com.affablebean.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.affablebean.domain.MsgFeedback;
import com.affablebean.domain.MsgSubject;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class MsgFeedbackRepositoryJpaTests {
	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private MsgFeedbackRepository feedbacks;

	@Test
	public void testFindByName() {
		MsgSubject subject = new MsgSubject();
		subject.setName("Website");
		entityManager.persist(subject);

		MsgFeedback feedback = new MsgFeedback("joe bloggs", "joe.bloggs@gmail.com", "you suck!");
		feedback.setSubject(subject);
		entityManager.persist(feedback);

		String name = feedback.getName();
		List<MsgFeedback> findByName = feedbacks.findByName(name);

		assertThat(findByName).extracting(MsgFeedback::getName).containsOnly(name);
	}

}