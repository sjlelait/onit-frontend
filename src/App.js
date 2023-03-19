import { auth } from './firebase';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';


function App() {
  // FB - Set user state. Better in app.js because it can be shared between multiple pages/components.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // think of this as an event listener
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    // the "event" is when a user logs in or logs out with Google firebase
    return () => {
      // this function get's called before each subsequent render cycle
      unsubscribe(); // this will clear the onAuthStateChanged listener from browser memory
    };
  }, []);

  return (
    <div className='App'>
      <Header user={user} />
      <Main user={user} />
    </div>
  );
}

export default App;
