package com.affablebean.json;

import com.affablebean.cart.ShoppingCart;
import com.affablebean.cart.ShoppingCartItem;
import com.affablebean.entity.Category;
import com.affablebean.entity.Customer;
import com.affablebean.entity.CustomerOrder;
import com.affablebean.entity.MsgSubject;
import com.affablebean.entity.OrderedProduct;
import com.affablebean.entity.Product;
import com.affablebean.entity.Promotion;
import com.affablebean.session.ProductFacade;
import java.io.Writer;
import java.util.Collection;
import java.util.List;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author osman
 */
public final class JsonFactory {

	public static void cartResponse(Writer response, HttpSession session,
					ServletContext ctx) {

		try (JsonGenerator gen = Json.createGenerator(response)) {
			gen.writeStartObject();
			writeCart(response, gen, (ShoppingCart) session.getAttribute("cart"));
			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void categoryList(Writer response, ServletContext ctx) {
		try (JsonGenerator gen = Json.createGenerator(response)) {
			gen.writeStartArray();

			for (Category category : (List<Category>) ctx.getAttribute("categories")) {
				gen.writeStartObject();
				gen.write("id", category.getId()).write("name", category.getName());
				gen.writeEnd();
			}

			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void categoryResponse(Writer response, HttpSession session,
					ServletContext ctx) {

		try (JsonGenerator gen = Json.createGenerator(response)) {
			Category cat = (Category) session.getAttribute("selectedCategory");
			gen.writeStartObject();

			writeCategoryProducts(response, gen,
							(Collection<Product>) session.getAttribute("categoryProducts"));
			writeCatPromotions(response, gen,
							(List<Promotion>) ctx.getAttribute("catProms"), (short) cat.getId());
			writeProductPromotions(response, gen,
							(List<Promotion>) ctx.getAttribute("prodProms"),
							(Collection<Product>) session.getAttribute("categoryProducts"));

			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void confResponse(Writer response, HttpServletRequest request,
					ServletContext ctx, ProductFacade productFacade) {

		try (JsonGenerator gen = Json.createGenerator(response)) {
			gen.writeStartObject();

			writeCustomer(response, gen, (Customer) request.getAttribute("customer"));
			writeCustomerOrder(response, gen,
							(CustomerOrder) request.getAttribute("orderRecord"));
			writeCOProducts(response, gen,
							(List<OrderedProduct>) request.getAttribute("orderedProducts"),
							productFacade);

			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void feedbackResponse(Writer response,
					HttpServletRequest request) {

		try (JsonGenerator gen = Json.createGenerator(response)) {
			gen.writeStartObject();

			if (request.getAttribute("nameError") != null) {
				gen.write("name", "name: null,empty,> 45 chars");
			}

			if (request.getAttribute("emailError") != null) {
				gen.write("email", "email: null,empty,missing '@'");
			}

			if (request.getAttribute("msgError") != null) {
				gen.write("msg", "msg: null,empty,< 10 chars");
			}

			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void indexResponse(Writer response, ServletContext ctx) {
		try (JsonGenerator gen = Json.createGenerator(response)) {
			gen.writeStartObject();

			writeCategories(response, gen,
							(List<Category>) ctx.getAttribute("categories"));
			writeSalePromotion(response, gen, (Promotion) ctx.getAttribute("sale"));

			gen.writeStartObject("properties");
			gen.write("surcharge", ctx.getInitParameter("deliverySurcharge"));
			gen.writeEnd();

			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void subjectList(Writer response, ServletContext ctx) {
		try (JsonGenerator gen = Json.createGenerator(response)) {
			gen.writeStartArray();

			for (MsgSubject subject : (List<MsgSubject>) ctx.getAttribute("subjects")) {
				gen.writeStartObject();
				gen.write("id", subject.getId()).write("name", subject.getName());
				gen.writeEnd();
			}

			gen.writeEnd();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void writeCart(Writer response, JsonGenerator gen,
					ShoppingCart shoppingCart) {

		gen.writeStartArray("cartItems");

		for (ShoppingCartItem item : shoppingCart.getItems()) {
			gen.writeStartObject();
			gen.write("product", item.getProduct().getId())
							.write("name", item.getProduct().getName())
							.write("price", item.getProduct().getPrice())
							.write("qty", item.getQuantity())
							.write("total", item.getTotal());
			gen.writeEnd();
		}

		gen.writeEnd();

		gen.writeStartObject("properties");
		gen.write("items", shoppingCart.getNumberOfItems())
						.write("subtotal", shoppingCart.getSubtotal());
		gen.writeEnd();

	}

	private static void writeCategories(Writer response, JsonGenerator gen,
					List<Category> data) {

		gen.writeStartArray("categories");

		for (Category category : data) {
			gen.writeStartObject();
			gen.write("id", category.getId()).write("name", category.getName());
			gen.writeEnd();
		}

		gen.writeEnd();
	}

	private static void writeCategoryProducts(Writer response, JsonGenerator gen,
					Collection<Product> data) {

		gen.writeStartArray("products");

		for (Product product : data) {
			gen.writeStartObject();
			gen.write("id", product.getId())
							.write("name", product.getName())
							.write("price", product.getPrice())
							.write("description", product.getDescription())
							.write("categoryId", product.getCategory().getId());
			gen.writeEnd();
		}

		gen.writeEnd();
	}

	private static void writeCatPromotions(Writer response, JsonGenerator gen,
					List<Promotion> data, short selectedCategory) {

		gen.writeStartArray("categoryPromotions");

		for (Promotion promo : data) {
			if (promo.getCategoryId() == selectedCategory) {
				writePromotion(gen, promo);
			}
		}

		gen.writeEnd();
	}

	private static void writeCustomer(Writer response, JsonGenerator gen,
					Customer customer) {
		gen.writeStartObject("customer");

		gen.write("id", customer.getId())
						.write("name", customer.getName())
						.write("address", customer.getAddress())
						.write("region", customer.getCityRegion())
						.write("phone", customer.getPhone())
						.write("email", customer.getEmail())
						.write("ccNumber", customer.getCcNumber());

		gen.writeEnd();
	}

	private static void writeCustomerOrder(Writer response, JsonGenerator gen,
					CustomerOrder co) {

		gen.writeStartObject("customerOrder");
		gen.write("id", co.getId())
						.write("amount", co.getAmount())
						.write("confNumber", co.getConfirmationNumber())
						.write("dateCreated", co.getDateCreated().toString());
		gen.writeEnd();
	}

	private static void writeCOProducts(Writer response, JsonGenerator gen,
					List<OrderedProduct> orderedProducts, ProductFacade productFacade) {

		gen.writeStartArray("orderedProducts");

		for (OrderedProduct op : orderedProducts) {
			gen.writeStartObject();

			Product product = productFacade.find(
							op.getOrderedProductPK().getProductId());

			gen.write("coId", op.getOrderedProductPK().getCustomerOrderId())
							.write("prodId", op.getOrderedProductPK().getProductId())
							.write("name", product.getName())
							.write("price", product.getPrice())
							.write("qty", op.getQuantity());
			gen.writeEnd();
		}

		gen.writeEnd();
	}

	private static void writePromotions(Writer response, JsonGenerator gen,
					List<Promotion> data, String title) {

		gen.writeStartArray(title);

		for (Promotion promo : data) {
			writePromotion(gen, promo);
		}

		gen.writeEnd();
	}

	private static void writeProductPromotions(Writer response, JsonGenerator gen,
					List<Promotion> data, Collection<Product> catProds) {

		gen.writeStartArray("productPromotions");

		for (Promotion promo : data) {
			int prodId = promo.getProductId();

			for (Product product : catProds) {
				if (product.getId() == prodId) {
					writePromotion(gen, promo);
					break;
				}
			}
		}

		gen.writeEnd();
	}

	private static void writeSalePromotion(Writer response, JsonGenerator gen,
					Promotion data) {

		gen.writeStartArray("salePromotion");
		writePromotion(gen, data);
		gen.writeEnd();
	}

	private static void writePromotion(JsonGenerator gen, Promotion promo) {
		gen.writeStartObject();

		gen.write("id", promo.getId())
						.write("name", promo.getName())
						.write("discount", promo.getDiscount())
						.write("isSale", promo.getSale() != null
										? promo.getSale().toString() : "(null)")
						.write("categoryId", promo.getCategoryId() != null
										? promo.getCategoryId().toString() : "(null)")
						.write("productId", promo.getProductId() != null
										? promo.getProductId().toString() : "(null)")
						.write("qty", promo.getQty() != null
										? promo.getQty().toString() : "(null)")
						.write("sold", promo.getSold() != null
										? promo.getSold().toString() : "(null)")
						.write("description", promo.getDescription() != null
										? promo.getDescription() : "(null)");

		gen.writeEnd();
	}

	private JsonFactory() {
	}
}
