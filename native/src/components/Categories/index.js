import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Category from "../Category";

export default function Categories(props) {
  if (props == null || props.categories.length === 0) {
    return null;
  }

  const categories = props.categories.map(category => (
    <Category key={category._links.self.href} category={category} />
  ));

  const styles = StyleSheet.create({
    Button: {
      color: "red"
    }
  });
  return <View style={{ flex: 0.04 }} />;
  // <div>
  //   <CategoriesLeft>
  //     <CategoriesWelcome>
  //       <CategoriesGreeting>
  //         Welcome to the online home of the Affable Bean Green Grocer.
  //       </CategoriesGreeting>
  //       <p>
  //         Our unique home delivery service brings you fresh organic produce,
  //         dairy, meats, breads and other delicious and healthy items direct to
  //         your doorstep.
  //       </p>
  //     </CategoriesWelcome>
  //   </CategoriesLeft>

  //   <CategoriesRight>{categories}</CategoriesRight>
  // </div>
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

// export const CategoriesGreeting = styled.p`
//   font-size larger;
// `;

// export const CategoriesLeft = styled.div`
//   text-align: left;
//   height: 400px;
//   width: 350px;
//   float: left;
// `;

// export const CategoriesRight = styled.div`
//   text-align: left;
//   height: 400px;
//   width: 720px;
//   float: left;
// `;

// export const CategoriesWelcome = styled.div`
//   margin: 30px 5px 0 30px;
//   line-height: 1.4em;
// `;
