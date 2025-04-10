import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  FileArchive,
  File,
  FileAudio,
  FileType,
  FileImage,
  Gamepad2
} from 'lucide-react';

import { BaseView, BaseViewProps } from '@/components/containers/base-view';
import { ProgressBar } from '@/components/ui/progress-bar';

export type LoadingTemplate = Pick<BaseViewProps, 'title' | 'subtitle'> & {
  isLoading: boolean;
  goTo?: string;
};

const icons = [FileArchive, File, FileAudio, Gamepad2, FileType, FileImage];

function Loading({ isLoading, goTo = '', title, subtitle }: LoadingTemplate) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const navigate = useNavigate();
  const CurrentIcon = icons[currentIconIndex];

  // handle navigation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && goTo) {
        navigate(goTo);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [goTo, isLoading, navigate]);

  // handle icon change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => {
        const result = (prevIndex + 1) % icons.length;
        return result;
      });
    }, 1000); // Change icon every 1 second
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseView
      title={title}
      subtitle={subtitle}
      text="normal"
      Icon={<CurrentIcon size={32} color="var(--color-orange-400)" />}
    >
      <div className="w-96">
        <ProgressBar />
      </div>
    </BaseView>
  );
}

export { Loading };
