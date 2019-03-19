/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */
package com.affablebean.session;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author tgiunipero
 * @param <T>
 */
public abstract class AbstractFacade<T> {

	@PersistenceContext(unitName = "AffableBeanPU")
	protected EntityManager em;
	protected final Class<T> entityClass;

	public AbstractFacade(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	public void create(T entity) {
		em.persist(entity);
	}

	public void edit(T entity) {
		em.merge(entity);
	}

	public void remove(T entity) {
		em.remove(em.merge(entity));
	}

	public T find(Object id) {
		return em.find(entityClass, id);
	}

	public List<T> findAll() {
		javax.persistence.criteria.CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
		cq.select(cq.from(entityClass));
		return em.createQuery(cq).getResultList();
	}

	public List<T> findRange(int[] range) {
		javax.persistence.criteria.CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
		cq.select(cq.from(entityClass));
		javax.persistence.Query q = em.createQuery(cq);
		q.setMaxResults(range[1] - range[0]);
		q.setFirstResult(range[0]);
		return q.getResultList();
	}

	public int count() {
		javax.persistence.criteria.CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
		javax.persistence.criteria.Root<T> rt = cq.from(entityClass);
		cq.select(em.getCriteriaBuilder().count(rt));
		javax.persistence.Query q = em.createQuery(cq);
		return ((Long) q.getSingleResult()).intValue();
	}

}
