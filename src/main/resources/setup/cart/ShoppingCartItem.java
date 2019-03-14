/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */
package com.affablebean.cart;

import com.affablebean.entity.Product;
import java.util.concurrent.atomic.AtomicInteger;

/**
 *
 * @author tgiunipero
 */
public final class ShoppingCartItem {

	private final Product product;
	private final AtomicInteger quantity = new AtomicInteger(1);

	public ShoppingCartItem(Product product) {
		this.product = product;
	}

	public Product getProduct() {
		return product;
	}

	public short getQuantity() {
		return (short) quantity.get();
	}

	public void setQuantity(short quantity) {
		this.quantity.set(quantity);;
	}

	public void incrementQuantity() {
		quantity.incrementAndGet();
	}

	public void decrementQuantity() {
		quantity.decrementAndGet();
	}

	public double getTotal() {
		return quantity.doubleValue() * product.getPrice().doubleValue();
	}

}
