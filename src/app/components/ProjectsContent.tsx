export function ProjectsContent() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack online shopping platform with cart functionality and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task manager with real-time updates and team features.',
      tech: ['Vue.js', 'Firebase', 'Tailwind'],
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Portfolio Website',
      description: 'Custom portfolio site with interactive animations and modern design.',
      tech: ['Next.js', 'Framer Motion', 'CSS'],
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather application with location tracking and forecasts.',
      tech: ['React', 'API Integration', 'Charts'],
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-[#0054E3] to-[#3F8CF3] text-white rounded">
        <h2 className="text-xl mb-1">My Projects</h2>
        <p className="text-blue-100 text-sm">A collection of my recent work</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 border-2 border-[#0054E3] rounded bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded bg-gradient-to-br ${project.color} flex items-center justify-center text-white shrink-0`}>
                <span className="text-xl">📁</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg mb-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#ECE9D8] border border-[#ACACAC] rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
