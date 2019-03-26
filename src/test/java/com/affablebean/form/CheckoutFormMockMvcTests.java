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
package com.affablebean.form;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.servlet.FlashMap;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CheckoutFormMockMvcTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void checkPersonInfoWhenNameMissingNameThenFailure() throws Exception {
		MockHttpServletRequestBuilder createPerson = post("/").param("age", "20");

		mockMvc.perform(createPerson).andExpect(model().hasErrors());
	}

	@Test
	public void checkPersonInfoWhenNameTooShortThenFailure() throws Exception {
		MockHttpServletRequestBuilder createPerson = post("/").param("name", "R").param("age", "20");

		mockMvc.perform(createPerson).andExpect(model().hasErrors());
	}

	@Test
	public void checkPersonInfoWhenAgeMissingThenFailure() throws Exception {
		MockHttpServletRequestBuilder createPerson = post("/").param("name", "Rob");

		mockMvc.perform(createPerson).andExpect(model().hasErrors());
	}

	@Test
	public void checkPersonInfoWhenAgeTooYoungThenFailure() throws Exception {
		MockHttpServletRequestBuilder createPerson = post("/").param("age", "1").param("name", "Rob");

		mockMvc.perform(createPerson).andExpect(model().hasErrors());
	}

	@Test
	public void checkPersonInfoWhenValidRequestThenSuccess() throws Exception {
		MockHttpServletRequestBuilder createPerson = post("/").param("name", "Rob").param("age", "20");

		mockMvc.perform(createPerson).andExpect(model().hasNoErrors());
	}

	@Test
	public void whenTodoExists_thenSubsequentFormRequestContainsesMostRecentTodo() throws Exception {
		FlashMap flashMap = mockMvc.perform(post("/sessionattributes/form").param("description", "newtodo"))
				.andExpect(status().is3xxRedirection()).andReturn().getFlashMap();

		MvcResult result = mockMvc.perform(get("/sessionattributes/form").sessionAttrs(flashMap))
				.andExpect(status().isOk()).andExpect(model().attributeExists("todo")).andReturn();
//		TodoItem item = (TodoItem) result.getModelAndView().getModel().get("todo");

//		assertEquals("newtodo", item.getDescription());
	}
}