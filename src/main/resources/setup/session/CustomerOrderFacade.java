/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */

package com.affablebean.session;

import com.affablebean.entity.CustomerOrder;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

/**
 *
 * @author tgiunipero
 */
@Stateless
public class CustomerOrderFacade extends AbstractFacade<CustomerOrder> {
    public CustomerOrderFacade() {
        super(CustomerOrder.class);
    }

    // overridden - refresh method called to retrieve order id from database
		@Override
    public CustomerOrder find(Object id) {
        CustomerOrder order = em.find(CustomerOrder.class, id);
        em.refresh(order);
        return order;
    }

    // in this implementation, there is only one order per customer
    // the data model however allows for multiple orders per customer
    @RolesAllowed("affableBeanAdmin")
    public CustomerOrder findByCustomer(Object customer) {
        return (CustomerOrder) 
								em.createNamedQuery("CustomerOrder.findByCustomer").
												setParameter("customer", customer).getSingleResult();
    }
}