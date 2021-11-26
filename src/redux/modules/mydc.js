import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

// Actions
const LOAD = 'mydc/LOAD'
const CREATE = 'mydc/CREATE'
const UPDATE = 'mydc/UPDATE'
const DELETE = 'mydc/DELETE'
const LOADING = 'mydc/LOADING'

const initialState = {
  list: [],
  is_loaded: false,
}

// Action Creators
export function loadMyDc(mydc_list) {
  return { type: LOAD, mydc_list }
}

export function createMyDc(mydc) {
  return { type: CREATE, mydc }
}

export function updateMyDc(mydc) {
  return { type: UPDATE, mydc }
}

export function deleteMyDc(mydc_index) {
  return { type: DELETE, mydc_index }
}

export function isLoeaded(loading) {
  return { type: LOADING, loading }
}

// Middlewares
export const loadMyDcFB = () => {
  return async function (dispatch) {
    const mydc_data = await getDocs(collection(db, 'mydc'))

    let mydc_list = []

    mydc_data.forEach((doc) => {
      mydc_list.push({ id: doc.id, ...doc.data() })
    })
    dispatch(loadMyDc(mydc_list))
  }
}

export const addMyDcFB = (mydc) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, 'mydc'), mydc)
    // const _mydc = await getDoc(docRef)
    // const mydc_data = { ...mydc, id: docRef.id } //수정, 삭제 시에 id값을 확인하기 위해서 미리 id값을 리덕스에 저장한다
    // {id: docRef.id, ...mydc}
    // console.log(mydc_data)
    // dispatch(createMyDc(mydc_data)) //{ id: _mydc.id, ..._mydc.data() } or {id: docRef.id, ...mydc}
  }
}

// export const updateMyDcFB = (mydc, id) => {
//   return function (dispatch) {
//     const docRef = doc(db, 'mydc', mydc_id)
//     await updateDoc(docRef, mydc_id)

//     const _mydc_list = getState().mydc.list
//     const mydc_index = _mydc_list.findIndex((b) => {
//       return b.id === mydc_id
//     })
//     dispatch(updateMyDc(mydc_index))
//   }
// }

export const deleteMyDcFB = (mydc_id) => {
  return async function (dispatch, getState) {
    if (!mydc_id) {
      window.alert('아이디가 없네요!')
      return
    }
    const docRef = doc(db, 'mydc', mydc_id)
    await deleteDoc(docRef)

    const _mydc_list = getState().mydc.list
    const mydc_index = _mydc_list.findIndex((b) => {
      return b.id === mydc_id
    })

    dispatch(deleteMyDc(mydc_index))
  }
}

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'mydc/LOAD': {
      return { ...state, list: action.mydc_list }
    }
    case 'mydc/CREATE': {
      const new_mydc_list = [...state.list, action.mydc]
      return { ...state, list: new_mydc_list }
    }
    // case 'mydc/UPDATE': {
    //   const new_mydc_list = state.list.map((mydc) => {
    //     mydc.id === action.mydc.id ? { ...mydc, ...action.mydc } : mydc
    //   })

    //   return { ...state, list: new_mydc_list }
    // }
    case 'mydc/DELETE': {
      const new_mydc_list = state.list.filter((l, idx) => {
        return parseInt(action.mydc_index) !== idx
      })

      return { ...state, list: new_mydc_list }
    }

    case 'mydc/LOADING': {
      return { ...state, is_loaded: action.loading }
    }
    // do reducer stuff
    default:
      return state
  }
}
