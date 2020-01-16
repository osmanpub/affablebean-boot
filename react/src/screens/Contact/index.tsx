import React, { useEffect } from "react";
import { connect } from "react-redux";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchSubjectsIfNeeded } from "../../net/subjects";

type Props = {
  dispatch: Function;
  match: any;
  subjects: any;
};

function Contact(props: Props) {
  const { match, subjects } = props;

  useEffect(() => {
    const { dispatch } = props;
    dispatch(fetchSubjectsIfNeeded());
  });

  const { items } = subjects;

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <Header url={match.url} />
      <ContactForm />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  subjects: state.subjects
});

export default connect(mapStateToProps)(Contact);
