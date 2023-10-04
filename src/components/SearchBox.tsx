import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Stack, TextField, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import projectLogo from '../assets/logo.png';
import { CorpusInfoContext } from './BottomNav';

interface SearchBoxProps {
  keyword: string;
  onTextChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPressed: (e: string) => void;
  onButtonClick: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  keyword,
  onTextChanged,
  onEnterPressed,
  onButtonClick,
}) => {
  const corpusInfo = useContext(CorpusInfoContext);
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={2}>
      <TextField
        fullWidth
        variant='standard'
        id='searchBox'
        label='Which word do you want to know?'
        onChange={onTextChanged}
        onKeyDown={e => onEnterPressed(e.key)}
      />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100%'
        borderRadius='50%'>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={onButtonClick}
          style={{
            borderRadius: '50%',
            minWidth: 0,
            padding: 0,
          }}>
          {keyword === '' ? (
            <img
              src={projectLogo}
              alt='Logo'
              height='56px'
            />
          ) : (
            <Tooltip
              arrow
              title={`This corpus consists of ${corpusInfo}`}>
              <SearchIcon style={{ fontSize: '48px', margin: '4px' }} />
            </Tooltip>
          )}
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchBox;
