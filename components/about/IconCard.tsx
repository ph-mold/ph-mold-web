type IconCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  iconBgColor: string;
  iconColor: string;
};

export const IconCard = ({
  icon,
  title,
  subtitle,
  description,
  className = "",
  iconBgColor,
  iconColor
}: IconCardProps) => (
  <div className={`mb-8 flex items-center gap-4 ${className}`}>
    <div
      className={`flex min-h-12 min-w-12 items-center justify-center rounded-full ${iconBgColor}`}
    >
      <div className={`h-6 !w-6 ${iconColor}`}>{icon}</div>
    </div>
    <div>
      {subtitle && (
        <h3 className="text-foreground2 text-sm font-medium">{subtitle}</h3>
      )}
      <p
        className={subtitle ? "text-xl font-bold" : "text-foreground2 text-lg"}
      >
        {title}
      </p>
      {description && (
        <p className="text-foreground2 mt-1 text-sm">{description}</p>
      )}
    </div>
  </div>
);
