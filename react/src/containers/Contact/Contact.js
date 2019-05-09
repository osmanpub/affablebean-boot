import React, { Component } from "react";
import PropTypes from "prop-types";
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
    const { cart, match, subjects } = this.props;
    const { items } = subjects;

    if (items.length === 0) {
      return null;
    }

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

Contact.propTypes = {
  cart: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired
};
