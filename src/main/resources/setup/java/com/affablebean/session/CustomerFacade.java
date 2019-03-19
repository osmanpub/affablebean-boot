/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */

package com.affablebean.session;

import com.affablebean.entity.Customer;
import javax.ejb.Stateless;

/**
 *
 * @author tgiunipero
 */
@Stateless
public class CustomerFacade extends AbstractFacade<Customer> {
    public CustomerFacade() {
        super(Customer.class);
    }

}