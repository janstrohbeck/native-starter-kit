import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

function mockComponent(type) {
  const Component = createReactClass({
    displayName: type,
    propTypes: { children: PropTypes.node },
    render() { return React.createElement(React.DOM.div, this.props, this.props.children); },
  });
  return Component;
}

export const View = mockComponent('View');
export const Test = mockComponent('Text');
export const Component = mockComponent('Component');
export const ScrollView = mockComponent('ScrollView');
export const TextInput = mockComponent('TextInput');

export * from 'react';

export const StyleSheet = {
  create: ss => ss,
};
