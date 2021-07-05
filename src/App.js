import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'


function App() {
const { auth } = useSelector(state => {
  console.log(state)
  return state
})

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
  const { firebase, auth } = useSelector(state => state)

  const sigInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={sigInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  const { auth } = useSelector(state => state)

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const { firebase, firestore, auth } = useSelector(state => state)


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
const { auth } = useSelector(state => state)

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
