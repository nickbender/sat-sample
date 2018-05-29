import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Meditations from './Meditations'
import registerServiceWorker from './registerServiceWorker'

const Root = () => {
  return <Meditations />
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
