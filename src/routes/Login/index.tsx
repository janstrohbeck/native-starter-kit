import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Spinner,
  Text,
  View
} from 'native-base'
import * as React from 'react'
import { Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import {
  Field,
  InjectedFormProps,
  reduxForm,
  WrappedFieldProps
} from 'redux-form'
import { bindRoutineToReduxForm } from 'redux-saga-routines'
import { loginRoutine } from '../../redux/modules/auth'
import styles from './styles'

const background = require('../../../images/shadow.png')

const validate = (values: any) => {
  const error: any = {}
  error.email = ''
  error.password = ''
  let ema = values.email
  let pw = values.password
  if (values.email === undefined) {
    ema = ''
  }
  if (values.password === undefined) {
    pw = ''
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short'
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included'
  }
  if (pw.length > 12) {
    error.password = 'max 11 characters'
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = 'Weak'
  }
  return error
}

const renderInput = ({ input, meta }: WrappedFieldProps & { name: string }) => (
  <Item error={meta.error !== undefined}>
    <Icon active name={input.name === 'email' ? 'person' : 'unlock'} />
    <Input
      placeholder={input.name === 'email' ? 'EMAIL' : 'PASSWORD'}
      {...input as any}
    />
    {meta.error && (
      <Item>
        <Icon active style={{ color: 'red', marginTop: 5 }} name='bug' />
        <Text style={{ fontSize: 15, color: 'red' }}>{meta.error}</Text>
      </Item>
    )}
  </Item>
)

const Login = ({
  navigation,
  handleSubmit,
  submitting,
  invalid,
  pristine
}: NavigationScreenProps<any> & InjectedFormProps) => (
  <Container>
    <View style={styles.container}>
      <Content>
        <Image source={background} style={styles.shadow}>
          <View style={styles.bg}>
            <Field name='email' component={renderInput} />
            <Field name='password' component={renderInput} />
            {!submitting && (
              <Button
                style={styles.btn}
                disabled={invalid || pristine}
                onPress={evt => handleSubmit(evt as any)}
              >
                <Text>Login</Text>
              </Button>
            )}
            {submitting && <Spinner color='green' />}
          </View>
        </Image>
      </Content>
    </View>
  </Container>
)

const LoginScreen = reduxForm({
  form: 'test',
  validate,
  onSubmit: bindRoutineToReduxForm(loginRoutine)
})(Login)
;(LoginScreen as any).navigationOptions = {
  header: null
}
export default LoginScreen
