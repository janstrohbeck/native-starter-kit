import { Container, Content, List, ListItem, Text } from 'native-base'
import * as React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { NavigationParams, NavigationScreenProps } from 'react-navigation'

const routes = ['Home', 'SecondPage']

export default class Drawer extends React.Component<
  NavigationScreenProps<any>,
  any
  > {
  static navigationOptions: NavigationParams = {
    header: null
  }

  render () {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/drawer-cover.png'
            }}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: 120,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => this.props.navigation.navigate('DrawerClose')}
            >
              <Image
                style={{ height: 80, width: 70 }}
                source={{
                  uri:
                    'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/logo.png'
                }}
              />
            </TouchableOpacity>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}
