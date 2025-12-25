export function SkillsContent() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'CSS/Tailwind', level: 95 },
        { name: 'HTML', level: 95 },
      ],
      color: '#3F8CF3',
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'SQL', level: 70 },
        { name: 'REST APIs', level: 85 },
      ],
      color: '#2B882B',
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Figma', level: 85 },
        { name: 'Docker', level: 65 },
        { name: 'AWS', level: 60 },
      ],
      color: '#E8A317',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-[#0054E3] to-[#3F8CF3] text-white rounded">
        <h2 className="text-xl mb-1">Technical Skills</h2>
        <p className="text-blue-100 text-sm">My expertise and proficiency levels</p>
      </div>

      {skillCategories.map((category, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-lg pb-2 border-b-2 border-[#0054E3]">
            {category.category}
          </h3>
          <div className="space-y-3">
            {category.skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="h-6 bg-[#ECE9D8] border-2 border-[#ACACAC] rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(to right, ${category.color}, ${category.color}dd)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
