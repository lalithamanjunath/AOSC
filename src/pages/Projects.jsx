import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { Skeleton } from '@/components/ui/skeleton';

export default function Projects() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-created_date'),
    initialData: [],
  });


  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        !filters.search ||
        project.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.tech_stack?.some(tech => tech.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesCategory = 
        filters.category === 'all' || project.category === filters.category;
      
      const matchesStatus = 
        filters.status === 'all' || project.status === filters.status;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, filters]);


  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Projects
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Open source projects built by our community members. Explore, contribute, and learn together.
          </p>
        </motion.div>

        {/* Filters */}
        <ProjectFilters filters={filters} setFilters={setFilters} />


        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="h-48" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📁</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-500">
              Try adjusting your filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}