import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experiences, achievements } from '../data';

export const ExperienceWindow = () => (
  <div className="p-6 grid lg:grid-cols-3 gap-6 text-sm">
    <div className="lg:col-span-2 space-y-4">
      {experiences.map((exp) => (
        <div key={`${exp.title}-${exp.period}`} className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0 mt-0.5">
            {exp.type === 'work' ? (
              <Briefcase className="w-3.5 h-3.5 text-primary" />
            ) : (
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
            )}
          </div>
          <div className="rounded-lg bg-muted/30 p-3 flex-1">
            <div className="flex flex-wrap justify-between gap-2 mb-1">
              <h4 className="text-xs font-semibold">{exp.title}</h4>
              <span className="text-[10px] text-primary">{exp.period}</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-1">{exp.organization}</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{exp.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((s) => (
                <span key={s} className="px-1.5 py-0.5 bg-background/60 rounded text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="rounded-lg bg-muted/30 p-4 h-fit">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-semibold">Certifications</h3>
      </div>
      <div className="space-y-2">
        {achievements.map((a) => (
          <div key={a.title} className="p-2 bg-background/50 rounded-md">
            <p className="text-[11px] font-medium">{a.title}</p>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{a.issuer}</span>
              <span>{a.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
