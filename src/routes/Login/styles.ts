import { Dimensions, StyleSheet } from 'react-native'
const deviceHeight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA'
  },
  shadow: {
    flex: 1
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0
  },
  input: {
    marginBottom: 20
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center'
  }
})