import ios from './ProgressBar.ios'
import android from './ProgressBar.android'

// This is to ensure that the interfaces are the same
declare var _test: typeof ios
declare var _test: typeof android

export default ios
