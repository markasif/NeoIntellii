import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Compass,
  Rocket,
  Users,
  Workflow,
  MapPin,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { blogPosts, getCategoryColor } from "@/data/blogPosts";

/**
 * Section 16. Three articles, prioritised by category so the homepage leads
 * with AI GCC thinking rather than whatever was published last. Kept to three
 * deliberately: the homepage is already long, and /blog owns the full archive.
 */
const CATEGORY_PRIORITY = ["AI GCC", "GCC Strategy", "GCC Talent", "GCC Setup"];

const previewPosts = blogPosts
  .filter((post) => !post.excludeFromPromotions)
  .slice()
  .sort((a, b) => {
    const rank = (category: string) => {
      const index = CATEGORY_PRIORITY.indexOf(category);
      return index === -1 ? CATEGORY_PRIORITY.length : index;
    };
    return rank(a.category) - rank(b.category);
  })
  .slice(0, 3);

const gradients = [
  "linear-gradient(135deg, #11abdb 0%, #0a93bd 55%, #07799c 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #5b21b6 55%, #3a1b8a 100%)",
  "linear-gradient(135deg, #10b981 0%, #0f766e 55%, #0d5a5a 100%)",
];

function getCategoryIcon(category: string): LucideIcon {
  const c = category.toLowerCase();
  if (c.includes("ai")) return Brain;
  if (c.includes("mlops")) return Workflow;
  if (c.includes("talent")) return Users;
  if (c.includes("location")) return MapPin;
  if (c.includes("setup")) return Rocket;
  if (c.includes("strategy")) return Compass;
  return BookOpen;
}

const BlogPreview = () => {
  return (
    <section
      aria-labelledby="insights-heading"
      className="surface-paper-2 py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Insights</p>
            <h2
              id="insights-heading"
              className="text-display-sm md:text-display font-display ink tracking-tight"
            >
              AI GCC insights.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[#077fa4] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
          >
            <span className="border-b border-current/40 pb-0.5">Explore Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewPosts.map((post, i) => {
            const Icon = getCategoryIcon(post.category);
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
              >
                <div
                  aria-hidden
                  className="relative h-[180px] rounded-2xl overflow-hidden mb-5"
                  style={{ background: gradients[i % gradients.length] }}
                >
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      className="w-20 h-20 text-white/25 transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-body-muted mb-3">
                  <span className={`text-2xs px-2.5 py-0.5 rounded-full border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span>{post.date} · {post.readTime}</span>
                </div>
                <h3 className="text-heading font-display text-lg mb-3 leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-body text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm">
                  Read article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
