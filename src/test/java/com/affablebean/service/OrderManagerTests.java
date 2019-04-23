package com.affablebean.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import com.affablebean.cart.ShoppingCart;
import com.affablebean.domain.Category;
import com.affablebean.domain.Customer;
import com.affablebean.domain.CustomerOrder;
import com.affablebean.domain.Product;
import com.affablebean.form.CheckoutForm;
import com.affablebean.repository.CustomerOrderRepository;
import com.affablebean.repository.CustomerRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class OrderManagerTests {
	@Autowired
	private TestEntityManager entityManager;

	@TestConfiguration
	static class OrderManagerTestContextConfiguration {

		@Bean
		public OrderManager orderManager() {
			return new OrderManager();
		}
	}

	@Autowired
	private OrderManager orderManager;

	@Autowired
	private CustomerRepository customers;

	@Autowired
	private CustomerOrderRepository customerOrders;

	@Test
	public void testFindByName() {
		Category category = new Category("Frozen foods");
		entityManager.persist(category);

		Product product = new Product();

		product.setCategory(category);
		product.setDescription("Frozen chicken 2kg");
		product.setName("Frozen chicken");
		product.setPrice(new BigDecimal(5));

		entityManager.persist(product);
		ShoppingCart sc = new ShoppingCart();

		sc.addItem(product);
		sc.update(product, Short.valueOf("2"));

		CheckoutForm form = new CheckoutForm();

		form.setAddress("123 nowhere st");
		form.setCityRegion("NY");
		form.setCreditCard("1111111122222222");
		form.setEmail("joe.bloggs@gmail.com");
		form.setName("joe bloggs");
		form.setPhone("12345678");

		orderManager.placeOrder(sc, "1.50", form);
		String name = "joe bloggs";

		List<Customer> customerList = customers.findByName(name);
		assertThat(customerList).extracting(Customer::getName).containsOnly(name);

		Customer customer = customerList.get(0);
		List<CustomerOrder> customerOrdersList = customerOrders.findByCustomer(customer);

		// 2 chickens (2 x 5 = 10) + 1.50 surcharge = 11.50
		assertThat(customerOrdersList).extracting(CustomerOrder::getAmount).containsExactly(new BigDecimal(11.5));

	}

}