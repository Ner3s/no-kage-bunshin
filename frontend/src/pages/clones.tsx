import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Card } from '@/components/ui/card';

import { usecases } from '../../wailsjs/go/models';

import { useFile } from '@/context/use-file';
import { RoutePaths } from '@/utils/constants/route-paths';

export const Clones = () => {
  const { fileList, setFileList, setSelectedClonesToRemove } = useFile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fileList?.clones) navigate(RoutePaths.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <section className="flex min-w-[800px] flex-col gap-4 p-4 pb-8">
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
              } as usecases.CloneResult);
            }}
          />
        ))}
      </section>
    </section>
  );
};
