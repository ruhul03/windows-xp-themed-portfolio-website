export function AboutContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-5xl">👋</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-2">Hello, I'm [Your Name]</h2>
          <p className="text-gray-700 leading-relaxed">
            A passionate web developer and designer with a love for creating beautiful, 
            functional websites. I specialize in modern web technologies and have a knack 
            for bringing creative ideas to life.
          </p>
        </div>
      </div>

      <div className="p-4 bg-[#ECE9D8] border-2 border-[#0054E3] rounded">
        <h3 className="text-lg mb-2">Background</h3>
        <p className="text-gray-700 leading-relaxed">
          With several years of experience in web development, I've worked on diverse 
          projects ranging from small business websites to complex web applications. 
          My approach combines technical expertise with creative problem-solving.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded border border-blue-300">
          <div className="text-3xl mb-1">🎓</div>
          <h4 className="mb-1">Education</h4>
          <p className="text-sm text-gray-600">Computer Science Degree</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded border border-green-300">
          <div className="text-3xl mb-1">💼</div>
          <h4 className="mb-1">Experience</h4>
          <p className="text-sm text-gray-600">5+ Years Professional</p>
        </div>
      </div>
    </div>
  );
}
