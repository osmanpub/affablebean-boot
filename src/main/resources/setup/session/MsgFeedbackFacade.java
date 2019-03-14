package com.affablebean.session;

import com.affablebean.entity.MsgFeedback;
import com.affablebean.entity.MsgSubject;
import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;

/**
 *
 * @author osman
 */
@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class MsgFeedbackFacade extends AbstractFacade<MsgFeedback> {
	@Resource
	private SessionContext context;

	public MsgFeedbackFacade() {
		super(MsgFeedback.class);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public int save(Object... msg) {

		try {
			MsgFeedback mf = new MsgFeedback();

			mf.setName((String) msg[0]);
			mf.setEmail((String) msg[1]);
			mf.setMsg((String) msg[2]);
			mf.setSubjectId((MsgSubject) msg[3]);

			em.persist(mf);
			return mf.getId();

		} catch (Exception e) {
//			e.printStackTrace();
			context.setRollbackOnly();
			return 0;
		}
	}

}
