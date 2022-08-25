import { useState } from 'react';

const Options = (props) => {

    const [userWord, setUserWord] = useState('');
    
    const hadleInput = (ev) => {
      setUserWord(ev.target.value);
      props.updateWord(ev.target.value);
    }

    return <form>
    <label class="title" for="word">
      Escribe aquí la palabra que hay que adivinar:
    </label>
    <input
      autofocus
      autocomplete="off"
      class="form__input"
      maxlength="15"
      type="text"
      id="word"
      name="word"
      value={userWord}
      onChange={hadleInput}
    />
  </form>
};



export default Options;