import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export interface AppDef {
  id: string;
  title: string;
  icon: LucideIcon;
  component: ComponentType;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
}

export interface ExternalApp {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
}

export interface OpenWindow {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  prevRect: { x: number; y: number; width: number; height: number } | null;
}
