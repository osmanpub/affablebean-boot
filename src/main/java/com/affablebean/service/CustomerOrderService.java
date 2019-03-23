package com.affablebean.service;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.affablebean.domain.CustomerOrder;
import com.affablebean.repository.CustomerOrderRepository;

@Service
public class CustomerOrderService {

	@Resource
	private CustomerOrderRepository repository;

//	Promotion findSale() {
//		List<Promotion> promotions = repository.findSale(true);
//
//		// only the first found sale is used, rest ignored
//		return promotions.isEmpty() ? null : promotions.get(0);
//	}

	// overridden - refresh method called to retrieve order id from database
	public CustomerOrder find(Integer id) {
		CustomerOrder order = repository.findOrder(id);

//        em.refresh(order);
		return order;
	}

	// in this implementation, there is only one order per customer
	// the data model however allows for multiple orders per customer
//    @RolesAllowed("affableBeanAdmin")
//    public CustomerOrder findByCustomer(Object customer) {
//        return (CustomerOrder) 
//			em.createNamedQuery("CustomerOrder.findByCustomer").
//							setParameter("customer", customer).getSingleResult();
//    }	
}
