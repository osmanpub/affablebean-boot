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

import com.affablebean.domain.Category;

@RunWith(SpringRunner.class)
public class CategoryRepositoryTests {
	@MockBean
	private CategoryRepository categories;

	@Before
	public void setUp() {
		Category category = new Category("Frozen foods");
		List<Category> categoryList = new ArrayList<>();
		categoryList.add(category);

		Mockito.when(categories.findByName(category.getName())).thenReturn(categoryList);
	}

	@Test
	public void testFindByName() {
		String name = "Frozen foods";
		List<Category> findByName = categories.findByName(name);
		assertThat(findByName).extracting(Category::getName).containsOnly(name);
	}

}