
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../actions";
import { client, getPath } from "../../utils.js";
import Picker from "../components/Picker";
import Posts from "../components/Posts";

function App() {
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    client
      .get(getPath("categories"), function(data) {
        setCategories(data._embedded.categoryList);
      })
      .on("error", function(err) {
        console.log("something went wrong on the request", err.request.options);
      });
  });

  return <CategoryList categories={categories} />;
}

function CategoryList(props) {
  if (!props || !Array.isArray(props.categories)) {
    return null;
  }

  const categories = props.categories.map(category => (
    <Category key={category._links.self.href} category={category} />
  ));

  return (
    <table>
      <tbody>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
        {categories}
      </tbody>
    </table>
  );
}

function Category(props) {
  return (
    <tr>
      <td>{props.category.id}</td>
      <td>{props.category.name}</td>
    </tr>
  );
}

export default App;



interface Props {
  comments: Array<any>;
  dispatch: any;
  isFetching: boolean;
  lastUpdated: number;
  posts: Array<any>;
  selectedSubreddit: string;
}

interface State {
  subText: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { subText: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  loadSub = () => {
    let subreddit = this.state.subText;

    if (subreddit) {
      this.props.dispatch(selectSubreddit({ subreddit }));
    }
  };

  handleChange = (nextSubreddit: string) => {
    this.setState({
      subText: ""
    });

    this.props.dispatch(selectSubreddit({ subreddit: nextSubreddit }));
  };

  handleInputKeyUp = (e: any) => {
    if (e.key == "Enter") {
      this.loadSub();
    }
  };

  handleInputChange = (e: any) => {
    this.setState({
      subText: e.target.value
    });
  };

  handleRefreshClick = (e: any) => {
    e.preventDefault();
    const { dispatch, selectedSubreddit } = this.props;

    dispatch(invalidateSubreddit({ subreddit: selectedSubreddit }));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  render() {
    const {
      selectedSubreddit,
      comments,
      posts,
      isFetching,
      lastUpdated
    } = this.props;
    const isEmpty = posts.length === 0;

    return (
      <div>
        <span>
          <Picker
            value={selectedSubreddit}
            onChange={this.handleChange}
            options={[
              "frontend",
              "reactjs",
              "userexperience",
              "webdev",
              "web_design"
            ]}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            name="subText"
            size={16}
            type="text"
            value={this.state.subText}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />{" "}
          <button onClick={this.loadSub}>Load</button>
        </span>

        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Empty.</h2>
          )
        ) : (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts comments={comments} posts={posts} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { selectedSubreddit, postsBySubreddit, commentsByPosts } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
    lastUpdated: 0
  };

  const comments = commentsByPosts;

  return {
    selectedSubreddit,
    comments,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(App);
