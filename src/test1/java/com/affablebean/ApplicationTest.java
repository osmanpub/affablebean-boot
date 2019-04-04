package com.affablebean;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.affablebean.controller.WebController;
import com.affablebean.repository.CustomerRepository;

@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace=Replace.NONE)
@WebMvcTest(controllers = WebController.class)
public class ApplicationTest {

	@Resource
	private CustomerRepository customerRepository;
	
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void homePage() throws Exception {
        // N.B. jsoup can be useful for asserting HTML content
        mockMvc.perform(get("/index.html"))
                .andExpect(content().string(containsString("Get your greeting")));
    }

//    @Test
//    public void greeting() throws Exception {
//        mockMvc.perform(get("/greeting"))
//                .andExpect(content().string(containsString("Hello, World!")));
//    }
//
//    @Test
//    public void greetingWithUser() throws Exception {
//        mockMvc.perform(get("/greeting").param("name", "Greg"))
//                .andExpect(content().string(containsString("Hello, Greg!")));
//    }

}
