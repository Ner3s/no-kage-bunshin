import { FileText, Image, Music, Video, FileArchive } from 'lucide-react';

export interface FileIcon {
  Component: React.ElementType;
  color: string;
}

export const COLORS = {
  BLUE: 'var(--color-blue-500)',
  PURPLE: 'var(--color-purple-500)',
  RED: 'var(--color-red-500)',
  YELLOW: 'var(--color-yellow-500)',
  GREEN: 'var(--color-green-500)',
  GRAY: 'var(--color-gray-500)'
};

export const FileIconMap: Record<string, FileIcon> = {
  // Imagens
  '.jpg': { Component: Image, color: COLORS.BLUE },
  '.jpeg': { Component: Image, color: COLORS.BLUE },
  '.png': { Component: Image, color: COLORS.BLUE },
  '.gif': { Component: Image, color: COLORS.BLUE },
  '.svg': { Component: Image, color: COLORS.BLUE },
  '.webp': { Component: Image, color: COLORS.BLUE },

  // Áudios
  '.mp3': { Component: Music, color: COLORS.PURPLE },
  '.wav': { Component: Music, color: COLORS.PURPLE },
  '.ogg': { Component: Music, color: COLORS.PURPLE },
  '.flac': { Component: Music, color: COLORS.PURPLE },

  // Vídeos
  '.mp4': { Component: Video, color: COLORS.RED },
  '.avi': { Component: Video, color: COLORS.RED },
  '.mov': { Component: Video, color: COLORS.RED },
  '.mkv': { Component: Video, color: COLORS.RED },

  // Documentos
  '.doc': { Component: FileText, color: COLORS.YELLOW },
  '.docx': { Component: FileText, color: COLORS.YELLOW },
  '.txt': { Component: FileText, color: COLORS.YELLOW },
  '.pdf': { Component: FileText, color: COLORS.YELLOW },
  '.rtf': { Component: FileText, color: COLORS.YELLOW },

  // Arquivos compactados
  '.zip': { Component: FileArchive, color: COLORS.GREEN },
  '.rar': { Component: FileArchive, color: COLORS.GREEN },
  '.7z': { Component: FileArchive, color: COLORS.GREEN },
  '.tar': { Component: FileArchive, color: COLORS.GREEN },
  '.gz': { Component: FileArchive, color: COLORS.GREEN }
};
