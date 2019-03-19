/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.affablebean.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author osman
 */
@Entity
@Table(name = "msg_subject")
@XmlRootElement
@NamedQueries({
	@NamedQuery(name = "MsgSubject.findAll", query = "SELECT m FROM MsgSubject m"),
	@NamedQuery(name = "MsgSubject.findById", query = "SELECT m FROM MsgSubject m WHERE m.id = :id"),
	@NamedQuery(name = "MsgSubject.findByName", query = "SELECT m FROM MsgSubject m WHERE m.name = :name")})
public class MsgSubject implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Basic(optional = false)
  @Column(name = "id")
	private Integer id;
	@Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 45)
  @Column(name = "name")
	private String name;
	@OneToMany(mappedBy = "subjectId")
	private Collection<MsgFeedback> msgFeedbackCollection;

	public MsgSubject() {
	}

	public MsgSubject(Integer id) {
		this.id = id;
	}

	public MsgSubject(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlTransient
	public Collection<MsgFeedback> getMsgFeedbackCollection() {
		return msgFeedbackCollection;
	}

	public void setMsgFeedbackCollection(Collection<MsgFeedback> msgFeedbackCollection) {
		this.msgFeedbackCollection = msgFeedbackCollection;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof MsgSubject)) {
			return false;
		}
		MsgSubject other = (MsgSubject) object;
		return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
	}

	@Override
	public String toString() {
		return "com.affablebean.entity.MsgSubject[ id=" + id + " ]";
	}
	
}
