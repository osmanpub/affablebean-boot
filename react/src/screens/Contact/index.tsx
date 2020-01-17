import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Match } from "../../interfaces/router";
import { fetchSubjectsIfNeeded } from "../../net/subjects";
import { RootState } from "../../redux";

type Props = {
  match: Match;
  subjects: any;
};

function Contact(props: Props) {
  const { match, subjects } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjectsIfNeeded());
  }, [dispatch, subjects]);

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

const mapStateToProps = (state: RootState) => ({
  subjects: state.subjects
});

export default connect(mapStateToProps)(Contact);
