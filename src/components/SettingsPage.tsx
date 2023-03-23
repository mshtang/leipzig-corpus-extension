import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

interface SettingsPageProps {
  corpus: string;
  numToShow: number;
  helperText: string;
  onSelectCorpus: (e: SelectChangeEvent) => void;
  onSelectNumEntriesToShow: (e: SelectChangeEvent) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  corpus,
  numToShow,
  helperText,
  onSelectCorpus,
  onSelectNumEntriesToShow,
}) => {
  return (
    <Box
      height='745px'
      flexDirection='column'
      display='flex'>
      <FormControl
        variant='standard'
        sx={{ m: 1 }}>
        <InputLabel id='default-corpus-label'>Which corpus to use?</InputLabel>
        <Select
          sx={{ width: '100%' }}
          labelId='default-corpus-label'
          id='default-corpus-select'
          value={corpus}
          onChange={onSelectCorpus}>
          <MenuItem value={'deu_news_2012_3M'}>German news 2012</MenuItem>
          <MenuItem value={'deu_news_2010_1M'}>German news 2010</MenuItem>
          <MenuItem value={'deu_wikipedia_2010_1M'}>German wiki 2010</MenuItem>
          <MenuItem value={'eng_news_2013_3M'}>English news 2013</MenuItem>
          <MenuItem value={'eng_wikipedia_2012_1M'}>English wiki 2012</MenuItem>
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
      <FormControl
        variant='standard'
        sx={{ m: 1 }}>
        <InputLabel id='default-num-entries-to-show-label'>
          How many entries to display at once?
        </InputLabel>
        <Select
          sx={{ width: '100%' }}
          labelId='default-num-entries-to-show-label'
          id='default-num-entries-to-show-select'
          value={numToShow.toString()}
          onChange={onSelectNumEntriesToShow}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;
