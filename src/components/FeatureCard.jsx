import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  path,
  badge,
}) {
  return (
    <Link to={path} className="feature-card feature-card-modern">
      <div className="feature-card-top">
        <div className="feature-icon">
          <Icon size={22} />
        </div>

        {badge && <span className="feature-badge">{badge}</span>}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="feature-card-link">
        Explore
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}