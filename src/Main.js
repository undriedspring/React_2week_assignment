import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Firestore } from '@firebase/firestore'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import AddIcon from '@mui/icons-material/Add'
import NavigationIcon from '@mui/icons-material/Navigation'
import { createMyDc, loadMyDcFB, deleteMyDcFB, mydc_list, updateMyDcFB } from './redux/modules/mydc'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import './Main.css'
import { db } from './firebase'
import AddPage from './AddPage'

const Main = (props) => {
  const history = useHistory()
  const data = useSelector((state) => state.mydc.list)

  const [list, setList] = React.useState([])

  const word = React.useRef()
  const description = React.useRef()
  const example = React.useRef()
  const dispatch = useDispatch()

  const params = useParams()
  const mydc_index = params.index
  const mydc_list = useSelector((state) => state.mydc.list)

  React.useEffect(() => {
    dispatch(loadMyDcFB())
  }, []) //반복 시행을 막는 역할, 디스패치가 될 경우에만 리렌더링해라

  // const addMyDictionary = () => {
  //   dispatch(createMyDc(word.current.value, description.current.value, example.current.value))

  // }

  return (
    <>
      <div className="Layout">
        <header className="Header">
          <h1 className="Title">신조어 사전</h1>
        </header>
        <div className="App">
          <div className="Boxs">
            {data.map((data, idx) => {
              const lastWord = idx === data.length - 1
              return (
                <div className="list_item" word={data.word} description={data.description} example={data.example} ref={lastWord ? setList.unshift() : null}>
                  <div className="CardButtons">
                    <ModeOutlinedIcon
                      className="UpdateButton"
                      // onClick={() => {
                      //   dispatch(updateMyDcFB(mydc_index[idx]?.id))
                      // }}
                    ></ModeOutlinedIcon>
                    <span class="Arrow_Update">수정하기</span>
                    <BackspaceOutlinedIcon
                      className="DeleteButton"
                      onClick={() => {
                        dispatch(deleteMyDcFB(mydc_list[idx].id))
                      }}
                    ></BackspaceOutlinedIcon>
                    <p class="Arrow_Delete">삭제하기</p>
                  </div>
                  <div className="UnderLine">단어</div>
                  <div className="TextBox">{data.word}</div>
                  <div className="UnderLine">설명</div>
                  <div className="TextBox">{data.description}</div>
                  <div className="UnderLine">예시</div>
                  <div className="ExampleStyle">{data.example}</div>
                </div>
              )
            })}
          </div>
          <div className="MainButtons">
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab color="primary" aria-label="add">
                <AddIcon
                  onClick={() => {
                    history.push('/AddPage')
                  }}
                />
              </Fab>
              <Fab variant="extended">
                <NavigationIcon
                  sx={{ mr: 0 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                  }}
                />
              </Fab>
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}
export default Main
