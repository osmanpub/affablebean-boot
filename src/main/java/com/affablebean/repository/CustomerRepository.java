package com.affablebean.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.affablebean.domain.Customer;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	List<Customer> findByName(String name);

	List<Customer> findByEmail(String email);

	List<Customer> findByPhone(String phone);

	List<Customer> findByAddress(String address);

	List<Customer> findByCityRegion(String cityRegion);

	List<Customer> findByCcNumber(String ccNumber);

	@Query("SELECT c FROM Customer c")
	List<Customer> findAllOrderByName(Sort sort);

}
