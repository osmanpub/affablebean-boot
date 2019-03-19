package com.affablebean.session;

import com.affablebean.entity.Promotion;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;

/**
 *
 * @author osman
 */
@Stateless
public class PromotionFacade extends AbstractFacade<Promotion> {

	public PromotionFacade() {
		super(Promotion.class);
	}

	public List<Promotion> findCategories() {
		Query findSales = em.createQuery(
						"SELECT p FROM Promotion p WHERE p.categoryId > 0");
		return findSales.getResultList();
	}

	public List<Promotion> findProducts() {
		Query findSales = em.createQuery(
						"SELECT p FROM Promotion p WHERE p.productId > 0");
		return findSales.getResultList();
	}

	public Promotion findSale() {
		Query qry = em.createQuery(
						"SELECT p FROM Promotion p WHERE p.sale = :sale");
		qry.setParameter("sale", true);
		List<Promotion> promos = qry.getResultList();

		// only the first found sale is used, rest ignored
		if (!promos.isEmpty()) {
			return promos.get(0);
		} else {
			return null;
		}
	}
}
