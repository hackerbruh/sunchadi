import React, { Component } from "react";

class InfiniteScroller extends Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.scroller.addEventListener("scroll", () => {
      const { scrollTop, clientHeight, scrollHeight } = this.scroller;
      const { loadMore } = this.props;
      if (!this.state.loading) {
        if (scrollTop + clientHeight >= scrollHeight) {
          this.setState({
            loading: true
          });
          setTimeout(() => {
            this.setState({
              loading: false
            });
            loadMore();
          }, 5000);
        }
      }
    });
  }
  componentWillUnmount() {
    this.scroller.removeEventListener("scroll", () => {});
  }
  render() {
    const { children, loader } = this.props;
    return (
      <div
        ref={ref => (this.scroller = ref)}
        style={{
          width: "40rem",
          height: "40rem",
          border: "4px solid grey",
          overflow: "scroll"
        }}
      >
        {children}
        {this.state.loading && (loader ? loader : "Loading...")}
      </div>
    );
  }
}

export default InfiniteScroller;
