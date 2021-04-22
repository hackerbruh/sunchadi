import React, { Component } from "react";

import InfiniteScroller from "../../app/components/InfiniteScroller/InfiniteScroller";

class WorkShop extends Component {
  state = {
    itemsCount: 50
  };
  handleLoadItem = () => {
    this.setState(({ itemsCount }) => ({
      itemsCount: itemsCount + 50
    }));
  };
  render() {
    let items = [];
    for (let i = 0; i < this.state.itemsCount; i++) {
      items[i] = i;
    }
    items = items.map(item => <p key={item}>Item {item + 1}</p>);

    return (
      <div>
        <h1>WorkShop</h1>
        <InfiniteScroller
          loadMore={this.handleLoadItem}
        >
          {items}
        </InfiniteScroller>
      </div>
    );
  }
}

export default WorkShop;
