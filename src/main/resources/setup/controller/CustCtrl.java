/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */
package com.affablebean.controller;

import com.affablebean.cart.ShoppingCart;
import com.affablebean.entity.Category;
import com.affablebean.entity.MsgFeedback;
import com.affablebean.entity.MsgSubject;
import com.affablebean.entity.Product;
import com.affablebean.json.JsonFactory;
import com.affablebean.session.CategoryFacade;
import com.affablebean.session.MsgFeedbackFacade;
import com.affablebean.session.MsgSubjectFacade;
import com.affablebean.session.OrderManager;
import com.affablebean.session.ProductFacade;
import com.affablebean.session.PromotionFacade;
import com.affablebean.validate.Validator;
import java.io.IOException;
import java.io.Writer;
import java.util.Locale;
import java.util.Map;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.*;

/**
 *
 * @author tgiunipero
 */
public final class CustCtrl extends HttpServlet {

	private String surcharge;
	@EJB
	private CategoryFacade categoryFacade;
	@EJB
	private MsgSubjectFacade subjectFacade;
	@EJB
	private MsgFeedbackFacade feedbackFacade;
	@EJB
	private OrderManager orderManager;
	@EJB
	private ProductFacade productFacade;
	@EJB
	private PromotionFacade promoFacade;

	@Override
	public void init(ServletConfig servletConfig) throws ServletException {
		super.init(servletConfig);

		// initialize servlet with configuration information
		surcharge = getServletContext().getInitParameter("deliverySurcharge");

		getServletContext().setAttribute("categories", categoryFacade.findAll());
		getServletContext().setAttribute("subjects", subjectFacade.findSubjects());
		getServletContext().setAttribute("sale", promoFacade.findSale());
		getServletContext().setAttribute("catProms", promoFacade.findCategories());
		getServletContext().setAttribute("prodProms", promoFacade.findProducts());
	}

	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
					throws ServletException, IOException {

//		setSessionData(request); // pick up new static data without restart
		String userPath = request.getServletPath().substring(1);
		// true even if string reads "false"!
		boolean json = (request.getParameter("json") != null);

		// if category page is requested
		switch (userPath) {
			case "category":
				getCategoryProducts(request);

				if (json) {
					JsonFactory.categoryResponse(response.getWriter(), request.getSession(),
									getServletContext());
					return;
				}

				break;

			case "checkout":
				// forward to checkout page and switch to a secure channel
				break;

			case "chooseLanguage":
				userPath = setLanguage(request);
				break;

			case "viewCart":
				checkCart(request);

				if (json) {
					JsonFactory.cartResponse(response.getWriter(), request.getSession(),
									getServletContext());
					return;
				}

				userPath = "cart";
				break;

			default:
//				System.err.println("No request handler found for " + userPath);
		}

		dispatchRequest(userPath, request, response, json);
	}

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
					throws ServletException, IOException {

		// ensures that user input is interpreted as 8-bit Unicode (e.g., for 
		// Czech characters)
		request.setCharacterEncoding("UTF-8");
		String userPath = request.getServletPath().substring(1);
		// true even if string reads "false"!
		boolean json = (request.getParameter("json") != null);

		switch (userPath) {
			case "addToCart":
				addToCart(request);

				if (json) {
					JsonFactory.cartResponse(response.getWriter(), request.getSession(),
									getServletContext());
					return;
				}

				userPath = "category";
				break;

			case "feedback":
				if (json) {
					boolean valid = saveFeedbackJson(request);

					if (valid) {
						JsonFactory.feedbackResponse(response.getWriter(), request);
					}

					return;
				}

				String fb = saveFeedback(request);

				if (!fb.isEmpty()) {
					userPath = fb;
				}
				break;

			case "purchase":
				if (json) {
					boolean valid = purchaseJson(request);

					if (valid) {
						JsonFactory.confResponse(response.getWriter(), request,
										getServletContext(), productFacade);
					}

					return;

				} else {
					boolean valid = purchase(request);

					if (valid) {
						int showJson = Integer.valueOf(
										getServletContext().getInitParameter("showJson"));

						if (showJson != 0) {
							JsonFactory.confResponse(response.getWriter(), request,
											getServletContext(), productFacade);
							return;
						}

						userPath = "confirmation";

					} else {
						userPath = "checkout";
					}
				}

				break;

			case "showJSON":
				showJSON(request, response.getWriter());
				return;

			case "updateCart":
				updateCart(request);

				if (json) {
					JsonFactory.cartResponse(response.getWriter(), request.getSession(),
									getServletContext());
					return;
				}

				userPath = "cart";
				break;

			default:
//				System.err.println("No action handler found for " + userPath);
		}

		dispatchRequest(userPath, request, response, json);
	}

