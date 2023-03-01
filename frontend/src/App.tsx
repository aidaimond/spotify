import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Register from "./features/users/Register";
import Login from "./features/users/Login";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists/>}/>
            <Route path="/artists" element={<Artists/>}/>
            <Route path="/albums/:id"  element={<Albums/>}/>
            <Route path="/tracks/:id"  element={<Tracks/>}/>
            <Route path={'/register'} element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={(<h1>Not found!</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
