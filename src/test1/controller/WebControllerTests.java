package com.affablebean.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.affablebean.domain.Category;
import com.affablebean.repository.CategoryRepository;
import com.affablebean.repository.CustomerOrderRepository;
import com.affablebean.repository.CustomerRepository;
import com.affablebean.repository.MsgFeedbackRepository;
import com.affablebean.repository.MsgSubjectRepository;
import com.affablebean.repository.ProductRepository;
import com.affablebean.service.OrderManager;

@RunWith(SpringRunner.class)
@WebMvcTest(WebController.class)
public class WebControllerTests {
 
    @Autowired
    private MockMvc mvc;

	@MockBean
	private CategoryRepository categories;
    
	@MockBean
	private CustomerRepository customers;

	@MockBean
	private CustomerOrderRepository customerOrders;

	@MockBean
	private MsgFeedbackRepository msgFeedbackRepository;

	@MockBean
	private MsgSubjectRepository msgSubjectRepository;
	
	@MockBean
	private ProductRepository productRepository;

	@MockBean
	private OrderManager orderManager;
	
	@Test
    public void givenCategories_whenGetCategories_thenReturnJsonArray()
      throws Exception {
         
    	Category dairy = new Category("dairy");     
        List<Category> allCategories = Arrays.asList(dairy);
     
//        given(service.getAllCategories()).willReturn(allCategories);
     
        mvc.perform(get("/api/categories")
          .contentType(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk());
//          .andExpect(jsonPath("$", hasSize(1)))
//          .andExpect(jsonPath("$[0].name", is(alex.getName())));
    }
    
}