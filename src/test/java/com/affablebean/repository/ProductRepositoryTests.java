package com.affablebean.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.affablebean.domain.Category;
import com.affablebean.domain.Product;

@RunWith(SpringRunner.class)
public class ProductRepositoryTests {
	@MockBean
	private ProductRepository products;

	@Before
	public void setUp() {
		Category category = new Category("Frozen foods");
		Product product = new Product();

		product.setCategory(category);
		product.setDescription("Frozen chicken 2kg");
		product.setName("Frozen chicken");
		product.setPrice(new BigDecimal(5));

		List<Product> productList = new ArrayList<>();
		productList.add(product);

		Mockito.when(products.findByName(product.getName())).thenReturn(productList);
	}

	@Test
	public void testFindByName() {
		String name = "Frozen chicken";
		List<Product> findByName = products.findByName(name);
		assertThat(findByName).extracting(Product::getName).containsOnly(name);
	}

}