import { skillCategories, technologies } from '../data';

function proficiencyLabel(level: number) {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 65) return 'Intermediate+';
  return 'Intermediate';
}

export const SkillsWindow = () => (
  <div className="p-6 space-y-6 text-sm">
    <p className="text-[11px] text-muted-foreground -mt-1">Self-assessed proficiency</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skillCategories.map((cat) => (
        <div key={cat.title} className="rounded-lg bg-muted/30 p-4">
          <h3 className="text-xs font-semibold gradient-text mb-3">{cat.title}</h3>
          <div className="space-y-3">
            {cat.skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{proficiencyLabel(s.level)}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Technologies</p>
      <div className="flex flex-wrap gap-1.5">
        {technologies.map((t) => (
          <span key={t} className="px-2 py-1 bg-muted rounded-full text-[11px]">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);
