package com.affablebean.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.affablebean.model.OrderedProduct;
import com.affablebean.model.OrderedProductPK;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OrderedProductRepository extends JpaRepository<OrderedProduct, OrderedProductPK> {

//	public List<OrderedProduct> findByOrderId(Object id) {
//		
//		return em.createNamedQuery("OrderedProduct.findByCustomerOrderId").
//						setParameter("customerOrderId", id).getResultList();
//	}
}
