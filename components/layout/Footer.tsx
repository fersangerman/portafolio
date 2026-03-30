import { useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 py-10 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <Logo width={110} className="opacity-50" />
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
          <a
            href="mailto:fersangermans@gmail.com"
            className="hover:text-ink transition-colors"
          >
            fersangermans@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
