import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base'
import * as React from 'react'
import { NavigationParams, NavigationScreenProps } from 'react-navigation'

export default class SecondPage extends React.Component<
  NavigationScreenProps<any>,
  any
  > {
  static navigationOptions: NavigationParams = {
    header: null
  }
  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>

          <Body>
            <Title>Second page</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name='ios-menu' />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Text>Create Something Awesome . . .</Text>
        </Content>
      </Container>
    )
  }
}
