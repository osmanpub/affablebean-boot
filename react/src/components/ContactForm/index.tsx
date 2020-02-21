import React from "react";
// import { types, useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
import { getId } from "../../helpers/utils";
import { Subjects, SubjectState } from "../../interfaces/subjects";
import { FormErrors } from "../../interfaces/ui";
import { sendFeedback } from "../../net/contact";
import { RootState } from "../../redux";
import { goHome, setFormErrors } from "../../redux/ui";

type Props = {
  formErrors: Array<FormErrors>;
  goHome: Function;
  home: boolean;
  setFormErrors: Function;
  subjects: Subjects;
};

type FormData = {
  email: string;
  name: string;
  msg: string;
  subject: string;
};

function ContactForm(props: Props) {
  const { formErrors, goHome, home, setFormErrors, subjects } = props;
  // Problem with jest - https://github.com/schiehll/react-alert/issues/148
  // const alert = useAlert();
  const dispatch = useDispatch();
  // const history = useHistory();
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, msg, name, subject }) => {
    dispatch(sendFeedback({ email, msg, name, subjectId: subject }));
  });

  const subjectsList = subjects.items.map((subject: SubjectState) => {
    const id = getId(subject);
    return (
      <option key={id} value={id}>
        {subject.name}
      </option>
    );
  });

  if (formErrors && Array.isArray(formErrors) && formErrors.length > 0) {
    let msg = "";

    formErrors.forEach(error => {
      msg += `Field "${error.param}" with value "${error.value}" has the following problem:\n"${error.msg}"`;
    });

    setFormErrors([]);
    alert(
      `There was a problem saving your message.\nPlease correct the following errors:\n${msg}`
    );

    // alert.show(
    //   `There was a problem saving your message.\nPlease correct the following errors:\n${msg}`,
    //   {
    //     timeout: 0,
    //     type: types.ERROR
    //   }
    // );
  } else if (home) {
    goHome(false);
    alert("Message sent successfully!");

    // alert.show("Message sent successfully!", {
    //   onClose: () => history.push("/"),
    //   timeout: 3000,
    //   type: types.SUCCESS
    // });
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
              className="form-control"
              ref={register({ required: true })}
              name="subject"
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
              className="form-control"
              data-cy="contact-name"
              name="name"
              placeholder="At least 3 chars and no more than 64 chars"
              size={31}
              ref={register({ required: true, minLength: 3, maxLength: 64 })}
              type="text"
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
              className="form-control"
              data-cy="contact-email"
              name="email"
              placeholder="At least 8 chars and no more than 32 chars"
              size={31}
              ref={register({ required: true, minLength: 8, maxLength: 32 })}
              type="email"
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
              className="form-control"
              cols={25}
              rows={5}
              data-cy="contact-msg"
              name="msg"
              placeholder="At least 8 chars and no more than 1024 chars"
              ref={register({ required: true, minLength: 8, maxLength: 1024 })}
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
              className={`btn btn-primary`}
              data-cy="contact-submit"
              type="submit"
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
  formErrors: state.ui.formErrors,
  home: state.ui.home,
  subjects: state.subjects
});

const mapDispatchToProps = {
  goHome,
  setFormErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
