import { Firestore } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Main.css'
import { db } from './firebase'
import AddPage from './AddPage'

const Main = (props) => {
  const history = useHistory()

  // const my_lists = props.list

  const data = useSelector((state) => state.mydc.list)

  // console.log(data[0].word)

  return (
    <div className="Main">
      <title className="Title">My dictionary</title>
      <hr className="Line" />
      <box className="Boxs">
        {my_lists.map((data, index) => {
          return <box className="Box" word={data.word} description={data.description} example={data.example} key={index}></box>
        })}
      </box>
      <button className="AddButton" onClick={() => history.push(`/addPage`)}>
        +
      </button>
    </div>
  )
}

export default Main
