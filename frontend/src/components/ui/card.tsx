import { models } from '../../../wailsjs/go/models';
import { Checkbox } from './checkbox';

import { getFileIcon } from '@/utils/helpers/get-file-icon';

type CardProps = {
  original: models.FileInfo;
  duplicate: models.FileInfo[];
  callbackClones?: (clones: models.DuplicateFile) => void;
  hash: string;
};

function Card({ original, duplicate, callbackClones, hash }: CardProps) {
  const Icon = getFileIcon(original.fileExtension);

  const handleSelectAll = (checkAll: boolean) => {
    const newClones = duplicate.map((clone) => ({
      ...clone,
      selected: checkAll
    }));
    callbackClones?.({
      duplicates: newClones,
      hash,
      original
    } as models.DuplicateFile);
  };

  const handleSelect = (index: number) => {
    const newClones = duplicate.map((clone, i) => ({
      ...clone,
      selected: i === index ? !clone.selected : clone.selected
    }));
    callbackClones?.({
      duplicates: newClones,
      hash,
      original
    } as models.DuplicateFile);
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-between">
        <h4 className="text-lg font-bold">
          <Icon.Component color={Icon.color} /> {original?.filename} (
          {duplicate.length > 1
            ? duplicate.length + ' Copies'
            : duplicate.length + ' Copy'}
          )
        </h4>
        <div>
          <Checkbox
            checked={duplicate.every((clone) => clone.selected)}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          {/* <Checkbox
            checked={duplicate.every((file) => file)}
          /> */}
        </div>
      </div>
      <div>
        {duplicate.map((file, index) => (
          <div key={index} className="flex flex-col">
            <Checkbox
              checked={file.selected}
              onChange={() => {
                handleSelect(index);
              }}
            />
            <span>{file.filename}</span>
            <span>{file.humanSize}</span>
            <span>{file.path}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export { Card };
