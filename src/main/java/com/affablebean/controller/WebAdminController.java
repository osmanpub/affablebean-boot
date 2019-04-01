package com.affablebean.controller;

import java.util.Map;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.affablebean.domain.Customer;
import com.affablebean.domain.MsgFeedback;
import com.affablebean.repository.CustomerOrderRepository;
import com.affablebean.repository.CustomerRepository;
import com.affablebean.repository.MsgFeedbackRepository;
import com.affablebean.service.OrderManager;

@Controller
public class WebAdminController implements WebMvcConfigurer {

	@Value("${deliverySurcharge:1.00}")
	private String deliverySurcharge;

	@Resource
	private CustomerRepository customerRepository;

	@Resource
	private CustomerOrderRepository customerOrderRepository;

	@Resource
	private MsgFeedbackRepository msgFeedbackRepository;

	@Resource
	private OrderManager orderManager;

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/admin").setViewName("admin");
		registry.addViewController("/login").setViewName("login");
	}

	@GetMapping({ "/customerRecord" })
	public String customerRecord(Model model, @RequestParam(name = "id", required = true) Integer customerId) {
		Optional<Customer> optionalCustomer = customerRepository.findById(customerId);

		if (optionalCustomer.isPresent()) {
			Customer customer = optionalCustomer.get();
			model.addAttribute("customerRecord", customer);
			model.addAttribute("orders", customerOrderRepository.findByCustomer(customer));
		}

		return "admin";
	}

	@GetMapping({ "/feedbackRecord" })
	public String feedbackRecord(Model model, @RequestParam(name = "id", required = true) Integer msgFeedbackId) {
		Optional<MsgFeedback> msgFeedback = msgFeedbackRepository.findById(msgFeedbackId);

		if (msgFeedback.isPresent()) {
			model.addAttribute("feedbackRecord", msgFeedback.get());
		}

		return "admin";
	}

	@GetMapping({ "/orderRecord" })
	public String orderRecord(Model model, @RequestParam(name = "id", required = true) Integer orderId) {
		Map<String, Object> orderMap = orderManager.getOrderDetails(orderId);

		model.addAttribute("customer", orderMap.get("customer"));
		model.addAttribute("products", orderMap.get("products"));
		model.addAttribute("orderRecord", orderMap.get("orderRecord"));
		model.addAttribute("orderedProducts", orderMap.get("orderedProducts"));

		return "admin";
	}

	@GetMapping({ "/viewCustomers" })
	public String viewCustomers(Model model) {
		model.addAttribute("customerList", customerRepository.findAllOrderByName(Sort.by("name")));
		return "admin";
	}

	@GetMapping({ "/viewFeedback" })
	public String viewFeedback(Model model) {
		model.addAttribute("feedbackList", msgFeedbackRepository.findAll());
		return "admin";
	}

	@GetMapping({ "/viewOrders" })
	public String viewOrders(Model model) {
		model.addAttribute("orderList", customerOrderRepository.findAll());
		return "admin";
	}

	@ModelAttribute
	public void addAttributes(Model model) {
		model.addAttribute("deliverySurcharge", deliverySurcharge);
	}

}