package com.affablebean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.affablebean.domain.OrderedProduct;
import com.affablebean.domain.OrderedProductPK;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OrderedProductRepository extends JpaRepository<OrderedProduct, OrderedProductPK> {

	@Query("SELECT op FROM OrderedProduct op WHERE op.orderedProductPK.customerOrderId = :id")
	List<OrderedProduct> findByOrderId(@Param("id") Integer id);

}
