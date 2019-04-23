package com.affablebean.repository;

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
import org.springframework.test.context.junit4.SpringRunner;

import com.affablebean.domain.Category;
import com.affablebean.domain.Product;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ProductRepositoryJpaTests {
	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private ProductRepository products;

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

		String name = product.getName();
		List<Product> findByName = products.findByName(name);

		assertThat(findByName).extracting(Product::getName).containsOnly(name);
	}

}