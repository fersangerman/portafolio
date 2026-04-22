import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 py-10 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink">Fernanda San German</span>
        <p className="text-sm text-ink-light">
          © {year} {t("rights")}
        </p>
        <div className="flex items-center gap-5 text-sm text-ink-light">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
