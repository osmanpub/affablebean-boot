import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Subjects, SubjectState } from "../../interfaces/subjects";
import { sendFeedback } from "../../net/contact";
import { validateField } from "../../helpers/utils";
import { RootState } from "../../redux";

type Props = {
  subjects: Subjects;
};

function ContactForm(props: Props) {
  const { subjects } = props;
  const [state, setState] = useState({
    email: "",
    msg: "",
    name: "",
    subjectId: ""
  });

  const emailErrorRef = useRef(null);
  const emailInputRef = useRef(null);

  const msgErrorRef = useRef(null);
  const msgInputRef = useRef(null);

  const nameErrorRef = useRef(null);
  const nameInputRef = useRef(null);

  const subjectErrorRef = useRef(null);
  const subjectInputRef = useRef(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const input = event.target;
    setState({ ...state, [input.name]: input.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validForm = true;

    if (!validateField(emailInputRef, emailErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(msgInputRef, msgErrorRef, 8, 256)) {
      validForm = false;
    }

    if (!validateField(nameInputRef, nameErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(subjectInputRef, subjectErrorRef, 1, 1)) {
      validForm = false;
    }

    if (validForm) {
      sendFeedback({
        // @ts-ignore
        email: emailInputRef.current.value,
        // @ts-ignore
        msg: msgInputRef.current.value,
        // @ts-ignore
        name: nameInputRef.current.value,
        // @ts-ignore
        subjectId: subjectInputRef.current.value
      });

      // @ts-ignore
      emailInputRef.current.value = "";
      // @ts-ignore
      msgInputRef.current.value = "";
      // @ts-ignore
      nameInputRef.current.value = "";
      // @ts-ignore
      subjectInputRef.current.value = "";
    }
  };

  const subjectsList = subjects.items.map((subject: SubjectState) => (
    <option key={subject._links.self.href} value={subject.id}>
      {subject.name}
    </option>
  ));

  return (
    <div className="singleColumn">
      <div>
        <h2>Contact Us Form</h2>
        <p>
          You can use this form for any comments or questions about our company
          or brands.
          <br />
          For general enquiries please call toll free on 1-800-BEANS-R-US
        </p>
      </div>
      <div>
        <p>(* Asterisks indicate required field)</p>
      </div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject_sel" className={`col-sm-2 control-label`}>
            subject
          </label>
          <div className="col-sm-10">
            <select
              ref={subjectInputRef}
              name="subject_sel"
              className="form-control"
            >
              {subjectsList}
            </select>
            <div className="formError" ref={subjectErrorRef}>
              Select a subject
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className={`col-sm-2 control-label`}>
            name
          </label>
          <div className="col-sm-10">
            <input
              ref={nameInputRef}
              type="text"
              className="form-control"
              name="name"
              maxLength={45}
              placeholder="At least 8 chars and no more than 45 chars"
              size={31}
              onChange={handleChange}
              value={state.name}
            />
          </div>
          <div className="formError" ref={nameErrorRef}>
            Name shoud be at least 8 chars and no more than 45 chars
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className={`col-sm-2 control-label`}>
            email
          </label>
          <div className="col-sm-10">
            <input
              ref={emailInputRef}
              type="email"
              className="form-control"
              name="email"
              maxLength={45}
              placeholder="At least 8 chars and no more than 45 chars"
              size={31}
              onChange={handleChange}
              value={state.email}
            />
          </div>
          <div className="formError" ref={emailErrorRef}>
            Email shoud be at least 8 chars and no more than 45 chars
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="msg" className={`col-sm-2 control-label`}>
            message
          </label>
          <div className="col-sm-10">
            <textarea
              ref={msgInputRef}
              className="form-control"
              name="msg"
              cols={25}
              rows={5}
              onChange={handleChange}
              value={state.msg}
            />
          </div>
          <div className="formError" ref={msgErrorRef}>
            Message shoud be at least 8 chars and no more than 256 chars
          </div>
        </div>
        <div className="form-group">
          <div className={`col-sm-offset-2 col-sm-10`}>
            <button type="submit" className={`btn btn-primary`}>
              send feedback
            </button>
          </div>
        </div>
      </form>
      <div>
        <br />
        <h3>Privacy</h3>
        <p>
          This website is owned and controlled by:
          <br />
          <br /> The Affable Bean Company Limited <br />
          Registered office: AffableBean House, Roast Drive, <br /> Pothead,
          POT123, BeanieLand
        </p>
        <p>(hereinafter referred to as "AffableBean")</p>

        <p>
          AffableBean is responsible for the processing of any information
          collected by or on behalf of AffableBean on or via this website. All
          such information will be processed in accordance with our&nbsp;
          <Link to="/privacy">privacy policy</Link>.
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  subjects: state.subjects
});

export default connect(mapStateToProps)(ContactForm);
