import React from 'react'
import {Alert} from 'react-bootstrap'


const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  // const style = {
  //   color: notification.type === 'success' ? 'green' : 'red',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // }
  const style = notification.type === 'success' ? 'success' : 'danger'

  return <Alert variant={style}>{notification.message}</Alert>
}

export default Notification
