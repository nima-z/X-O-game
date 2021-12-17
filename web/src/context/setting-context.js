import { createContext, useContext, useEffect, useState } from "react";

const defaultSetting = {
  sound: true,
  toggleSound: () => {},
  darkMode: true,
  toggleDarkMode: () => {},
};

const SettingContext = createContext(defaultSetting);

function initializer() {
  const localSetting = localStorage.getItem("setting");
  if (localSetting) return JSON.parse(localSetting);
  return defaultSetting;
}

export function SettingProvider({ children }) {
  const [setting, setSetting] = useState(initializer());

  function toggleSound() {
    setSetting((state) => ({ ...state, sound: !state.sound }));
  }

  function toggleDarkMode() {
    setSetting((state) => ({ ...state, darkMode: !state.darkMode }));
  }

  const { darkMode } = setting;

  useEffect(() => {
    let value = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", value);
  }, [darkMode]);

  useEffect(() => {
    if (!setting) return;
    localStorage.setItem("setting", JSON.stringify(setting));
  }, [setting]);

  return (
    <SettingContext.Provider
      value={{
        sound: setting.sound,
        toggleSound,
        darkMode: setting.darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export default function useSetting() {
  const ctx = useContext(SettingContext);
  return ctx;
}
