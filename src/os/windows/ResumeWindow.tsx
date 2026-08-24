import { Download } from 'lucide-react';

export const ResumeWindow = () => (
  <div className="flex flex-col h-full">
    <div className="flex justify-end p-2 border-b border-border/40 shrink-0">
      <a
        href="/resume.pdf"
        download
        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted transition-colors"
      >
        <Download className="w-3.5 h-3.5" /> Download
      </a>
    </div>
    <iframe src="/resume.pdf" title="Resume" className="flex-1 w-full bg-white" />
  </div>
);
