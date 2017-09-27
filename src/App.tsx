import * as React from 'react'
import { StyleSheet } from 'react-native'
import codePush from 'react-native-code-push'

import { Container, Content, Text, View } from 'native-base'
import Modal from 'react-native-modalbox'
import { connect } from 'react-redux'
import ProgressBar from './components/ProgressBar'
import { IRehydrationState } from './redux/modules/rehydration'
import { IRootState } from './redux/types'
import MainStackRouter from './Routers/MainStackRouter'

import theme from './themes/base-theme'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1: {
    height: 300
  }
})

interface IProps {
  rehydration: IRehydrationState
}

interface IState {
  showDownloadingModal: boolean
  showInstalling: boolean
  downloadProgress: number
}

class App extends React.Component<IProps, IState> {
  state = {
    showDownloadingModal: false,
    showInstalling: false,
    downloadProgress: 0
  }
  _modal: Modal | null

  codePushStatusDidChange (status: number) {
    switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ showDownloadingModal: true })
        if (this._modal) this._modal.open()
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ showInstalling: true })
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        if (this._modal) this._modal.close()
        this.setState({ showDownloadingModal: false })
        break
      default:
        break
    }
  }

  codePushDownloadDidProgress (receivedBytes: number, totalBytes: number) {
    this.setState({
      ...this.state,
      downloadProgress: receivedBytes / totalBytes * 100
    })
  }

  render () {
    const { rehydration } = this.props
    if (this.state.showDownloadingModal) {
      return (
        <Container theme={theme}>
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={c => {
                this._modal = c
              }}
              swipeToClose={false}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  padding: 20
                }}
              >
                {this.state.showInstalling ? (
                  <Text
                    style={{
                      color: theme.brandPrimary,
                      textAlign: 'center',
                      marginBottom: 15,
                      fontSize: 15
                    }}
                  >
                    Installing update...
                  </Text>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      padding: 20
                    }}
                  >
                    <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 15
                      }}
                    >
                      Downloading update... {`${this.state.downloadProgress} %`}
                    </Text>
                    <ProgressBar
                      color='theme.brandPrimary'
                      progress={this.state.downloadProgress}
                    />
                  </View>
                )}
              </View>
            </Modal>
          </Content>
        </Container>
      )
    }

    if (rehydration.rehydrating) {
      return (
        <Container theme={theme}>
          <Content style={styles.container}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                padding: 20
              }}
            >
              <Text
                style={{
                  color: theme.brandPrimary,
                  textAlign: 'center',
                  marginBottom: 15,
                  fontSize: 15
                }}
              >
                Loading...
              </Text>
            </View>
          </Content>
        </Container>
      )
    }

    return <MainStackRouter />
  }
}

const mapStateToProps = (state: IRootState) => ({
  rehydration: state.rehydration
})

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: true as any,
  installMode: codePush.InstallMode.IMMEDIATE
})(connect(mapStateToProps)(App))
