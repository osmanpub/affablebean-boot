package com.affablebean.cart;

import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Collectors;

import com.affablebean.domain.Product;

public final class ShoppingCart {

	private final Queue<ShoppingCartItem> items = new ConcurrentLinkedQueue<>();

	/**
	 * Adds a <code>ShoppingCartItem</code> to the <code>ShoppingCart</code>'s
	 * <code>items</code> list. If item of the specified <code>product</code>
	 * already exists in shopping cart list, the quantity of that item is
	 * incremented.
	 *
	 * @param product the <code>Product</code> that defines the type of shopping
	 *                cart item
	 * @see ShoppingCartItem
	 */
	public void addItem(Product product) {
		List<ShoppingCartItem> foundItems = items.stream()
				.filter(item -> Objects.equals(item.getProduct().getId(), product.getId()))
				.collect(Collectors.toList());

		if (foundItems.isEmpty()) {
			items.add(new ShoppingCartItem(product));

		} else {
			ShoppingCartItem item = foundItems.get(0);
			item.incrementQuantity();
		}
	}

	/**
	 * Updates the <code>ShoppingCartItem</code> of the specified
	 * <code>product</code> to the specified quantity. If '<code>0</code>' is the
	 * given quantity, the <code>ShoppingCartItem</code> is removed from the
	 * <code>ShoppingCart</code>'s <code>items</code> list.
	 *
	 * @param product  the <code>Product</code> that defines the type of shopping
	 *                 cart item
	 * @param quantity the number which the <code>ShoppingCartItem</code> is updated
	 *                 to
	 * @see ShoppingCartItem
	 */
	public void update(Product product, Short quantity) {
		if (quantity == null || quantity < 0) {
			return;
		}

		List<ShoppingCartItem> foundItems = items.stream()
				.filter(item -> Objects.equals(item.getProduct().getId(), product.getId()))
				.collect(Collectors.toList());

		if (!foundItems.isEmpty()) {
			ShoppingCartItem item = foundItems.get(0);

			if (quantity > 0) {
				item.setQuantity(quantity);

			} else {
				items.remove(item);
			}
		}
	}

	/**
	 * Returns the list of <code>ShoppingCartItems</code>.
	 *
	 * @return the <code>items</code> list
	 * @see ShoppingCartItem
	 */
	public Collection<ShoppingCartItem> getItems() {
		return Collections.unmodifiableCollection(items);
	}

	/**
	 * Returns the sum of quantities for all items maintained in shopping cart
	 * <code>items</code> list.
	 *
	 * @return the number of items in shopping cart
	 * @see ShoppingCartItem
	 */
	public int getNumberOfItems() {
		return items.stream().mapToInt(ShoppingCartItem::getQuantity).sum();
	}

	/**
	 * Returns the sum of the product price multiplied by the quantity for all items
	 * in shopping cart list. This is the total cost excluding the surcharge.
	 *
	 * @return the cost of all items times their quantities
	 * @see ShoppingCartItem
	 */
	public double getSubtotal() {
		return items.stream().mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice().doubleValue())
				.sum();
	}

	/**
	 * Empties the shopping cart. All items are removed from the shopping cart
	 * <code>items</code> list, <code>numberOfItems</code> and <code>total</code>
	 * are reset to '<code>0</code>'.
	 *
	 * @see ShoppingCartItem
	 */
	public void clear() {
		items.clear();
	}
}
