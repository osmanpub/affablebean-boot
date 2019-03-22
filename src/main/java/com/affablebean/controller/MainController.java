package com.affablebean.controller;

import java.util.Optional;

import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.affablebean.cart.ShoppingCart;
import com.affablebean.domain.Category;
import com.affablebean.domain.Product;
import com.affablebean.repository.CategoryRepository;
import com.affablebean.repository.MsgSubjectRepository;
import com.affablebean.repository.ProductRepository;
import com.affablebean.repository.PromotionRepository;

@Controller
@SessionAttributes("cart")
public class MainController {

	@Value("${categoryImagePath:img/categories}")
	private String imgPath;

	@Value("${productImagePath:img/products}")
	private String prodPath;

	@Resource
	private CategoryRepository categoryRepository;

	@Resource
	private MsgSubjectRepository msgSubjectRepository;

	@Resource
	private ProductRepository productRepository;

	@Resource
	private PromotionRepository promotionRepository;

	@PostMapping({ "/addToCart" })
	public String addToCart(Model model, @ModelAttribute("cart") ShoppingCart cart,
			@RequestParam(name = "productId", required = true) String id) {
		addToShoppingCart(model, cart, id);
		return "category";
	}

	@GetMapping({ "/category" })
	public String category(Model model, @RequestParam(name = "id", required = true, defaultValue = "1") String id) {
		model.addAttribute("categories", categoryRepository.findAll());
		model.addAttribute("catProms", promotionRepository.findCategories());
		model.addAttribute("prodPath", prodPath);
		model.addAttribute("prodProms", promotionRepository.findProducts());
		model.addAttribute("sale", promotionRepository.findSale(true));

		getCategoryProducts(model, id);
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

	@ModelAttribute("cart")
	public ShoppingCart getCart() {
		return new ShoppingCart();
	}

	private void addToShoppingCart(Model model, ShoppingCart cart, String productId) {

		if (!productId.isEmpty()) {
			Optional<Product> product = productRepository.findById(Integer.parseInt(productId));

			if (product.isPresent()) {
				cart.addItem(product.get());
			}
		}
	}

//	private void checkCart(HttpServletRequest request) {
//		boolean clear = (request.getParameter("clear") != null);
//
//		if (clear) {
//			HttpSession session = request.getSession();
//			ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
//			cart.clear();
//		}
//	}

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

//	private boolean purchase(HttpServletRequest request) {
//		HttpSession session = request.getSession();
//		ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
//
//		if (cart == null) {
//			return false;
//		}
//
//		// extract user data from request
//		String name = request.getParameter("name");
//		String email = request.getParameter("email");
//		String phone = request.getParameter("phone");
//		String address = request.getParameter("address");
//		String cityRegion = "1"; // dont'care
//		String ccNumber = request.getParameter("creditcard");
//
//		// validate user data
//		boolean valid = Validator.validateCheckOutForm(request, name, email, phone,
//						address, cityRegion, ccNumber);
//
//		if (valid) {
//			return saveOrder(request, name, email, phone, address, cityRegion,
//							ccNumber);
//		} else {
//			request.setAttribute("validationErrorFlag", true);
//			return false;
//		}
//	}

//	private String saveFeedback(HttpServletRequest request) {
//		String name, email, msg;
//
//		name = request.getParameter("name");
//		email = request.getParameter("email");
//		msg = request.getParameter("msg");
//
//		boolean valid = Validator.validateContactForm(request, name, email, msg);
//
//		if (valid) {
//			MsgSubject subject = null;
//
//			try {
//				int subjId = Integer.valueOf(request.getParameter("subject_sel"));
//				subject = subjectFacade.find(subjId);
//			} catch (NumberFormatException e) {
//			}
//
//			int id = feedbackFacade.save(name, email, msg, subject);
//
//			if (id != 0) {
//				return "index";
//			}
//
//		} else {
//			request.setAttribute("validationErrorFlag", true);
//		}
//
//		return "contact";
//	}

//	private boolean saveOrder(HttpServletRequest request, String... order) {
//		HttpSession session = request.getSession();
//		ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
//
//		// see method call for order element types
//		int orderId = orderManager.placeOrder(cart, surcharge, order[0], order[1],
//						order[2], order[3], order[4], order[5]);
//
//		// if order processed successfully send user to confirmation page
//		if (orderId != 0) {
//			// in case language was set using toggle, get language choice before 
//			// destroying session
//			Locale locale = (Locale) session.getAttribute(
//							"javax.servlet.jsp.jstl.fmt.locale.session");
//			String language = "";
//
//			if (locale != null) {
//				language = (String) locale.getLanguage();
//			}
//
//			// dissociate shopping cart from session
//			cart = null;
//
//			// end session
//			session.invalidate();
//
//			// if user changed language using the toggle, reset the language attribute 
//			// otherwise language will be switched on confirmation page!			
//			if (!language.isEmpty()) {
//				request.setAttribute("language", language);
//			}
//
//			// get order details
//			Map<String, Object> orderMap = orderManager.getOrderDetails(orderId);
//
//			// place order details in request scope
//			request.setAttribute("customer", orderMap.get("customer"));
//			request.setAttribute("products", orderMap.get("products"));
//			request.setAttribute("orderRecord", orderMap.get("orderRecord"));
//			request.setAttribute("orderedProducts", orderMap.get("orderedProducts"));
//
//			return true;
//
//			// otherwise, send back to checkout page and display error
//		} else {
//			request.setAttribute("orderFailureFlag", true);
//			return false;
//		}
//	}

//	private void updateCart(HttpServletRequest request) throws
//					NumberFormatException {
//
//		// get input from request
//		String productId = request.getParameter("productId");
//		String quantity = request.getParameter("quantity");
//
//		if (Validator.validateQuantity(productId, quantity)) {
//			Product product = productFacade.find(Integer.parseInt(productId));
//			HttpSession session = request.getSession();
//			ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
//			cart.update(product, quantity);
//		}
//	}

//	private String setLanguage(HttpServletRequest request) {
//		// get language choice
//		String language = request.getParameter("language");
//		// place in request scope
//		request.setAttribute("language", language);
//
//		HttpSession session = request.getSession();
//		String userView = (String) session.getAttribute("view");
//		String userPath;
//
//		if ((userView != null) && (!userView.equals("/index"))) {
//			// index.jsp exists outside 'view' folder so must be forwarded separately
//			userPath = userView;
//		} else {
//			// if previous view is index or cannot be determined, send user to
//			// welcome page
//			userPath = "/index";
//		}
//
//		return userPath.substring(1);
//	}

//	private void setSessionData(HttpServletRequest request) {
//		HttpSession session = request.getSession();
//
//		// scope ordering rules should pick up updates here
//		if (session.getAttribute("categories") == null) {
//			session.setAttribute("categories", categoryFacade.findAll());
//		}
//
//		if (session.getAttribute("subjects") == null) {
//			session.setAttribute("subjects", subjectFacade.findAll());
//		}
//
//		if (session.getAttribute("sale") == null) {
//			session.setAttribute("sale", promoFacade.findSale());
//		}
//	}

}
