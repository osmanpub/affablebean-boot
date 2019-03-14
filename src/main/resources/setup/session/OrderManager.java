/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */
package com.affablebean.session;

import com.affablebean.cart.ShoppingCart;
import com.affablebean.cart.ShoppingCartItem;
import com.affablebean.entity.Customer;
import com.affablebean.entity.CustomerOrder;
import com.affablebean.entity.OrderedProduct;
import com.affablebean.entity.OrderedProductPK;
import com.affablebean.entity.Product;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author tgiunipero
 */
@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class OrderManager {

	@PersistenceContext(unitName = "AffableBeanPU")
	private EntityManager em;
	@Resource
	private SessionContext context;
	@EJB
	private ProductFacade productFacade;
	@EJB
	private CustomerOrderFacade customerOrderFacade;
	@EJB
	private OrderedProductFacade orderedProductFacade;

	private static final Random random = new Random();

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public int placeOrder(ShoppingCart cart, String surcharge, String... order) {

		try {
			Customer customer = addCustomer(order);
			CustomerOrder co = addOrder(customer, cart, surcharge);
			addOrderedItems(co, cart);
			return co.getId();

		} catch (Exception e) {
			context.setRollbackOnly();
			return 0;
		}
	}

	public Map<String, Object> getOrderDetails(int orderId) {
		// get order
		CustomerOrder order = customerOrderFacade.find(orderId);

		// get customer
		Customer customer = order.getCustomer();

		// get all ordered products
		List<OrderedProduct> orderedProducts
						= orderedProductFacade.findByOrderId(orderId);

		// get product details for ordered items
		List<Product> products = new ArrayList<>();

		for (OrderedProduct op : orderedProducts) {

			Product p = (Product) productFacade.find(op.getOrderedProductPK().getProductId());
			products.add(p);
		}

		// add each item to orderMap
		Map<String, Object> orderMap = new HashMap<>();

		orderMap.put("orderRecord", order);
		orderMap.put("customer", customer);
		orderMap.put("orderedProducts", orderedProducts);
		orderMap.put("products", products);

		return orderMap;
	}

	private Customer addCustomer(String... cust) {

		Customer customer = new Customer();
		customer.setName(cust[0]);
		customer.setEmail(cust[1]);
		customer.setPhone(cust[2]);
		customer.setAddress(cust[3]);
		customer.setCityRegion(cust[4]);
		customer.setCcNumber(cust[5]);

		em.persist(customer);
		return customer;
	}

	private CustomerOrder addOrder(Customer customer, ShoppingCart cart,
					String surcharge) {
		// set up customer order
		CustomerOrder order = new CustomerOrder();
		order.setCustomer(customer);
		order.setAmount(BigDecimal.valueOf(cart.getSubtotal()
						+ Double.parseDouble(surcharge)));
		// create confirmation number
		int i = random.nextInt(999999999);
		order.setConfirmationNumber(i);

		em.persist(order);
		return order;
	}

	private void addOrderedItems(CustomerOrder order, ShoppingCart cart) {
		em.flush();
		Collection<ShoppingCartItem> items = cart.getItems();

		// iterate through shopping cart and create OrderedProducts
		for (ShoppingCartItem scItem : items) {
			int productId = scItem.getProduct().getId();

			// set up primary key object
			OrderedProductPK orderedProductPK = new OrderedProductPK();
			orderedProductPK.setCustomerOrderId(order.getId());
			orderedProductPK.setProductId(productId);

			// create ordered item using PK object
			OrderedProduct orderedItem = new OrderedProduct(orderedProductPK);

			// set quantity
			orderedItem.setQuantity(scItem.getQuantity());

			em.persist(orderedItem);
		}
	}
}
