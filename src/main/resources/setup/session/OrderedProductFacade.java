/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */
package com.affablebean.session;

import com.affablebean.entity.OrderedProduct;
import java.util.List;
import javax.ejb.Stateless;

/**
 *
 * @author tgiunipero
 */
@Stateless
public class OrderedProductFacade extends AbstractFacade<OrderedProduct> {
	public OrderedProductFacade() {
		super(OrderedProduct.class);
	}

	// manually created
	public List<OrderedProduct> findByOrderId(Object id) {
		return em.createNamedQuery("OrderedProduct.findByCustomerOrderId").
						setParameter("customerOrderId", id).getResultList();
	}
}
