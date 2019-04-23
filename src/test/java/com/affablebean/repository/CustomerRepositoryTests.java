package com.affablebean.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.affablebean.domain.Customer;

@RunWith(SpringRunner.class)
public class CustomerRepositoryTests {
	@MockBean
	private CustomerRepository customers;

	@Before
	public void setUp() {
		Customer customer = new Customer("John Doe", "johndoe@gmail.com", "111-222-333", "Nowhere St, Planet Mars",
				"NS", "1111222233334444");

		List<Customer> customerList = new ArrayList<>();
		customerList.add(customer);

		Mockito.when(customers.findByName(customer.getName())).thenReturn(customerList);
	}

	@Test
	public void testFindByName() {
		String name = "John Doe";
		List<Customer> findByName = customers.findByName(name);
		assertThat(findByName).extracting(Customer::getName).containsOnly(name);
	}

}