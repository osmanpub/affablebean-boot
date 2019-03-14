package com.affablebean.session;

import com.affablebean.entity.MsgSubject;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;

/**
 *
 * @author osman
 */
@Stateless
public class MsgSubjectFacade extends AbstractFacade<MsgSubject> {

	public MsgSubjectFacade() {
		super(MsgSubject.class);
	}

	public List<MsgSubject> findSubjects() {
		Query findSubs = em.createQuery(
						"SELECT s FROM MsgSubject s ORDER BY s.name");
		return findSubs.getResultList();
	}
}
