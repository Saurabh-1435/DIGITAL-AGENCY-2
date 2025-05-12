
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  fullDescription?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Quantum E-commerce Platform",
    category: "Web",
    description: "Modern online shopping experience",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    fullDescription: "A complete e-commerce solution with advanced search, personalization, and secure payment processing. Built with React, Node.js, and MongoDB."
  },
  {
    id: 2,
    title: "Harmony Music App",
    category: "App",
    description: "Music streaming interface",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    fullDescription: "A cross-platform music streaming application with personalized recommendations and social features. Developed using React Native and Firebase."
  },
  {
    id: 3,
    title: "Nova Financial Rebrand",
    category: "Branding",
    description: "Finance company identity redesign",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1000&auto=format&fit=crop",
    fullDescription: "Complete brand identity redesign for a financial services company, including logo, visual language, and brand guidelines."
  },
  {
    id: 4,
    title: "Pulse Fitness Dashboard",
    category: "Web",
    description: "Health tracking analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    fullDescription: "Interactive fitness tracking dashboard with real-time analytics, progress visualization, and personalized workout recommendations."
  },
  {
    id: 5,
    title: "Echo Social Platform",
    category: "App",
    description: "Community engagement tool",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop",
    fullDescription: "A social networking platform focused on interest-based communities, featuring rich media sharing and real-time messaging."
  },
  {
    id: 6,
    title: "Stellar Restaurant Branding",
    category: "Branding",
    description: "Upscale dining experience",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
    fullDescription: "Complete brand identity for a high-end restaurant chain, including logo design, menu layouts, and interior design elements."
  },
];

const categories = ["All", "Web", "App", "Branding"];

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="section-padding py-28 relative"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-agency-accent mb-4">// OUR WORK</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Featured <span className="text-gradient">Projects</span></h3>
          <p className="text-gray-400 text-lg">
            Explore our portfolio of award-winning digital experiences created for clients across industries.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center mb-12 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full transition-all duration-300",
                selectedCategory === category
                  ? "bg-agency-accent text-white"
                  : "bg-white/5 hover:bg-white/10 text-gray-300"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div 
          className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group cursor-pointer relative overflow-hidden rounded-xl"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform transition-all duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-agency-darker/90 via-agency-darker/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <span className="inline-block px-3 py-1 text-xs bg-agency-accent/20 text-agency-accent rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-agency-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 transform transition-all duration-500 opacity-0 group-hover:opacity-100">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project details dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="bg-agency-darker border-white/10 text-white max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedProject.category}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div 
                  className="aspect-video w-full rounded-lg bg-cover bg-center mb-6"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                ></div>
                
                <h4 className="text-xl font-semibold mb-2">Overview</h4>
                <p className="text-gray-300 mb-4">
                  {selectedProject.fullDescription}
                </p>
                
                <div className="flex justify-end">
                  <button 
                    className="px-6 py-2 bg-agency-accent hover:bg-agency-accent/90 text-white rounded-md font-medium transition-all"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
