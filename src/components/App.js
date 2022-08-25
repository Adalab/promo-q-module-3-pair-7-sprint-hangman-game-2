import { useEffect, useState } from 'react';

// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Dummy.scss';
import '../styles/Header.scss';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import {Route, Routes} from 'react-router-dom';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';


function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events
  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  const updateWord = (value) => {
    setWord(value);
  }


  return (
  <div className='page'>
     <Header/>
      <main className='main'>
      <Routes>
        <Route path="/instructions" element={<Instructions/>}/>
        <Route path="/" element={<main className='main'>
        <section>
          <SolutionLetters word={word} userLetters={userLetters}/>
          <ErrorLetters word={word} userLetters={userLetters} />

          <Form  lastLetter={lastLetter} handleLastLetter={handleLastLetter}/>
          {/*handleSubmit={handleSubmit} lastLetter={lastLetter} handleKeyDown={handleKeyDown}  */}
        </section>
       </main>}/>
        <Route path="/options" element={<Options
          updateWord={updateWord} word={word}
          />}/>
      </Routes>
        <Dummy errors= {getNumberOfErrors()}/>

      </main>
      
     
      
      <Footer updateWord={updateWord}/>

    </div>
  );
}

export default App;