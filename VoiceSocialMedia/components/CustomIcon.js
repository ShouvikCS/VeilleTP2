import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomIcon extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <Icon name={name} size={30} color="#FFFFFF" />
    );
  }
}
