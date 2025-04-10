import { Github, Linkedin } from 'lucide-react';

type FooterProps = {
  handleOpenUrl: (url: string) => void;
};

function Footer({ handleOpenUrl }: FooterProps) {
  return (
    <footer
      data-testid="footer"
      className="fixed right-0 bottom-0 left-0 z-10 bg-white px-4 py-1 shadow-md"
    >
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Develop by @AlanNer3s</span>
          <a
            className="cursor-pointer rounded bg-blue-300 p-1"
            data-testid="linkedin"
            onClick={() => {
              handleOpenUrl('https://www.linkedin.com/in/alan-neres/');
            }}
          >
            <Linkedin color="var(--color-white)" size={14} />
          </a>
          <a
            className="cursor-pointer rounded bg-gray-600 p-1"
            data-testid="github"
            onClick={() => {
              handleOpenUrl('https://github.com/ner3s');
            }}
          >
            <Github color="var(--color-white)" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
