import { Route, Routes } from "react-router-dom";

import ChatContainer from "components/ChatContainer";
import { AuthContextProvider } from "context/AuthContext";
import { Navbar } from "components/Navbar";
import { Protected } from "components/Protected";
import { Account } from "pages/Account";
import { SignIn } from "pages/SignIn";

function App() {
  return (
    <div style={{ backgroundColor: "#999999", maxHeight: "100%", padding: 10 }}>
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
          </Routes>
        </>
      </AuthContextProvider>
    </div>
  );
}

export default App;
