import { Navigate, Route, Routes } from "react-router-dom";

import ChatContainer from "components/ChatContainer";
import { AuthContextProvider } from "context/AuthContext";
import { Navbar } from "components/Navbar";
import { Emoji } from "components/Emoji";
import { Protected } from "components/Protected";
import { Account } from "pages/Account";
import { LogIn } from "pages/LogIn";
import { Letters } from "pages/Letters";
import { LearnAlphabet } from "pages/Letters/pages/LearnAlphabet";
import { PlayAlphabet } from "pages/Letters/pages/PlayAlphabet";

function App() {
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
              <Route index element={<Navigate to="learn" replace={true} />} />
              <Route
                path="learn"
                element={
                  <Protected>
                    <LearnAlphabet />
                  </Protected>
                }
              />
              <Route
                path="alphabet"
                element={
                  <Protected>
                    <PlayAlphabet />
                  </Protected>
                }
              />
            </Route>
          </Routes>
        </>
      </AuthContextProvider>
    </>
  );
}

export default App;