	private void addToCart(HttpServletRequest request)
					throws NumberFormatException {

		HttpSession session = request.getSession();
		ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");

		// if user is adding item to cart for first time create cart object and 
		// attach it to user session
		if (cart == null) {
			cart = new ShoppingCart();
			session.setAttribute("cart", cart);
		}

		// get user input from request		
		String productId = request.getParameter("productId");

		if (!productId.isEmpty()) {
			Product product = productFacade.find(Integer.parseInt(productId));
			cart.addItem(product);
		}
	}

	private void checkCart(HttpServletRequest request) {
		boolean clear = (request.getParameter("clear") != null);

		if (clear) {
			HttpSession session = request.getSession();
			ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
			cart.clear();
		}
	}

	private void dispatchRequest(String userPath, HttpServletRequest request,
					HttpServletResponse response, boolean json)
					throws ServletException, IOException {

		String url;

		switch (userPath) {
			case "contact":
				if (json) {
					JsonFactory.subjectList(response.getWriter(), getServletContext());
					return;
				}

				url = "contact.jsp";
				break;

			case "index":
				if (json) {
					JsonFactory.indexResponse(response.getWriter(), getServletContext());
					return;
				}

				url = "index.jsp";
				break;

			case "privacy":
				url = "privacy.jsp";
				break;

			default:
				url = "/WEB-INF/view/" + userPath + ".jsp";
		}

		request.getRequestDispatcher(url).forward(request, response);
	}

	private void getCategoryProducts(HttpServletRequest request)
					throws NumberFormatException {

		// get categoryId from request
		String categoryId = request.getParameter("id");

		if (categoryId != null) {
			HttpSession session = request.getSession();
			Category selectedCategory
							= categoryFacade.find(Short.parseShort(categoryId));

			// place selected category in session scope
			session.setAttribute("selectedCategory", selectedCategory);

			// get all products for selected category and place them in session scope
			session.setAttribute("categoryProducts",
							selectedCategory.getProductCollection());
		}
	}

	private boolean purchase(HttpServletRequest request) {
		HttpSession session = request.getSession();
		ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");

		if (cart == null) {
			return false;
		}

		// extract user data from request
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String address = request.getParameter("address");
		String cityRegion = "1"; // dont'care
		String ccNumber = request.getParameter("creditcard");

		// validate user data
		boolean valid = Validator.validateCheckOutForm(request, name, email, phone,
						address, cityRegion, ccNumber);

		if (valid) {
			return saveOrder(request, name, email, phone, address, cityRegion,
							ccNumber);
		} else {
			request.setAttribute("validationErrorFlag", true);
			return false;
		}
	}

	private boolean purchaseJson(HttpServletRequest request) throws IOException {
		HttpSession session = request.getSession();
		ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");

		if (cart == null) {
			return false;
		}

		String name, email, phone, address, ccNumber;
		String cityRegion = "1"; // dont'care

		try (JsonReader jsonReader = Json.createReader(request.getInputStream())) {
			JsonObject data = jsonReader.readObject();
			name = data.getJsonString("name").toString();
			email = data.getJsonString("email").toString();
			phone = data.getJsonString("phone").toString();
			address = data.getJsonString("address").toString();
			ccNumber = data.getJsonString("creditcard").toString();
		}

		// validate user data
		boolean valid = Validator.validateCheckOutForm(request, name, email,
						phone, address, cityRegion, ccNumber);

		if (valid) {
			return saveOrder(request, name, email, phone, address, cityRegion, ccNumber);
		}

		return false;
	}

	private String saveFeedback(HttpServletRequest request) {
		String name, email, msg;

		name = request.getParameter("name");
		email = request.getParameter("email");
		msg = request.getParameter("msg");

		boolean valid = Validator.validateContactForm(request, name, email, msg);

		if (valid) {
			MsgSubject subject = null;

			try {
				int subjId = Integer.valueOf(request.getParameter("subject_sel"));
				subject = subjectFacade.find(subjId);
			} catch (NumberFormatException e) {
			}

			int id = feedbackFacade.save(name, email, msg, subject);

			if (id != 0) {
				return "index";
			}

		} else {
			request.setAttribute("validationErrorFlag", true);
		}

		return "contact";
	}

