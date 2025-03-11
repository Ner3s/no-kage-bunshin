import { Fragment, useState } from 'react';

import { services } from 'wailsjs/go/models';

import Checkbox from '@/components/checkbox';

import { SelectFolder, ListFiles } from '../wailsjs/go/main/App';
import AppStyles from './App.module.scss';

function App() {
  const [folderSelected, setFolder] = useState<string>('');
  const [fileList, setFileList] = useState<services.FileInfo[]>([]);

  async function onSelectDirectory() {
    try {
      const result = await SelectFolder();

      if (!result) {
        return;
      }

      setFolder(result);

      const fileList = await ListFiles(result);
      setFileList(fileList);
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

      <section>
        <div>filters</div>
        <input type="search" placeholder="Search for filename" />
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
          {fileList
            .filter((el) => !el.isDir)
            .map((data) => {
              return (
                <Fragment key={data.path}>
                  <div>
                    <Checkbox />
                  </div>
                  <div>{data.folderPath}</div>
                  <div>{data.filename}</div>
                  <div>{data.sizeHuman}</div>
                  <div>
                    <span>Edit</span>
                    <span>Delete</span>
                  </div>
                </Fragment>
              );
            })}
        </section>
      </section>
    </main>
  );
}

export default App;
