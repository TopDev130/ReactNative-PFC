import React, {ListView, RefreshControl as RefreshControlComponent} from 'react-native';
import colors from '../colors';

export const RefreshControl = (Component) => class RefreshListView extends React.Component {
  state = {
    isRefreshing: false
  };

  static propTypes = {
    onRefresh: React.PropTypes.func
  };

  static defaultProps = {
    onRefresh: () => {}
  };

  refresh = () => {
    this.setState({isRefreshing: true});
    this.props.onRefresh().then(() => this.setState({isRefreshing: false}));
  };

  render() {
    const refreshControl = (
      <RefreshControlComponent
        enabled
        onRefresh={this.refresh}
        refreshing={this.state.isRefreshing}
        tintColor={colors.types.dark}
      />
    );

    return (
      <Component
        refreshControl={refreshControl}
        {...this.props}
      />
    );
  }
};

export default RefreshControl(ListView);
