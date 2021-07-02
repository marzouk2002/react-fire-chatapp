import React, { useRef, useState } from 'react'
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyB584UiluEGaiuxIOkbS72rpod-Cd2enzY",
  authDomain: "react-chat-app-1136f.firebaseapp.com",
  projectId: "react-chat-app-1136f",
  storageBucket: "react-chat-app-1136f.appspot.com",
  messagingSenderId: "1039014190091",
  appId: "1:1039014190091:web:34303796ed52c304923b0e",
  measurementId: "G-NXMQS34RWX"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth) 
  return (
    <div className="App">
      <header>

      </header>
      <main>
        { user ? <ChatRoom /> : <SignIn /> }
      </main>
    </div>
  );
}

function SignIn() {

  const sigInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={sigInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  const [ formState, setFormState ] = useState('')

  const sendMsg = async (e) => {
    e.preventDefault()

    const { uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formState,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormState('')

    dum.current.scrollIntoView({ behavior: 'smooth' })
  }

  const dum = useRef()

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id}  message={msg}/>)}
        <div ref={dum}></div>
      </div>
      <form onSubmit={sendMsg}>
        <input type="text" value={formState} onChange={(e)=>setFormState(e.target.value)}/>
        <button type="submit">send</button>
      </form>
    </>
  )
}

function ChatMessage({message}) {
  const { text, uid, photoURL } = message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt=""/>
      <p>{text}</p>
    </div>
    )
}

export default App;
