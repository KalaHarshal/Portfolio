import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Coffee, Rocket, Heart } from 'lucide-react';

const stats = [
  { icon: Code2, value: '50+', label: 'Projects Completed' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee' },
  { icon: Rocket, value: '5+', label: 'Years Experience' },
  { icon: Heart, value: '30+', label: 'Happy Clients' },
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
                      <span className="text-5xl font-bold text-primary-foreground">JD</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Software Developer</p>
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
                Turning Ideas Into{' '}
                <span className="gradient-text">Reality</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Full-Stack Developer with over 5 years of experience in 
                creating innovative web applications. My journey in tech started with a 
                curiosity for how things work, which evolved into a deep love for coding.
              </p>
              <p>
                I specialize in building scalable, user-centric applications using modern 
                technologies like React, Node.js, and cloud services. I believe in writing 
                clean, maintainable code that not only works but also tells a story.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or sharing knowledge with the developer community.
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
