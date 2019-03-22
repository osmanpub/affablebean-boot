package com.affablebean.controller;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.affablebean.repository.CategoryRepository;

@Controller
public class MainController {

  @Value("${categoryImagePath:img/categories}")
  private String imgPath;

	@Resource
	private CategoryRepository categoryRepository;
	
	@GetMapping({ "/contact" })
	public String contact() {
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
}


//@Service("fileService")
//public class FileServiceImpl implements FileService {
//
//  @Value("${sourceLocation:c:/temp/input}")
//  private String source;
//
//  @Value("${destinationLocation:c:/temp/output}")
//  private String destination;
//
//  @Autowired
//  private Environment environment;
//
//  public void readValues() {
//      System.out.println("Getting property via Spring Environment :"
//              + environment.getProperty("jdbc.driverClassName"));
//
//      System.out.println("Source Location : " + source);
//      System.out.println("Destination Location : " + destination);
//       
//  }
//
//}