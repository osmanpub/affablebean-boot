package com.affablebean.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.affablebean.domain.MsgSubject;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface MsgSubjectRepository extends JpaRepository<MsgSubject, Integer> {

	List<MsgSubject> findByName(String name);

	@Query("SELECT s FROM MsgSubject s")
	List<MsgSubject> findAllOrderByName(Sort sort);

}
