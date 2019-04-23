package com.affablebean.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.affablebean.domain.Customer;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class CustomerRepositoryJpaTests {
	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private CustomerRepository customers;

	@Test
	public void testFindByName() {
		Customer customer = new Customer("John Doe", "johndoe@gmail.com", "111-222-333", "Nowhere St, Planet Mars",
				"NS", "1111222233334444");
		entityManager.persist(customer);

		String name = customer.getName();
		List<Customer> findByName = customers.findByName(name);

		assertThat(findByName).extracting(Customer::getName).containsOnly(name);
	}

}