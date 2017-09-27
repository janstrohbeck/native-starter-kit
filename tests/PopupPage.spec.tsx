/* tslint:disable:no-unused-expression */
import { mount, render, shallow } from 'enzyme'
import * as React from 'react'
import { PopupPage } from '../src/routes/PopupPage'

describe('abc', () => {
  const list = {
    list: [
      'React Native Starter Kit',
      'React Navigation',
      'NativeBase Easy Grid',
      'NativeBase',
      'CodePush',
      'Redux'
    ],
    selectedIndex: 3
  }
  const navigation: any = {}
  beforeEach(() => {
    navigation.goBack = sinon.stub()
  })

  it('should display a text from the list', () => {
    const component = shallow(<PopupPage list={list} navigation={navigation} />)
    expect(component.find('Text')).to.exist
    expect(
      component
        .find('Text')
        .childAt(0)
        .text()
    ).to.equal('NativeBase')
  })

  it('dispatches goBack when the button is pressed', () => {
    const component = shallow(<PopupPage list={list} navigation={navigation} />)
    component.find('Button').simulate('press')
    expect(navigation.goBack).to.have.been.calledOnce
  })
})
