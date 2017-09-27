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
export const Container = mockComponent('Container');
export const Header = mockComponent('Header');
export const Title = mockComponent('Title');
export const Content = mockComponent('Content');
export const Text = mockComponent('Text');
export const Button = mockComponent('Button');
export const Icon = mockComponent('Icon');
export const Left = mockComponent('Left');
export const Right = mockComponent('Right');
export const Body = mockComponent('Body');
