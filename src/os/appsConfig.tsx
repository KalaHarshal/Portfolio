import { User, FolderKanban, Activity, History, Mail, FileText, Github, Linkedin, Trash2, Terminal, Settings } from 'lucide-react';
import type { AppDef, ExternalApp } from './types';
import { AboutWindow } from './windows/AboutWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { SkillsWindow } from './windows/SkillsWindow';
import { ExperienceWindow } from './windows/ExperienceWindow';
import { ContactWindow } from './windows/ContactWindow';
import { ResumeWindow } from './windows/ResumeWindow';
import { TrashWindow } from './windows/TrashWindow';
import { TerminalWindow } from './windows/TerminalWindow';
import { SystemPreferencesWindow } from './windows/SystemPreferencesWindow';

export const apps: AppDef[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    component: AboutWindow,
    defaultSize: { width: 640, height: 460 },
    minSize: { width: 420, height: 360 },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderKanban,
    component: ProjectsWindow,
    defaultSize: { width: 700, height: 480 },
    minSize: { width: 420, height: 340 },
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: Activity,
    component: SkillsWindow,
    defaultSize: { width: 560, height: 460 },
    minSize: { width: 360, height: 340 },
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: History,
    component: ExperienceWindow,
    defaultSize: { width: 640, height: 480 },
    minSize: { width: 400, height: 360 },
  },
  {
    id: 'contact',
    title: 'Mail',
    icon: Mail,
    component: ContactWindow,
    defaultSize: { width: 560, height: 420 },
    minSize: { width: 400, height: 360 },
  },
  {
    id: 'resume',
    title: 'Resume.pdf',
    icon: FileText,
    component: ResumeWindow,
    defaultSize: { width: 560, height: 580 },
    minSize: { width: 360, height: 400 },
  },
];

export const trashApp: AppDef = {
  id: 'trash',
  title: 'Trash',
  icon: Trash2,
  component: TrashWindow,
  defaultSize: { width: 360, height: 260 },
  minSize: { width: 280, height: 200 },
};

export const terminalApp: AppDef = {
  id: 'terminal',
  title: 'Terminal',
  icon: Terminal,
  component: TerminalWindow,
  defaultSize: { width: 560, height: 400 },
  minSize: { width: 360, height: 280 },
};

export const systemPrefsApp: AppDef = {
  id: 'system-prefs',
  title: 'System Preferences',
  icon: Settings,
  component: SystemPreferencesWindow,
  defaultSize: { width: 420, height: 560 },
  minSize: { width: 360, height: 480 },
};

// Dock shows everything — content apps plus system utilities — like a real macOS Dock.
export const dockApps: AppDef[] = [...apps, terminalApp, systemPrefsApp, trashApp];

// Desktop icons are shortcuts to content only; Mail/Terminal/Preferences/Trash
// live in the dock so the two navigation surfaces don't duplicate each other.
export const desktopApps: AppDef[] = apps.filter((a) => a.id !== 'contact');

export const externalLinks: ExternalApp[] = [
  { id: 'github', title: 'GitHub', icon: Github, href: 'https://github.com/kalaharshal' },
  { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/harshal-kala' },
];

// Each app gets its own colored tile, the way real macOS apps do (Mail is blue,
// Terminal is charcoal, Finder is blue/orange, Trash is silver, etc.) instead of
// every icon sharing one flat neutral gradient.
export const appIconColors: Record<string, string> = {
  about: 'from-blue-400 to-indigo-600',
  projects: 'from-amber-400 to-orange-600',
  skills: 'from-fuchsia-400 to-purple-600',
  experience: 'from-rose-400 to-red-600',
  contact: 'from-sky-400 to-blue-600',
  resume: 'from-red-400 to-rose-600',
  terminal: 'from-zinc-700 to-zinc-900',
  'system-prefs': 'from-slate-400 to-slate-600',
  trash: 'from-slate-300 to-slate-500',
  github: 'from-zinc-700 to-zinc-950',
  linkedin: 'from-sky-500 to-blue-700',
};
