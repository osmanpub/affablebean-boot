package com.affablebean.repository;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.affablebean.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Short> {

	List<Category> findByName(String name);

	@Cacheable("categories")
	@Query("SELECT c FROM Category c")
	List<Category> findAllOrderByName(Sort sort);

}
