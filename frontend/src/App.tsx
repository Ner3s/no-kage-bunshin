import { useState } from 'react';

import { Greet } from '../wailsjs/go/main/App';
import AppStyles from './App.module.scss';
import logo from './assets/images/logo-universal.png';

function App() {
  const [resultText, setResultText] = useState(
    'Please enter your name below 👇'
  );
  const [name, setName] = useState('');
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  return (
    <div className={AppStyles.app}>
      <img src={logo} className={AppStyles.logo} alt="logo" />
      <div id="result" className={AppStyles.result}>
        {resultText}
      </div>
      <div id="input" className={AppStyles['input-box']}>
        <input
          id="name"
          className={AppStyles.input}
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className={AppStyles.btn} onClick={greet}>
          Greet
        </button>
      </div>
    </div>
  );
}

export default App;
