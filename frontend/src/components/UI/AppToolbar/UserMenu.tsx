import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem, Stack} from '@mui/material';
import {User} from '../../../types';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import {apiURL} from "../../../constants";
import {fetchArtists} from "../../../features/artists/artistsThunks";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(fetchArtists);
    navigate('/');
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={handleClick}
          color="inherit"
        >
          Hello, {user.displayName}
        </Button>
        <Avatar alt={user.displayName} src={user?.googleID ? user.avatar : apiURL + '/' + user.avatar}/>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>
          <Link style={{textDecoration: "none", color: "inherit"}} to="/track_history">Track History</Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;