import React from 'react'
import { useData } from "@/context/DataContext";

function Skills() {
    const { skills } = useData();
    const allSkills = skills?.names || [];
  return (
    <div className="max-w-2xl px-7 sm:px-6 py-4 flex flex-col items-start justify-start">
        <h1 className='text-xl sm:text-2xl font-bold text-start'>Skills</h1>
        <div>
            <div className="flex flex-wrap gap-1 mt-2">
                {allSkills.map((skill, index) => (
                    <span key={index} className="text-xs sm:text-xs text-gray-50 hover:bg-[#4ED7F1] hover:dark:bg-[#03C988]  bg-slate-900 px-2 py-1 rounded-md transition-all duration-300 cursor-context-menu hover:scale-105">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Skills