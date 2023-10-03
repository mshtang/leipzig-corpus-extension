import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import { createContext, useState } from 'react';
import SentencePage from './SentencePage';
import SettingsPage from './SettingsPage';

export const CorpusInfoContext = createContext('');

function BottomNav() {
  const [selectedPage, setSelectedPage] = useState<'home' | 'settings'>('home');
  const [selectedCorpus, setSelectedCorpus] =
    useState<string>('deu_news_2012_3M');
  const [numEntriesToShow, setNumEntriesToShow] = useState<number>(5);
  const [helperText, setHelperText] = useState<string>(
    '3,000,000 sentences of a German news sub-corpus based on material from 2012'
  );

  const handleSelectCorpus = (event: SelectChangeEvent) => {
    const value = event.target.value;
    console.log('selected corpus', value);
    setSelectedCorpus(value);
    switch (value) {
      case 'deu_news_2012_3M':
        setHelperText(
          '3,000,000 sentences of a German news sub-corpus based on material from 2012'
        );
        break;
      case 'deu_news_2010_1M':
        setHelperText(
          '1,000,000 sentences of a German news sub-corpus based on material from 2010'
        );
        break;
      case 'deu_wikipedia_2010_1M':
        setHelperText(
          '1,000,000 sentences of a German Wikipedia sub-corpus based on material from 2010'
        );
        break;
      case 'eng_news_2013_3M':
        setHelperText(
          '3,000,000 sentences of a English news sub-corpus based on material from 2013'
        );
        break;
      case 'eng_wikipedia_2012_1M':
        setHelperText(
          '1,000,000 sentences of a English Wikipedia sub-corpus based on material from 2012'
        );
        break;
      default:
        setHelperText('');
        break;
    }
  };

  const handleSelectNumEntriesToShow = (event: SelectChangeEvent) => {
    const value = event.target.value;
    console.log('selected num', value);
    setNumEntriesToShow(parseInt(value));
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        margin: '20px',
        padding: '20px',
      }}
      elevation={3}>
      {selectedPage === 'home' && (
        <CorpusInfoContext.Provider value={helperText}>
          <SentencePage
            corpus={selectedCorpus}
            numToShow={numEntriesToShow}
          />
        </CorpusInfoContext.Provider>
      )}
      {selectedPage === 'settings' && (
        <SettingsPage
          corpus={selectedCorpus}
          numToShow={numEntriesToShow}
          helperText={helperText}
          onSelectCorpus={handleSelectCorpus}
          onSelectNumEntriesToShow={handleSelectNumEntriesToShow}
        />
      )}
      <BottomNavigation
        showLabels
        value={selectedPage}
        onChange={(_e, newValue) => {
          setSelectedPage(newValue);
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
    </Paper>
  );
}

export default BottomNav;
