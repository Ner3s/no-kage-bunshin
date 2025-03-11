import { useState } from 'react';

import Checkbox from '@/components/checkbox';

import { SelectFolder } from '../wailsjs/go/main/App';
import AppStyles from './App.module.scss';
interface IFormData {
  path: string;
}

function App() {
  const [resultText, setResultText] = useState<string[]>([]);

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
  }

  async function onSelectDirectory() {
    try {
      const result = await SelectFolder();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={AppStyles.app}>
      <section className={AppStyles.header}>
        <div>
          <h1>No Kage Bunshin</h1>
          <span>Find the fakes, keep the original — Dattebayo! 🌀🔥</span>
        </div>

        <button onClick={onSelectDirectory} type="button">
          Select Directory
        </button>
      </section>

      <section className={AppStyles.table}>
        <section className={AppStyles.tableHeader}>
          <div></div>
          <div>Folder</div>
          <div>Filename</div>
          <div>Size</div>
          <div>Actions</div>
        </section>
        <section className={AppStyles.tableContainer}>
          <div>
            <input type="checkbox" name="checkbox" />
          </div>
          <div>Document</div>
          <div>
            <Checkbox label={'teste'} />
          </div>
          <div>2 mb</div>
          <div>
            <span>Edit</span>
            <span>Delete</span>
          </div>
        </section>
      </section>

      <div id="result" className={AppStyles.result}>
        {resultText.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </main>
  );
}

export default App;
