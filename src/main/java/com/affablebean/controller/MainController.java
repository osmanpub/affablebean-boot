package com.affablebean.controller;

import java.util.Optional;

import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.affablebean.domain.Category;
import com.affablebean.repository.CategoryRepository;
import com.affablebean.repository.MsgSubjectRepository;

@Controller
public class MainController {

	@Value("${categoryImagePath:img/categories}")
	private String imgPath;

	@Resource
	private CategoryRepository categoryRepository;

	@Resource
	private MsgSubjectRepository msgSubjectRepository;

	@GetMapping({ "/category" })
	public String category(Model model, @RequestParam(name = "id", required = true, defaultValue = "1") String id) {
		getCategoryProducts(model, id);
		model.addAttribute("categories", categoryRepository.findAll());
		return "category";
	}

	@GetMapping({ "/contact" })
	public String contact(Model model) {
		model.addAttribute("subjects", msgSubjectRepository.findAll());
		return "contact";
	}

	@GetMapping({ "/", "/index" })
	public String index(Model model) {
		model.addAttribute("categories", categoryRepository.findAll());
		model.addAttribute("imgPath", imgPath);
		return "index";
	}

	@GetMapping({ "/privacy" })
	public String privacy() {
		return "privacy";
	}

	private void getCategoryProducts(Model model, String categoryId) {
		if (categoryId != null) {
			Optional<Category> selectedCategory = categoryRepository.findById(Short.parseShort(categoryId));

			if (selectedCategory.isPresent()) {
				Category category = selectedCategory.get();
				model.addAttribute("selectedCategory", category);
				model.addAttribute("categoryProducts", category.getProductCollection());
			}
		}
	}
}
