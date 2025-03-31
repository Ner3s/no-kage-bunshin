import { Card } from '@/components/ui/card';

import { services } from '../../wailsjs/go/models';

import { useFile } from '@/context/use-file';

export const Clones = () => {
  const { fileList, setFileList, setSelectedClonesToRemove } = useFile();

  return (
    <section>
      {fileList?.clones?.map((file) => (
        <Card
          key={file.hash}
          original={file.original}
          duplicate={file.duplicates}
          hash={file.hash}
          callbackClones={(clones) => {
            const newClones = fileList?.clones?.map((item) => {
              if (item.hash === clones.hash) {
                return clones;
              }
              return item;
            });

            setSelectedClonesToRemove(
              newClones
                ?.flatMap((item) => item.duplicates)
                .filter((item) => item.selected)
                .map((item) => item.path) || []
            );

            setFileList({
              ...fileList,
              clones: newClones
            } as services.CloneResult);
          }}
        />
      ))}
    </section>
  );
};
