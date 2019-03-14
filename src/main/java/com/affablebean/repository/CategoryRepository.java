package com.affablebean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.affablebean.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Short> {

	List<Category> findByName(String name);

}
