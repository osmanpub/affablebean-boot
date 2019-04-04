import styled from "styled-components";

export const CategoriesGreeting = styled.p`
  font-size larger;
`;

export const CategoriesLeft = styled.div`
  text-align: left;
  height: 400px;
  width: 350px;
  float: left;
`;

export const CategoriesRight = styled.div`
  text-align: left;
  height: 400px;
  width: 720px;
  float: left;
`;

export const CategoriesWelcome = styled.div`
  margin: 30px 5px 0 30px;
  line-height: 1.4em;
`;

/* <script type="text/javascript">
$(document).ready(function() {
  $('a.categoryButton').hover(function() {
    $(this).animate({
      backgroundColor : '#b2d2d2'
    });
  }, function() {
    $(this).animate({
      backgroundColor : '#d3ede8'
    });
  });

  $('div.categoryBox').hover(function() {
    var span = this.getElementsByTagName('span');
    $(span[0]).animate({
      opacity : 0.3
    });
    $(span[1]).animate({
      color : 'white'
    });
  }, function() {
    var span = this.getElementsByTagName('span');
    $(span[0]).animate({
      opacity : 0.7
    });
    $(span[1]).animate({
      color : '#444'
    });
  });
});
</script> */
