package com.affablebean.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	@GetMapping({ "/contact" })
	public String contact() {
		return "contact";
	}

	@GetMapping({ "/", "/index" })
	public String index() {
		return "index";
	}

	@GetMapping({ "/privacy" })
	public String privacy() {
		return "privacy";
	}
}
