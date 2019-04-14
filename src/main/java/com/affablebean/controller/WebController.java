package com.affablebean.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.affablebean.cart.ShoppingCart;
import com.affablebean.domain.Category;
import com.affablebean.domain.MsgFeedback;
import com.affablebean.domain.MsgSubject;
import com.affablebean.domain.Product;
import com.affablebean.form.CheckoutForm;
import com.affablebean.form.ContactForm;
import com.affablebean.repository.CategoryRepository;
import com.affablebean.repository.MsgFeedbackRepository;
import com.affablebean.repository.MsgSubjectRepository;
import com.affablebean.repository.ProductRepository;
import com.affablebean.service.OrderManager;

@Controller
@SessionAttributes({ "cart", "orderMap" })
public class WebController implements WebMvcConfigurer {

	@Value("${deliverySurcharge:1.00}")
	private String deliverySurcharge;

	@Value("${categoryImagePath:img/categories}")
	private String imgPath;

	@Value("${productImagePath:img/products}")
	private String prodPath;

	@Resource
	private CategoryRepository categoryRepository;

	@Resource
	private MsgFeedbackRepository msgFeedbackRepository;

	@Resource
	private MsgSubjectRepository msgSubjectRepository;

	@Resource
	private ProductRepository productRepository;

	@Resource
	private OrderManager orderManager;

	@PostMapping({ "/addToCart" })
	public String addToCart(@ModelAttribute("cart") ShoppingCart cart,
			@RequestParam(name = "id", required = true) Integer id,
			@RequestParam(name = "catId", required = true) Short categoryId) {

		addToShoppingCart(cart, id);
		return "redirect:/category?id=" + categoryId;
	}

	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@PostMapping({ "/addToCart2" })
	@ResponseBody
	public ShoppingCart addToCart2(@RequestParam(name = "id", required = true) Integer id) {
		ShoppingCart cart = new ShoppingCart();
		addToShoppingCart(cart, id);
		return cart;
	}

	@GetMapping({ "/cart" })
	public String cart() {
		return "cart";
	}

	@GetMapping({ "/category" })
	public String category(Model model, @RequestParam(name = "id", required = true, defaultValue = "1") Short id) {
		model.addAttribute("categories", categoryRepository.findAllOrderByName(Sort.by("name")));
		getCategoryProducts(model, id);
		return "category";
	}

	@GetMapping({ "/checkout" })
	public String checkout(CheckoutForm checkoutForm, Model model) {
		return "checkout";
	}

	@GetMapping({ "/confirmation" })
	public String confirmation(@ModelAttribute("orderMap") Map<String, Object> orderMap, Model model) {
		model.addAttribute("customer", orderMap.get("customer"));
		model.addAttribute("products", orderMap.get("products"));
		model.addAttribute("orderRecord", orderMap.get("orderRecord"));
		model.addAttribute("orderedProducts", orderMap.get("orderedProducts"));

		return "confirmation";
	}

	@GetMapping({ "/contact" })
	public String contact(ContactForm contactForm, Model model) {
		model.addAttribute("subjects", msgSubjectRepository.findAllOrderByName(Sort.by("name")));
		return "contact";
	}

	@PostMapping({ "/feedback" })
	public String feedback(@Valid ContactForm contactForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return "contact";
		}

