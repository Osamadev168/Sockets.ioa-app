import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat/Chat";
import Room from "./Chat/Room";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
