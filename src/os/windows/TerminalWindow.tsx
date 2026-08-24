import { useEffect, useRef, useState } from 'react';
import { projects, skillCategories, experiences, contactInfo } from '../data';

type Line = { type: 'input' | 'output'; text: string };

const PROMPT = 'harshal@portfolio ~ %';

const buildHelp = () => [
  'Available commands:',
  '  help        Show this list',
  '  whoami      About Harshal',
  '  about       Short bio',
  '  skills      List skills',
  '  projects    List projects',
  '  experience  Work & education',
  '  contact     Contact info',
  '  resume      Where to find the resume',
  '  date        Current date & time',
  '  echo <text> Print text back',
  '  clear       Clear the terminal',
];

function runCommand(raw: string): string[] {
  const cmd = raw.trim();
  const [name, ...rest] = cmd.split(' ');

  switch (name.toLowerCase()) {
    case '':
      return [];
    case 'help':
      return buildHelp();
    case 'whoami':
      return ['harshal', 'Full-Stack Developer · ML Enthusiast · Walchand Institute of Technology'];
    case 'about':
      return [
        'CS Engineering student (GPA 9.65) focused on Full-Stack Development and',
        'Machine Learning. Ships real projects, chases hackathons, drinks too much coffee.',
      ];
    case 'skills':
      return skillCategories.flatMap((c) => [
        `${c.title}:`,
        ...c.skills.map((s) => `  - ${s.name} (${s.level}%)`),
      ]);
    case 'projects':
      return projects.map((p) => `${p.id}. ${p.title} — ${p.tags.join(', ')}`);
    case 'experience':
      return experiences.map((e) => `${e.period}  ${e.title} @ ${e.organization}`);
    case 'contact':
      return contactInfo.map((c) => `${c.label}: ${c.value}`);
    case 'resume':
      return ["Open the 'Resume.pdf' app from the Dock to view it right here."];
    case 'date':
      return [new Date().toString()];
    case 'echo':
      return [rest.join(' ')];
    case 'sudo':
      return ["Nice try. This isn't that kind of portfolio."];
    default:
      return [`command not found: ${name} (try 'help')`];
  }
}

export const TerminalWindow = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: "Welcome! Type 'help' to see what's available." },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input;
    setInput('');

    if (value.trim().toLowerCase() === 'clear') {
      setLines([]);
      return;
    }

    const output = runCommand(value);
    setLines((prev) => [
      ...prev,
      { type: 'input', text: value },
      ...output.map((text) => ({ type: 'output' as const, text })),
    ]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#0b0e14] text-[#8be9c1] font-mono text-xs p-3 overflow-y-auto cursor-text"
    >
      {lines.map((line, i) => (
        <div key={i} className={line.type === 'input' ? 'text-white' : 'text-[#8be9c1]/90'}>
          {line.type === 'input' ? (
            <span>
              <span className="text-[#67e8f9]">{PROMPT}</span> {line.text}
            </span>
          ) : (
            <span className="whitespace-pre-wrap">{line.text}</span>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
        <span className="text-[#67e8f9] shrink-0">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          className="flex-1 bg-transparent outline-none text-white"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
