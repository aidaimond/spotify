import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem, Stack} from '@mui/material';
import {User} from '../../../types';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import {apiURL} from "../../../constants";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
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
        <Avatar alt="Avatar" src={user?.googleID ? user.avatar : apiURL + '/' + user.avatar}/>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>
          <Link style={{textDecoration: "none", color: "inherit"}} to="/track_history">Track History</Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;