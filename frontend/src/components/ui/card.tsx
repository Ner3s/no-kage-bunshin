import { CheckSquare } from 'lucide-react';

import { entities } from '../../../wailsjs/go/models';
import { Checkbox } from './checkbox';
import { CheckboxCustom } from './checkbox-custom';

import { getFileIcon } from '@/utils/helpers/get-file-icon';

type CardProps = {
  original: entities.FileInfo;
  duplicate: entities.FileInfo[];
  callbackClones?: (clones: entities.DuplicateFile) => void;
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
    } as entities.DuplicateFile);
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
    } as entities.DuplicateFile);
  };

  return (
    <section className="flex flex-col">
      <section className="drop-shadow-lg">
        <div className="flex justify-between rounded-l-2xl rounded-r-2xl rounded-b-none bg-orange-50 p-4">
          <h4 className="flex items-center text-lg font-bold">
            <Icon.Component color={Icon.color} />
            <span className="ml-2">
              {original?.filename} (
              {duplicate.length > 1
                ? duplicate.length + ' Copies'
                : duplicate.length + ' Copy'}
            </span>
            )
          </h4>
          <div>
            <CheckboxCustom
              checked={duplicate.every((clone) => clone.selected)}
              onChange={(e) => handleSelectAll(e.target.checked)}
            >
              <span className="flex text-sm font-bold">
                <CheckSquare size={16} className="mr-1" />
                Select All
              </span>
            </CheckboxCustom>
            {/* <Checkbox
            checked={duplicate.every((file) => file)}
            /> */}
          </div>
        </div>
        <div className="flex flex-col rounded-br-2xl rounded-bl-2xl bg-white">
          {duplicate.map((file, index) => (
            <div key={index} className="flex flex-col p-4">
              <div className="flex">
                <Checkbox
                  shape="circle"
                  checked={file.selected}
                  onChange={() => {
                    handleSelect(index);
                  }}
                />
                <div className="ml-2 flex w-full justify-between">
                  <span className="font-bold">{file.filename}</span>
                  <span>{file.humanSize}</span>
                </div>
              </div>
              <span>{file.path}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export { Card };
