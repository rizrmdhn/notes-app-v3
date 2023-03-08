import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import ArchivedNote from "./pages/ArchivedNote";
import UnArchivedNote from "./pages/UnArchivedNote";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import DetailsNote from "./pages/DetailsNote";
import AddNewNote from "./pages/AddNewNote";
import ErrorNoteNotFound from "./components/ErrorPage/ErrorNoteNotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorNotLogin from "./components/ErrorPage/ErrorNotLogin";
import LocaleContext from "./contexts/LocaleContext";
import {
  getActiveNotes,
  getArchivedNotes,
  getUserLogged,
  putAccessToken,
} from "./utils/api";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const [locale, setLocale] = useState("id");
  const [theme, setTheme] = useState("light");

  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchParam, setSearchParam] = useSearchParams();

  async function fetchUser() {
    const { data } = await getUserLogged();
    setAuthedUser(data);
    setInitializing(false);
  }

  const noteRoute = "/notes";

  useEffect(() => {
    const locale = localStorage.getItem("locale");
    const theme = localStorage.getItem("theme");
    if (locale) {
      setLocale(locale);
    }
    if (theme) {
      setTheme(theme);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    // set theme to either light or dark
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onSearch = (e) => {
    setSearchParam({ title: e.target.value });
    setQuery(e.target.value);
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      localStorage.setItem("locale", prevLocale === "id" ? "en" : "id");
      return prevLocale === "id" ? "en" : "id";
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      localStorage.setItem("theme", prevTheme === "light" ? "dark" : "light");
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  const onGetActiveNotes = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
      setIsLoading(false);
    }, 1500);
  };

  const onGetArchviedNotes = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const { data } = await getArchivedNotes();
      setNotes(data);
      setIsLoading(false);
    }, 1500);
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
    const { data: activeNotes } = await getActiveNotes();
    setNotes(activeNotes);
  };

  const onLogout = async () => {
    setAuthedUser("");
    putAccessToken("");
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  });

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  });

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container">
            <Header authedUser={authedUser} />
            <div className="container">
              <div className="row">
                <div className="col">
                  <Routes>
                    <Route path="*" element={<ErrorNotLogin />} />
                    <Route
                      path="/"
                      element={<LoginPage loginSuccess={onLoginSuccess} />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <Header
            getActiveNotes={() => onGetActiveNotes()}
            getArchivedNotes={() => onGetArchviedNotes()}
            logout={() => onLogout()}
            name={authedUser.name}
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <Routes>
                  <Route path="*" element={<ErrorPage />} />
                  <Route
                    path="/"
                    element={
                      <UnArchivedNote
                        SearchNotesItem={(e) => onSearch(e)}
                        querySearch={query}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    }
                  />
                  <Route
                    path="/archives"
                    element={
                      <ArchivedNote
                        SearchNotesItem={(e) => onSearch(e)}
                        querySearch={query}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    }
                  />
                  <Route
                    path={`${noteRoute}/Error`}
                    element={<ErrorNoteNotFound />}
                  />
                  <Route path={`${noteRoute}/:id`} element={<DetailsNote />} />
                  <Route path={`${noteRoute}/new`} element={<AddNewNote />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