	private boolean saveFeedbackJson(HttpServletRequest request)
					throws IOException {

		try (JsonReader jsonReader = Json.createReader(request.getInputStream())) {
			JsonObject data = jsonReader.readObject();

			String name = data.getJsonString("name").toString();
			String email = data.getJsonString("email").toString();
			String msg = data.getJsonString("msg").toString();

			MsgSubject subject = null;

			try {
				int id = data.getJsonNumber("subject").intValue();
				subject = subjectFacade.find(id);
			} catch (NumberFormatException e) {
			}

			boolean valid = Validator.validateContactForm(request, name, email, msg);

			if (valid) {
				int id = feedbackFacade.save(name, email, msg, subject);
			}

			return valid;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return false;
	}

	private boolean saveOrder(HttpServletRequest request, String... order) {
		HttpSession session = request.getSession();
		ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");

		// see method call for order element types
		int orderId = orderManager.placeOrder(cart, surcharge, order[0], order[1],
						order[2], order[3], order[4], order[5]);

		// if order processed successfully send user to confirmation page
		if (orderId != 0) {
			// in case language was set using toggle, get language choice before 
			// destroying session
			Locale locale = (Locale) session.getAttribute(
							"javax.servlet.jsp.jstl.fmt.locale.session");
			String language = "";

			if (locale != null) {
				language = (String) locale.getLanguage();
			}

			// dissociate shopping cart from session
			cart = null;

			// end session
			session.invalidate();

			// if user changed language using the toggle, reset the language attribute 
			// otherwise language will be switched on confirmation page!			
			if (!language.isEmpty()) {
				request.setAttribute("language", language);
			}

			// get order details
			Map<String, Object> orderMap = orderManager.getOrderDetails(orderId);

			// place order details in request scope
			request.setAttribute("customer", orderMap.get("customer"));
			request.setAttribute("products", orderMap.get("products"));
			request.setAttribute("orderRecord", orderMap.get("orderRecord"));
			request.setAttribute("orderedProducts", orderMap.get("orderedProducts"));

			return true;

			// otherwise, send back to checkout page and display error
		} else {
			request.setAttribute("orderFailureFlag", true);
			return false;
		}
	}

	private void updateCart(HttpServletRequest request) throws
					NumberFormatException {

		// get input from request
		String productId = request.getParameter("productId");
		String quantity = request.getParameter("quantity");

		if (Validator.validateQuantity(productId, quantity)) {
			Product product = productFacade.find(Integer.parseInt(productId));
			HttpSession session = request.getSession();
			ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
			cart.update(product, quantity);
		}
	}

	private String setLanguage(HttpServletRequest request) {
		// get language choice
		String language = request.getParameter("language");
		// place in request scope
		request.setAttribute("language", language);

		HttpSession session = request.getSession();
		String userView = (String) session.getAttribute("view");
		String userPath;

		if ((userView != null) && (!userView.equals("/index"))) {
			// index.jsp exists outside 'view' folder so must be forwarded separately
			userPath = userView;
		} else {
			// if previous view is index or cannot be determined, send user to
			// welcome page
			userPath = "/index";
		}

		return userPath.substring(1);
	}

	private void setSessionData(HttpServletRequest request) {
		HttpSession session = request.getSession();

		// scope ordering rules should pick up updates here
		if (session.getAttribute("categories") == null) {
			session.setAttribute("categories", categoryFacade.findAll());
		}

		if (session.getAttribute("subjects") == null) {
			session.setAttribute("subjects", subjectFacade.findAll());
		}

		if (session.getAttribute("sale") == null) {
			session.setAttribute("sale", promoFacade.findSale());
		}
	}

	private void showJSON(HttpServletRequest request, Writer response) {
		HttpSession session = request.getSession();
		String source = (String) request.getParameter("src").substring(1);
		source = source.substring(source.lastIndexOf('/') + 1, source.lastIndexOf(".jsp"));

		switch (source) {
			case "cart":
				JsonFactory.cartResponse(response, session, getServletContext());
				break;

			case "category":
				JsonFactory.categoryResponse(response, session, getServletContext());
				break;

			case "index":
				JsonFactory.indexResponse(response, getServletContext());
				break;

			default:
		}
	}
}
