// context/AppProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from "styled-components/native";
import i18n, { RTL_LANGS } from "../i18n";
import { getItem, setItem } from "../utils/storage";
import { darkTheme, lightTheme } from "./themes";

import { I18nManager } from "react-native";
// import * as Updates from 'expo-updates';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("en");

  // Load saved preferences
  useEffect(() => {
    (async () => {
      const prefs = await getItem("preferences");
      if (prefs) {
        if (prefs.isDark !== undefined) setIsDark(prefs.isDark);
        if (prefs.language) {
          setLanguage(prefs.language);
          i18n.changeLanguage(prefs.language);
        }
      }
    })();
  }, []);

  // ✅ Save all prefs in one place
  const savePrefs = (updated: Partial<{ isDark: boolean; language: string }>) => {
    const newPrefs = { isDark, language, ...updated };
    setItem("preferences", newPrefs);
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const updated = !prev;
      savePrefs({ isDark: updated });
      return updated;
    });
  };

  const switchLanguage = (newLang: string) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    savePrefs({ language: newLang });
    const shouldBeRTL = RTL_LANGS.includes(newLang);
        if (shouldBeRTL !== I18nManager.isRTL) {
          I18nManager.allowRTL(shouldBeRTL);
          I18nManager.forceRTL(shouldBeRTL);
          // Alert.alert("Restart Required", "App will restart to apply layout", [
          //   { text: "OK", onPress: () => Updates.reloadAsync()}
          // ]);
      }
  };
  const currentTheme:DefaultTheme = isDark ? darkTheme : lightTheme;
  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        language,
        switchLanguage,
      }}
    >
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
