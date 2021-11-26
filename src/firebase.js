import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCQ2lFCExk1QuRoMYNk4ST6zB3Ec_35JiI',
  authDomain: 'react-basic-f0739.firebaseapp.com',
  projectId: 'react-basic-f0739',
  storageBucket: 'react-basic-f0739.appspot.com',
  messagingSenderId: '1022271818505',
  appId: '1:1022271818505:web:cd76eaed6e39f7d41561d8',
  measurementId: 'G-T38Q5G5261',
}

initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig)

export const db = getFirestore()
