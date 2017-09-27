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
import { TouchableOpacity } from 'react-native'
import { Row } from 'react-native-responsive-grid'
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProps
} from 'react-navigation'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { logoutRoutine } from '../../redux/modules/auth'
import { ActionCreators as ListActionCreators } from '../../redux/modules/list'
import { IRootState } from '../../redux/types'
import styles from './styles'

interface IStateProps {
  list: string[]
}

interface IDispatchProps {
  openDrawer: () => void
  setIndex: (index: number) => void
  goBack: () => void
  logout: () => void
}

class Home extends React.Component<
  IStateProps & IDispatchProps & NavigationScreenProps<any>,
  any
  > {
  static navigationOptions: NavigationParams = {
    header: null
  }

  render () {
    const { navigation, openDrawer, logout, list, setIndex } = this.props
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => logout()}>
              <Icon active name='power' />
            </Button>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button transparent onPress={openDrawer}>
              <Icon active name='menu' />
            </Button>
          </Right>
        </Header>
        <Content style={styles.mt}>
          {list.map((item, i) => (
            <Row key={i}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  setIndex(i)
                  navigation.navigate('PopupPage')
                }}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            </Row>
          ))}
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  setIndex: (index: number) =>
    dispatch(ListActionCreators.setIndex.create(index)),
  openDrawer: () =>
    dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
  goBack: () => dispatch(NavigationActions.back()),
  logout: () => dispatch(logoutRoutine())
})

const mapStateToProps = (state: IRootState): IStateProps => ({
  list: state.list.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
