package com.affablebean.repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.affablebean.model.CustomerOrder;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer> {

	List<CustomerOrder> findByCustomer(String customer);

	List<CustomerOrder> findByAmount(BigDecimal amount);

	List<CustomerOrder> findByDateCreated(Date date);

	List<CustomerOrder> findByConfirmationNumber(Integer confirmationNumber);

	// overridden - refresh method called to retrieve order id from database
//	@Override
//    public CustomerOrder find(Object id) {
//        CustomerOrder order = em.find(CustomerOrder.class, id);
//        em.refresh(order);
//        return order;
//    }

	// in this implementation, there is only one order per customer
	// the data model however allows for multiple orders per customer
//    @RolesAllowed("affableBeanAdmin")
//    public CustomerOrder findByCustomer(Object customer) {
//        return (CustomerOrder) 
//			em.createNamedQuery("CustomerOrder.findByCustomer").
//							setParameter("customer", customer).getSingleResult();
//    }
}
