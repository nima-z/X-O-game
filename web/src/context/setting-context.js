import { createContext, useContext, useState } from "react";

const defaultSetting = { sound: true, toggleSound: () => {} };
const SettingContext = createContext(defaultSetting);

export function SettingProvider({ children }) {
  const [setting, setSetting] = useState(defaultSetting);

  function toggleSound() {
    setSetting((state) => ({ ...state, sound: !state.sound }));
  }
  return (
    <SettingContext.Provider value={{ sound: setting.sound, toggleSound }}>
      {children}
    </SettingContext.Provider>
  );
}

export default function useSetting() {
  const ctx = useContext(SettingContext);
  return ctx;
}
