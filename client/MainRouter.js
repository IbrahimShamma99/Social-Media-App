import React, {Component} from 'react'
import Routes from './Routes';

class MainRouter extends Component {
  //NOTE Removes the server-side injected CSS when React component mounts
  // componentDidMount() {
  //   const jssStyles = document.getElementById('jss-server-side')
  //   if (jssStyles && jssStyles.parentNode) {
  //     jssStyles.parentNode.removeChild(jssStyles)
  //   }
  // };
  render() {
    return (
      <Routes/>
    )
  }
}

export default MainRouter
