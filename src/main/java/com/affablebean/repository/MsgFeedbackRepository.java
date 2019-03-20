package com.affablebean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.affablebean.domain.MsgFeedback;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface MsgFeedbackRepository extends JpaRepository<MsgFeedback, Integer> {

	List<MsgFeedback> findByName(String name);

	List<MsgFeedback> findByEmail(String email);

	List<MsgFeedback> findByMsg(String msg);
}
