import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import TrackHistory from "./features/tracks/TrackHistory";
import NewArtist from "./features/artists/NewArtist";
import TrackForm from "./features/tracks/TrackForm";
import AlbumForm from "./features/albums/AlbumForm";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const user = useAppSelector(selectUser);

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
            <Route path="/new-artist" element={(
              <ProtectedRoute isAllowed={!!user}>
                <NewArtist/>
              </ProtectedRoute>
            )}/>
            <Route path="/albums/:id"  element={<Albums/>}/>
              <Route path="/new-album"  element={(
                <ProtectedRoute isAllowed={!!user}>
                  <AlbumForm/>
                </ProtectedRoute>)}/>
            <Route path="/tracks/:id"  element={<Tracks/>}/>
              <Route path="/new-track"  element={(
                <ProtectedRoute isAllowed={!!user}>
                  <TrackForm/>
                </ProtectedRoute>)}/>
            <Route path={'/register'} element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/track_history" element={<TrackHistory/>}/>
            <Route path="*" element={(<h1>Not found!</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
