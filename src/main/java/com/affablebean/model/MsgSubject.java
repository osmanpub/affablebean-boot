package com.affablebean.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "msg_subject")
@XmlRootElement
@JsonIgnoreProperties(value = { "msgFeedbackCollection" }, ignoreUnknown = true)
public class MsgSubject implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8637916068100816835L;

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
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof MsgSubject)) {
			return false;
		}
		MsgSubject other = (MsgSubject) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "MsgSubject [id=" + id + ", name=" + name + "]";
	}

}
