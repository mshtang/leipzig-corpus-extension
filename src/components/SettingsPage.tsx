import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

interface SettingsPageProps {
  corpus?: string;
}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  const [selectedCorpus, setSelectedCorpus] =
    useState<string>('deu_news_2012_3M');
  const [helperText, setHelperText] = useState<string>(
    '3,000,000 sentences of a German news sub-corpus based on material from 2012'
  );

  const handleSelectCorpus = (event: SelectChangeEvent) => {
    const corpusName = event.target.value;
    setSelectedCorpus(corpusName);
    switch (corpusName) {
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

  return (
    <div>
      <FormControl
        variant='standard'
        sx={{ m: 1 }}>
        <InputLabel id='default-corpus-label'>Which corpus to use?</InputLabel>
        <Select
          sx={{ width: '100%' }}
          labelId='default-corpus-label'
          id='default-corpus-select'
          value={selectedCorpus}
          onChange={handleSelectCorpus}>
          <MenuItem value={'deu_news_2012_3M'}>German news 2012</MenuItem>
          <MenuItem value={'deu_news_2010_1M'}>German news 2010</MenuItem>
          <MenuItem value={'deu_wikipedia_2010_1M'}>German wiki 2010</MenuItem>
          <MenuItem value={'eng_news_2013_3M'}>English news 2013</MenuItem>
          <MenuItem value={'eng_wikipedia_2012_1M'}>English wiki 2012</MenuItem>
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SettingsPage;
