'use strict';

function createStoreMixin(...stores) {
  var StoreMixin = {
    getInitialState() {
      return this.getStateFromStores(this.props);
    },

    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );

      this.setState(this.getStateFromStores(this.props));
    },

    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    },

    handleStoresChanged() {
      console.log('getting state from store because store change event');
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    }
  };

  return StoreMixin;
}

module.exports = createStoreMixin;