		return saveFeedback(contactForm);
	}

	@GetMapping({ "/", "/index" })
	public String index(Model model) {
		model.addAttribute("categories", categoryRepository.findAllOrderByName(Sort.by("name")));
		return "index";
	}

	@GetMapping({ "/privacy" })
	public String privacy() {
		return "privacy";
	}

	@PostMapping({ "/purchase" })
	public String purchase(@ModelAttribute("cart") ShoppingCart cart,
			@ModelAttribute("orderMap") Map<String, Object> orderMap, Model model, @Valid CheckoutForm checkoutForm,
			BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return "checkout";
		}

		int orderId = orderManager.placeOrder(cart, deliverySurcharge, checkoutForm);

		if (orderId == 0) {
			return "checkout";
		}

		cart.clear();
		orderMap.clear();

		Map<String, Object> om = orderManager.getOrderDetails(orderId);

		orderMap.put("orderRecord", om.get("orderRecord"));
		orderMap.put("customer", om.get("customer"));
		orderMap.put("orderedProducts", om.get("orderedProducts"));
		orderMap.put("products", om.get("products"));

		return "redirect:/confirmation";
	}

	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@PostMapping({ "/purchase2" })
	@ResponseBody
	public Map<String, Object> purchase(@RequestBody ShoppingCart cart, @RequestBody CheckoutForm checkoutForm) {
		int orderId = orderManager.placeOrder(cart, deliverySurcharge, checkoutForm);

		if (orderId == 0) {
			return null;
		}

		return orderManager.getOrderDetails(orderId);
	}

	@PostMapping({ "/updateCart" })
	public String updateCart(@ModelAttribute("cart") ShoppingCart cart,
			@RequestParam(name = "id", required = true) Integer id,
			@RequestParam(name = "qty", required = true) Short qty) {

		updateShoppingCart(cart, id, qty);
		return "redirect:/cart";
	}

	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@PostMapping({ "/updateCart2" })
	@ResponseBody
	public ShoppingCart updateCart2(@RequestParam(name = "id", required = true) Integer id,
			@RequestParam(name = "qty", required = true) Short qty) {

		return updateShoppingCart(id, qty);
	}

	@GetMapping({ "/viewCart" })
	public String viewCart(@ModelAttribute("cart") ShoppingCart cart, Model model,
			@RequestParam(name = "clear", required = true) Boolean clear) {

		checkCart(cart, clear);
		return "cart";
	}

	@ModelAttribute
	public void addAttributes(Model model) {
		model.addAttribute("imgPath", imgPath);
		model.addAttribute("prodPath", prodPath);
		model.addAttribute("deliverySurcharge", deliverySurcharge);
	}

	@ModelAttribute("cart")
	public ShoppingCart getCart() {
		return new ShoppingCart();
	}

	@ModelAttribute("orderMap")
	public Map<String, Object> getOrderMap() {
		return new HashMap<String, Object>();
	}

	private void addToShoppingCart(ShoppingCart cart, Integer productId) {
		if (productId != null) {
			Optional<Product> product = productRepository.findById(productId);

			if (product.isPresent()) {
				cart.addItem(product.get());
			}
		}
	}

	private void checkCart(ShoppingCart cart, Boolean clear) {
		if (clear != null && clear) {
			cart.clear();
		}
	}

	private void getCategoryProducts(Model model, Short categoryId) {
		if (categoryId != null) {
			Optional<Category> selectedCategory = categoryRepository.findById(categoryId);

			if (selectedCategory.isPresent()) {
				Category category = selectedCategory.get();
				model.addAttribute("selectedCategory", category);
				model.addAttribute("categoryProducts", category.getProductCollection());
			}
		}
	}

	private String saveFeedback(ContactForm contactForm) {
		MsgFeedback feedback = new MsgFeedback(contactForm.getName(), contactForm.getEmail(), contactForm.getMsg());
		Optional<MsgSubject> subject = msgSubjectRepository.findById(contactForm.getSubjectId());

		if (subject.isPresent()) {
			feedback.setSubject(subject.get());
			MsgFeedback msgFeedback = msgFeedbackRepository.save(feedback);
			return (msgFeedback == null) ? "contact" : "redirect:/index";

		} else {
			return "contact";
		}
	}

	private void updateShoppingCart(ShoppingCart cart, Integer productId, Short quantity) {
		if (quantity == null) {
			return;
		}

		Optional<Product> product = productRepository.findById(productId);

		if (product.isPresent()) {
			cart.update(product.get(), quantity);
		}
	}

	private ShoppingCart updateShoppingCart(Integer productId, Short quantity) {
		ShoppingCart cart = new ShoppingCart();

		if (quantity == null) {
			return cart;
		}

		Optional<Product> optProduct = productRepository.findById(productId);

		if (optProduct.isPresent()) {
			Product product = optProduct.get();
			cart.addItem(product);
			cart.update(product, quantity);
		}

		return cart;
	}
}
