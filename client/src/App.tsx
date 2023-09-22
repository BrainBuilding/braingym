import { Navigate, Route, Routes } from "react-router-dom";

import ChatContainer from "components/ChatContainer";
import { AuthContextProvider } from "context/AuthContext";
import { Navbar } from "components/Navbar";
import { Protected } from "components/Protected";
import { Account } from "pages/Account";
import { SignIn } from "pages/SignIn";
import { Alphabet } from "pages/Alphabet";
import { LearnAlphabet } from "pages/Alphabet/pages/LearnAlphabet";
import { PlayAlphabet } from "pages/Alphabet/pages/PlayAlphabet";

function App() {
  return (
    <div>
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
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            />
            <Route
              path="/alphabet"
              element={
                <Protected>
                  <Alphabet />
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
                path="play"
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
    </div>
  );
}

export default App;
