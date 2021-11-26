import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './AddPage.css'
import { loadMyDcFB, addMyDcFB } from './redux/modules/mydc'
import { db } from './firebase'

const AddPage = (props) => {
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const word = React.useRef()
  const description = React.useRef()
  const example = React.useRef()

  React.useEffect(() => {
    dispatch(loadMyDcFB())
  }, [])

  // React.useEffect(async () => {
  //   await addDoc(collection(db, 'mydc'), { word: 'new', description: 'new', example: 'new' })
  // }, [])

  // React.useEffect(async () => {
  //   console.log(db)
  //   const docRef = doc(db, 'mydc', 'MjnoxJhh5iiIxYYchPiW')
  //   updateDoc(docRef, { word: 'react' })
  // }, [])

  const addMyDictionary = () => {
    // dispatch(createMyDc(word.current.value, description.current.value, example.current.value))
    dispatch(addMyDcFB({ word: word.current.value, description: description.current.value, example: example.current.value }))
  }
  return (
    <>
      <div className="AddPage">
        <container className="InputList">
          <box className="InputBoxs">
            <box className="InputBox">
              단어
              <input type="word" ref={word} className="AddText"></input>
            </box>
            <box className="InputBox">
              설명
              <input type="description" ref={description} className="AddText"></input>
            </box>
            <box className="InputBox">
              예시
              <input type="example" ref={example} className="AddText"></input>
            </box>
          </box>
          <button className="InputButton" onClick={addMyDictionary}>
            추가하기
          </button>
        </container>
      </div>
    </>
  )
}

export default AddPage
