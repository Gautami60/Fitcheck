import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="w-full bg-white border-t border-[#C8C8C8] text-[#151413] mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-light tracking-[0.2em] uppercase text-[#151413]">
              F I T C H E C K
            </h3>
            <p className="text-xs uppercase tracking-[0.12em] text-[#66625C] font-medium">
              AI Fashion Compatibility & Style Intelligence Platform
            </p>
            <p className="text-sm text-[#66625C] font-light leading-relaxed max-w-sm pt-2">
              Synthesizing physical proportion, fabric physics, and color science to elevate personal aesthetic intelligence without superficial virtual illusions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#151413]">
              Experience
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#66625C]">
              <li><Link href="/explore" className="hover:text-[#151413] transition-colors">Runway Carousel</Link></li>
              <li><Link href="/upload" className="hover:text-[#151413] transition-colors">Style Analysis</Link></li>
              <li><Link href="/recommendations" className="hover:text-[#151413] transition-colors">Curated Aesthetics</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#151413] transition-colors">Style Workspace</Link></li>
            </ul>
          </div>

          {/* Editorial Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#151413]">
              Intelligence
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#66625C]">
              <li><span className="text-[#66625C]">Silhouette Mapping</span></li>
              <li><span className="text-[#66625C]">Chromatic Balance</span></li>
              <li><span className="text-[#66625C]">Occasion Harmonics</span></li>
              <li><span className="text-[#66625C]">Algorithmic Fit</span></li>
            </ul>
          </div>

          {/* Editorial Note */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#151413]">
              Editorial Transparency
            </h4>
            <p className="text-xs text-[#66625C] font-light leading-relaxed">
              Fitcheck provides conceptual styling insights and compatibility matrices. We do not claim pseudo-photorealistic garment replacement.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DFDFDF] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#66625C] tracking-wider uppercase">
          <div>
            &copy; {new Date().getFullYear()} Fitcheck Intelligence. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-[#151413] transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-[#151413] transition-colors cursor-pointer">Terms of Curation</span>
            <span className="hover:text-[#151413] transition-colors cursor-pointer">Editorial Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

