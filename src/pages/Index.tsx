import { useState, useEffect } from "react";
import { Github, Mail, ExternalLink, Code, Briefcase, User, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Portfolio data
  const skills = [
    "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL",
    "Tailwind CSS", "GraphQL", "AWS", "Docker", "Kubernetes", "Git"
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      github: "https://github.com/example/ecommerce",
      live: "https://example-ecommerce.com",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    },
    {
      title: "AI Task Manager",
      description: "Intelligent task management app with AI-powered priority suggestions and deadline predictions.",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "Supabase"],
      github: "https://github.com/example/ai-tasks",
      live: "https://ai-tasks.com",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Live analytics dashboard for monitoring business metrics with customizable widgets and real-time data visualization.",
      technologies: ["React", "D3.js", "WebSocket", "Python", "FastAPI"],
      github: "https://github.com/example/analytics",
      live: "https://analytics-demo.com",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    }
  ];

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Led development of microservices architecture serving 100k+ users. Implemented CI/CD pipelines reducing deployment time by 70%.",
      technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description: "Built responsive web applications and RESTful APIs. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["Vue.js", "Python", "Django", "MySQL", "Redis"]
    },
    {
      title: "Frontend Developer",
      company: "Creative Agency",
      period: "2019 - 2020",
      description: "Developed pixel-perfect user interfaces and improved website performance by 40%. Worked closely with designers to implement modern UI/UX.",
      technologies: ["JavaScript", "CSS3", "SASS", "WordPress", "jQuery"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
              John Developer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Full Stack Developer specializing in modern web technologies. 
              I build scalable applications that solve real-world problems with clean, efficient code.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
              <Button size="lg" variant="outline">
                <Github className="h-5 w-5 mr-2" />
                View GitHub
              </Button>
              <Button size="lg" variant="outline">
                <ExternalLink className="h-5 w-5 mr-2" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              <Code className="h-8 w-8 inline mr-3 text-primary" />
              Technical Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className={`text-sm py-2 px-4 transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white cursor-pointer animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              <Briefcase className="h-8 w-8 inline mr-3 text-primary" />
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.title} 
                  className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              <Award className="h-8 w-8 inline mr-3 text-primary" />
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card 
                  key={exp.title} 
                  className={`border-l-4 border-l-primary bg-white/80 backdrop-blur-sm animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                      <Badge variant="secondary" className="text-sm w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">
              <User className="h-8 w-8 inline mr-3 text-primary" />
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ready to bring your ideas to life? I'm currently available for new projects and collaborations.
              Let's discuss how we can create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Mail className="h-5 w-5 mr-2" />
                john@example.com
              </Button>
              <Button size="lg" variant="outline">
                <Github className="h-5 w-5 mr-2" />
                @johndeveloper
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-slate-400">
              © 2024 John Developer. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;