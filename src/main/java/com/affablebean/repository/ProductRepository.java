package com.affablebean.repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.affablebean.domain.Product;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ProductRepository extends JpaRepository<Product, Integer> {

	List<Product> findByName(String name);

	List<Product> findByPrice(BigDecimal price);

	List<Product> findByLastUpdate(Date date);

}
