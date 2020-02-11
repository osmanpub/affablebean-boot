import React from "react";
import { types, useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getId } from "../../helpers/utils";
import { Subjects, SubjectState } from "../../interfaces/subjects";
import { sendFeedback } from "../../net/contact";
import { RootState } from "../../redux";
import { goHome } from "../../redux/ui";

type Props = {
  goHome: Function;
  home: boolean;
  subjects: Subjects;
};

type FormData = {
  email: string;
  name: string;
  msg: string;
  subject: string;
};

function ContactForm(props: Props) {
  const { goHome, home, subjects } = props;
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(({ email, msg, name, subject }) => {
    console.log(`${email} ${msg} ${name} ${subject}`);
    // dispatch(
    //   // @ts-ignore
    //   sendFeedback({ ...state, subjectId: subjectInputRef.current.value })
    // );
  });

  const subjectsList = subjects.items.map((subject: SubjectState) => {
    const id = getId(subject);
    return (
      <option key={id} value={id}>
        {subject.name}
      </option>
    );
  });

  if (home) {
    goHome(false);
    alert.show("Message sent successfully!", {
      onClose: () => history.push("/"),
      timeout: 3000,
      type: types.SUCCESS
    });
  }

  return (
    <div className="singleColumn">
      <div>
        <h2 data-cy="contact-intro">Contact Us Form</h2>
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
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="subject" className={`col-sm-2 control-label`}>
            subject
          </label>
          <div className="col-sm-10">
            <select
              ref={register({ required: true })}
              name="subject"
              className="form-control"
            >
              {subjectsList}
            </select>
          </div>
          {errors.subject && <div className="formError">Select a subject</div>}
        </div>
        <div className="form-group">
          <label htmlFor="name" className={`col-sm-2 control-label`}>
            name
          </label>
          <div className="col-sm-10">
            <input
              data-cy="contact-name"
              ref={register({ required: true, minLength: 3, maxLength: 64 })}
              type="text"
              className="form-control"
              name="name"
              placeholder="At least 3 chars and no more than 64 chars"
              size={31}
            />
          </div>
          {errors.name && (
            <div className="formError">
              Name shoud be at least 3 chars and no more than 64 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email" className={`col-sm-2 control-label`}>
            email
          </label>
          <div className="col-sm-10">
            <input
              data-cy="contact-email"
              ref={register({ required: true, minLength: 8, maxLength: 32 })}
              type="email"
              className="form-control"
              name="email"
              placeholder="At least 8 chars and no more than 32 chars"
              size={31}
            />
          </div>
          {errors.email && (
            <div className="formError">
              Email shoud be at least 8 chars and no more than 32 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="msg" className={`col-sm-2 control-label`}>
            message
          </label>
          <div className="col-sm-10">
            <textarea
              data-cy="contact-msg"
              ref={register({ required: true, minLength: 8, maxLength: 1024 })}
              className="form-control"
              name="msg"
              placeholder="At least 8 chars and no more than 1024 chars"
              cols={25}
              rows={5}
            />
          </div>
          {errors.msg && (
            <div className="formError">
              Message shoud be at least 8 chars and no more than 1024 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <div className={`col-sm-offset-2 col-sm-10`}>
            <button
              type="submit"
              className={`btn btn-primary`}
              data-cy="contact-submit"
            >
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
  subjects: state.subjects,
  home: state.ui.home
});

const mapDispatchToProps = {
  goHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
