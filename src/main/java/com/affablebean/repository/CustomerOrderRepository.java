package com.affablebean.repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.affablebean.model.CustomerOrder;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer> {

	List<CustomerOrder> findByCustomer(String customer);

	List<CustomerOrder> findByAmount(BigDecimal amount);

	List<CustomerOrder> findByDateCreated(Date date);

	List<CustomerOrder> findByConfirmationNumber(Integer confirmationNumber);

}
