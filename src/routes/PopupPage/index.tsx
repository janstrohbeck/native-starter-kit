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
import { connect } from 'react-redux'

import { IListState } from '../../redux/modules/list'
import { IRootState } from '../../redux/types'
import styles from './styles'

interface IProps {
  list: IListState
}

export class PopupPage extends React.Component<
  IProps & NavigationScreenProps<any>,
  any
  > {
  static navigationOptions: NavigationParams = {
    header: null
  }

  render () {
    const { list, navigation } = this.props
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>

          <Body>
            <Title>Popup page</Title>
          </Body>

          <Right />
        </Header>

        <Content padder>
          <Text>{list.list[list.selectedIndex!]}</Text>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state: IRootState): IProps => ({
  list: state.list
})

export default connect(mapStateToProps)(PopupPage)
