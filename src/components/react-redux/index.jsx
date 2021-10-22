import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// khai báo 2 phương thức cần thiết của redux là userSelector
import allAction from './actions/index.jsx'
// đây là cái action đã được gộp lại từ file action/index.jsx
import './reducerSelector.css'
export default function UseSelector() {

  const counter = useSelector(state => state.counterReducer)
  const currentUser = useSelector(state => state.currentUser)
  // lấy cacstate cần thiết từ store

  const dispatch = useDispatch()

  const user = { name: "Default" }

  useEffect(() => {
    dispatch(allAction.useAction.setUser(user))
    //  gọi đến phương thức setUser trong file userAction và set cho nó giá trị ban đầu
  }, [])


  return (
    <div className="useSelector">
      {
        currentUser.loggedIn ?
          <>
            <h1>Hello {currentUser.user.name}</h1>
            <button
              onClick={() => dispatch(allAction.useAction.logOut())}
            >
              Logout
            </button>
          </>
          :
          <>
            <h1>Login</h1>
            <button
              onClick={() => dispatch(allAction.useAction.setUser(user))}
            >
              Login
            </button>
          </>
      }
      <>
        <h1>
          Counter : {counter}
        </h1>
        <button
          onClick={() => dispatch(allAction.counterAction.decrement())}
        >
          -
        </button>
        <button
          onClick={() => dispatch(allAction.counterAction.increment())}
        >
          +
        </button>

      </>
    </div>
  )
}