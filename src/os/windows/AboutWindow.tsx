import { Code2, Coffee, Rocket, Heart } from 'lucide-react';

const stats = [
  { icon: Code2, value: '10+', label: 'Projects Built' },
  { icon: Coffee, value: '100+', label: 'DS & Algos Solved' },
  { icon: Rocket, value: '3+', label: 'Years Coding' },
  { icon: Heart, value: '3+', label: 'Certifications' },
];

export const AboutWindow = () => (
  <div className="p-6 space-y-5">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground shrink-0">
        HK
      </div>
      <div>
        <h2 className="text-lg font-semibold">Harshal Kala</h2>
        <p className="text-sm text-muted-foreground">Full-Stack Developer · ML Enthusiast</p>
      </div>
    </div>

    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
      <p>
        I'm a Computer Science Engineering student at Walchand Institute of Technology with a strong
        passion for Full-Stack Development and Machine Learning. With a GPA of 9.65, I combine
        academic excellence with hands-on project experience.
      </p>
      <p>
        My journey includes shipping real-world projects like an AI-powered cleanliness monitor and a
        civic issue reporting system, plus professional experience as a Software Development Intern
        building financial dashboards.
      </p>
      <p>
        When I'm not coding, I'm exploring Generative AI, solving algorithmic problems, or joining
        hackathons.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="rounded-lg bg-muted/50 p-3 text-center">
          <Icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
          <p className="text-base font-semibold gradient-text">{value}</p>
          <p className="text-[10px] text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  </div>
);
