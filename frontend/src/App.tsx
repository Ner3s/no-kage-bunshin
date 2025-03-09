import { useState } from 'react';

import { ListDirectories } from '../wailsjs/go/main/App';
import AppStyles from './App.module.scss';
interface IFormData {
  path: string;
}

function App() {
  const [resultText, setResultText] = useState<string[]>([]);

  function getPath(path: string) {
    return ListDirectories(path);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataJson = Object.fromEntries(formData.entries());

    const result: IFormData = {
      path: (dataJson.path as string) ?? ''
    };

    if (!result.path) {
      alert('O campo de texto não pode estar vazio');
      return;
    }

    getPath(result.path)
      .then((resultDir) => {
        console.log([...resultDir]);
        setResultText([...resultDir]);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className={AppStyles.app}>
      <div id="result" className={AppStyles.result}>
        {resultText.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="path"
          className={AppStyles.input}
          autoComplete="off"
          name="path"
          type="text"
        />
        <button className={AppStyles.btn}>List Directories</button>
      </form>
    </div>
  );
}

export default App;
