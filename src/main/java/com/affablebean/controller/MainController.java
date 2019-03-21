package com.affablebean.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.affablebean.repository.CategoryRepository;

@Controller
public class MainController {

	@Resource
	private CategoryRepository categoryRepository;
	
	@GetMapping({ "/contact" })
	public String contact() {
		return "contact";
	}

	@GetMapping({ "/", "/index" })
    public String index(Model model) {
        model.addAttribute("categories", categoryRepository.findAll());
		return "index";
	}

	@GetMapping({ "/privacy" })
	public String privacy() {
		return "privacy";
	}
}
