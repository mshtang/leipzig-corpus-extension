import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import SentencePage from './SentencePage';
import SettingsPage from './SettingsPage';

function BottomNav() {
  const [value, setValue] = useState<'home' | 'settings'>('home');

  return (
    <>
      {value === 'home' && <SentencePage />}
      {value === 'settings' && <SettingsPage corpus={''} />}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_e, newValue) => {
          setValue(newValue);
        }}>
        <BottomNavigationAction
          label='Home'
          value='home'
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label='Settings'
          value='settings'
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNav;
