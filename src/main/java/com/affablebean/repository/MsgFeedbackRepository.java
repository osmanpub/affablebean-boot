package com.affablebean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.affablebean.domain.MsgFeedback;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface MsgFeedbackRepository extends JpaRepository<MsgFeedback, Integer> {

	List<MsgFeedback> findByName(String name);

	List<MsgFeedback> findByEmail(String email);

	List<MsgFeedback> findByMsg(String msg);

//	@TransactionAttribute(TransactionAttributeType.REQUIRED)
//	public int save(Object... msg) {
//
//		try {
//			MsgFeedback mf = new MsgFeedback();
//
//			mf.setName((String) msg[0]);
//			mf.setEmail((String) msg[1]);
//			mf.setMsg((String) msg[2]);
//			mf.setSubjectId((MsgSubject) msg[3]);
//
//			em.persist(mf);
//			return mf.getId();
//
//		} catch (Exception e) {
////			e.printStackTrace();
//			context.setRollbackOnly();
//			return 0;
//		}
//	}	
}
