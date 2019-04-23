/*
 * Copyright 2002-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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