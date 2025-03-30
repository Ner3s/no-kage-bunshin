import React from 'react';

import {
  Copy,
  File,
  FileType,
  FileText,
  Music,
  Image,
  Video,
  FileX,
  CheckSquare,
  Folder
} from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

export const Clones = () => {
  // const getFileIcon = (filename: string) => {
  //   const ext = filename.split('.').pop()?.toLowerCase() || '';
  //   if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
  //     return <Image size={18} className="text-blue-500" />;
  //   } else if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) {
  //     return <Music size={18} className="text-purple-500" />;
  //   } else if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) {
  //     return <Video size={18} className="text-red-500" />;
  //   } else if (['doc', 'docx', 'txt', 'pdf', 'rtf'].includes(ext)) {
  //     return <FileText size={18} className="text-yellow-500" />;
  //   } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
  //     return <File size={18} className="text-green-500" />;
  //   } else {
  //     return <File size={18} className="text-gray-500" />;
  //   }
  // };

  return (
    <section>
      <Checkbox shape="circle" />
    </section>
  );
};
