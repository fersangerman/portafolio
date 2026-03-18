import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
      <p>© {year} {t("rights")}</p>
    </footer>
  );
}
