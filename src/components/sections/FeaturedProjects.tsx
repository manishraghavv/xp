import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { projectsData } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassButton } from "@/components/ui/GlassButton";

export function FeaturedProjects() {
  // 4 featured case studies for home page
  const featured = projectsData.slice(0, 4);

  return (
    <section className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Case Studies & Impact"
            title={
              <>
                Real results. <span className="text-brand-blue">Proven delivery</span>.
              </>
            }
            subtitle="Explore how our finance-first perspective and technical precision solved complex process challenges for leading Indian and global enterprises."
            className="mb-0"
            theme="light"
          />

          <GlassButton
            href="/projects"
            variant="outline-light"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto flex-shrink-0"
          >
            All Case Studies →
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project) => (
            <div
              key={project.id}
              className="p-8 rounded-2xl glass-card-light flex flex-col justify-between group hover:border-brand-blue/30 transition-all duration-300"
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100 mb-4">
                  {project.tag}
                </span>

                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {project.shortDescription || project.overview}
                </p>

                {/* 4 Result bullets */}
                <div className="space-y-2.5 mb-8">
                  {project.results.slice(0, 4).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-cyan-600 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
