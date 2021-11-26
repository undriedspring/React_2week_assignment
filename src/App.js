import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import Main from './Main'
import AddPage from './AddPage'

function App() {
  let history = useHistory()
  const is_loaded = useSelector((state) => state.mydc.loadMyDc)

  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/AddPage" component={AddPage} />
      </Switch>

      {/* {!is_loaded && window.alert('데이터를 불러왔습니다')} */}
    </>
  )
}

export default App
