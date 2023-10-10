import { Navigate, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./translations/config";

import ChatContainer from "components/ChatContainer";
import { AuthContextProvider } from "context/AuthContext";
import { Navbar } from "components/Navbar";
import { Emoji } from "components/Emoji";
import { Protected } from "components/Protected";
import { Account } from "pages/Account";
import { LogIn } from "pages/LogIn";
import { Letters } from "pages/Letters";
import { PlayAlphabet } from "pages/Letters/pages/PlayAlphabet";
import { Vowels } from "pages/Letters/pages/Vowels";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Emoji />
      <AuthContextProvider>
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <ChatContainer />
                </Protected>
              }
            />
            <Route path="/log-in" element={<LogIn />} />
            <Route
              path="/account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            />
            <Route
              path="/letters"
              element={
                <Protected>
                  <Letters />
                </Protected>
              }
            >
              <Route
                index
                element={<Navigate to="alphabet" replace={true} />}
              />
              <Route
                index
                path="alphabet"
                element={
                  <Protected>
                    <PlayAlphabet />
                  </Protected>
                }
              />
              <Route
                path="vowels"
                element={
                  <Protected>
                    <Vowels />
                  </Protected>
                }
              />
            </Route>
          </Routes>
        </>
      </AuthContextProvider>

      <div className="developed-by">{t("developedBy")}</div>
    </>
  );
}

export default App;
