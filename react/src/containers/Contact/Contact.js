import React, { Component } from "react";
import { connect } from "react-redux";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchSubjectsIfNeeded } from "../../net/subjects";

export class Contact extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSubjectsIfNeeded());
  }

  render() {
    const { match, subjects } = this.props;

    return (
      <div>
        <Header cart={cart} url={match.url} />
        <ContactForm subjects={subjects} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { cart, subjects } = state;

  return {
    cart,
    subjects
  };
};

export default connect(mapStateToProps)(Contact);
