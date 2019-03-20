package com.affablebean.cart;

import java.util.concurrent.atomic.AtomicInteger;

import com.affablebean.domain.Product;

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
		this.quantity.set(quantity);
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
