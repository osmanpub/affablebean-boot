package com.affablebean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.affablebean.model.MsgSubject;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface MsgSubjectRepository extends JpaRepository<MsgSubject, Integer> {

	List<MsgSubject> findByName(String name);

}
