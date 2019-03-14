package com.affablebean.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.affablebean.model.Promotion;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {

	List<Promotion> findByName(String name);

	List<Promotion> findByDiscount(Integer discount);

	List<Promotion> findBySale(Boolean sale);

	List<Promotion> findByCategoryId(Integer categoryId);

	List<Promotion> findByProductId(Integer productId);

	List<Promotion> findByQty(Integer qty);

	List<Promotion> findBySold(BigDecimal sold);

	List<Promotion> findByDescription(String description);
}
