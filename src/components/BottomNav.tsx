import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import SentencePage from './SentencePage';
import Settings from './Settings';

function BottomNav() {
  const [value, setValue] = useState<'home' | 'settings'>('home');

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: 'home' | 'settings'
  ) => {
    setValue(newValue);
  };

  return (
    <>
      {value === 'home' && <SentencePage />}
      {value === 'settings' && <Settings corpus={''} />}
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{ width: '100%' }}>
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
