import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const experiences = [
	{
		type: 'work',
		title: 'Software Development Intern',
		organization: 'Bluestock Fintech',
		period: 'May 2025 - Jun 2025',
		description:
			'Developed a web-based IPO dashboard using React.js. Integrated REST APIs to display financial data and optimized performance.',
		skills: ['React.js', 'REST APIs', 'UI/UX', 'JSON'],
	},
	{
		type: 'education',
		title: 'B.Tech in Computer Science',
		organization: 'Walchand Institute of Technology',
		period: '2023 - Present',
		description:
			'CGPA: 9.65. Minor in EnTc. Focusing on software engineering and data science.',
		skills: ['DSA', 'Web Dev', 'ML'],
	},
	{
		type: 'education',
		title: 'HSC (12th Grade)',
		organization: 'Sarosh Junior College',
		period: '2020 - 2022',
		description: 'Secured 92%',
		skills: ['Science', 'Mathematics'],
	},
];

const achievements = [
	{ title: 'Programming with Generative AI', issuer: 'NPTEL', year: '2025' },
	{ title: 'ML Foundation', issuer: 'Infosys', year: '2025' },
	{ title: 'Python Foundation', issuer: 'Infosys', year: '2024' },
];

export const Experience = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<section id="experience" className="section-padding relative overflow-hidden">
			{/* Background */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />

			<div className="container-custom relative z-10" ref={ref}>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<p className="text-primary font-mono text-sm mb-2">// My Journey</p>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
						Experience &{' '}
						<span className="gradient-text">Education</span>
					</h2>
				</motion.div>

				<div className="grid lg:grid-cols-3 gap-12">
					{/* Timeline */}
					<div className="lg:col-span-2">
						<div className="relative">
							{/* Vertical Line */}
							<div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

							{/* Timeline Items */}
							<div className="space-y-8">
								{experiences.map((exp, index) => (
									<motion.div
										key={`${exp.title}-${exp.period}`}
										initial={{ opacity: 0, x: -30 }}
										animate={isInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.6, delay: index * 0.15 }}
										className="relative pl-16"
									>
										{/* Icon */}
										<div className="absolute left-0 w-12 h-12 rounded-full glass flex items-center justify-center glow">
											{exp.type === 'work' ? (
												<Briefcase className="w-5 h-5 text-primary" />
											) : (
												<GraduationCap className="w-5 h-5 text-accent" />
											)}
										</div>

										{/* Content Card */}
										<div className="glass rounded-xl p-6 hover-lift">
											<div className="flex flex-wrap items-center justify-between gap-2 mb-3">
												<h3 className="text-lg font-semibold">{exp.title}</h3>
												<span className="text-xs text-primary font-mono bg-primary/10 px-3 py-1 rounded-full">
													{exp.period}
												</span>
											</div>
											<p className="text-muted-foreground text-sm mb-3">
												{exp.organization}
											</p>
											<p className="text-muted-foreground text-sm mb-4 leading-relaxed">
												{exp.description}
											</p>
											<div className="flex flex-wrap gap-2">
												{exp.skills.map((skill) => (
													<span
														key={skill}
														className="px-2 py-1 bg-muted rounded text-xs"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>

					{/* Achievements Sidebar */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						<div className="glass rounded-2xl p-6 sticky top-24">
							<div className="flex items-center gap-3 mb-6">
								<Award className="w-6 h-6 text-primary" />
								<h3 className="text-xl font-semibold">Certifications</h3>
							</div>

							<div className="space-y-4">
								{achievements.map((achievement, index) => (
									<motion.div
										key={achievement.title}
										initial={{ opacity: 0, y: 20 }}
										animate={isInView ? { opacity: 1, y: 0 } : {}}
										transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
										className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
									>
										<h4 className="font-medium text-sm">{achievement.title}</h4>
										<div className="flex justify-between items-center mt-1">
											<p className="text-xs text-muted-foreground">
												{achievement.issuer}
											</p>
											<span className="text-xs text-primary">
												{achievement.year}
											</span>
										</div>
									</motion.div>
								))}
							</div>

							{/* Download Resume */}
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-primary to-accent rounded-lg font-medium text-primary-foreground glow"
							>
								Download Resume
							</motion.button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
