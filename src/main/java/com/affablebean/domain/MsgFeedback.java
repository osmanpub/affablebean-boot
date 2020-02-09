package com.affablebean.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author osman
 */
@Entity
@Table(name = "msg_feedback")
@XmlRootElement
public class MsgFeedback implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5195439023987008735L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;

	// @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
	// message="Invalid email")//if the field contains email address consider using
	// this annotation to enforce field validation
	@Basic(optional = false)
	@Column(name = "email")
	@Email
	@NotNull
	@Size(min = 8, max = 32)
	private String email;

	@Basic(optional = false)
	@Column(name = "msg")
	@NotNull
	@Size(min = 8, max = 1024)
	private String msg;

	@Basic(optional = false)
	@Column(name = "name")
	@NotNull
	@Size(min = 3, max = 64)
	private String name;

	@JoinColumn(name = "subject_id", referencedColumnName = "id")
	@ManyToOne
	private MsgSubject subject;

	public MsgFeedback() {
	}

	public MsgFeedback(String name, String email, String msg) {
		this.name = name;
		this.email = email;
		this.msg = msg;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public MsgSubject getSubject() {
		return subject;
	}

	public void setSubject(MsgSubject subject) {
		this.subject = subject;
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
		if (!(obj instanceof MsgFeedback)) {
			return false;
		}
		MsgFeedback other = (MsgFeedback) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "MsgFeedback [id=" + id + ", name=" + name + ", email=" + email + ", msg=" + msg + ", subject=" + subject
				+ "]";
	}

}
