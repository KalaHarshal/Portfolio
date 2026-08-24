import { User, FolderKanban, Activity, History, Mail, FileText, Github, Linkedin, Trash2, Terminal } from 'lucide-react';
import type { AppDef, ExternalApp } from './types';
import { AboutWindow } from './windows/AboutWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { SkillsWindow } from './windows/SkillsWindow';
import { ExperienceWindow } from './windows/ExperienceWindow';
import { ContactWindow } from './windows/ContactWindow';
import { ResumeWindow } from './windows/ResumeWindow';
import { TrashWindow } from './windows/TrashWindow';
import { TerminalWindow } from './windows/TerminalWindow';

export const apps: AppDef[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    component: AboutWindow,
    defaultSize: { width: 480, height: 420 },
    minSize: { width: 340, height: 320 },
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

export const dockApps: AppDef[] = [...apps, terminalApp, trashApp];
export const desktopApps: AppDef[] = apps;

export const externalLinks: ExternalApp[] = [
  { id: 'github', title: 'GitHub', icon: Github, href: 'https://github.com/kalaharshal' },
  { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/harshal-kala' },
];
