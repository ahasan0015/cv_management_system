import { useSettings } from "../hooks/useSettings";


const Settings = () => {
  const { language, theme, setLanguage, toggleTheme, t } = useSettings();

  return (
    <div className="card border-0 shadow-sm p-4">
      <h4 className="fw-bold mb-4">{t("settings")}</h4>

      {/* Theme Preference Section */}
      <div className="mb-4 pb-3 border-bottom">
        <label className="form-label fw-semibold d-block">Theme Preferences</label>
        <button
          onClick={toggleTheme}
          className="btn btn-outline-primary d-flex align-items-center gap-2"
        >
          <i className={`bi ${theme === "light" ? "bi-moon-fill" : "bi-sun-fill"}`}></i>
          {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
        </button>
      </div>

      {/* Language Selection Section (English First) */}
      <div>
        <label className="form-label fw-semibold d-block">Language Selection</label>
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${language === "en" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            type="button"
            className={`btn ${language === "bn" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setLanguage("bn")}
          >
            বাংলা (Bangla)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;