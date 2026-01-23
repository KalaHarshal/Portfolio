import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Coffee, Rocket, Heart } from 'lucide-react';

const stats = [
  { icon: Code2, value: '10+', label: 'Projects Built' },
  { icon: Coffee, value: '100+', label: 'DS & Algos Solved' },
  { icon: Rocket, value: '3+', label: 'Years Coding' },
  { icon: Heart, value: '3+', label: 'Certifications' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <div className="absolute inset-0 gradient-border rounded-2xl" />
              
              {/* Profile Image Placeholder */}
              <div className="relative aspect-square rounded-2xl overflow-hidden glass">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                      <span className="text-5xl font-bold text-primary-foreground">HK</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Full-Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass rounded-xl p-4 glow"
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div>
              <p className="text-primary font-mono text-sm mb-2">// About Me</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Engineering <span className="gradient-text">Impactful</span> Solutions
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Computer Science Engineering student at Walchand Institute of Technology with a strong passion for 
                Full-Stack Development and Machine Learning. With a GPA of 9.65, I combine academic excellence with 
                hands-on project experience.
              </p>
              <p>
                My journey includes shipping real-world projects like an AI-powered cleanliness monitor and a civic 
                issue reporting system. I've also gained professional experience as a Software Development Intern, 
                building financial dashboards and working with complex APIs.
              </p>
              <p>
                When I'm not coding, I'm exploring Generative AI, solving algorithmic problems, or participating in 
                hackathons to push the boundaries of what's possible with code.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {stats.map(({ icon: Icon, value, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass rounded-xl p-4 text-center hover-lift"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold gradient-text">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
