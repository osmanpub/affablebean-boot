import React from "react";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Match } from "../../interfaces/router";

type Props = {
  match: Match;
};

function Contact(props: Props) {
  const { match } = props;

  return (
    <div>
      <Header url={match.url} />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Contact;
