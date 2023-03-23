import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, TextField, Tooltip } from '@mui/material';
import React from 'react';
import projectLogo from '../assets/logo.png';

interface SearchBoxProps {
  keyword: string;
  corpusInfo: string;
  onTextChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPressed: (e: string) => void;
  onButtonClick: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  keyword,
  corpusInfo,
  onTextChanged,
  onEnterPressed,
  onButtonClick,
}) => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'>
      <Grid
        item
        xs={12}
        sm={6}>
        <TextField
          fullWidth
          variant='standard'
          id='searchBox'
          label='Which word do you want to know?'
          onChange={onTextChanged}
          onKeyDown={e => onEnterPressed(e.key)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        marginTop='20px'
        marginBottom='20px'>
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
                <SearchIcon style={{ fontSize: '56px', padding: '0.15em' }} />
              </Tooltip>
            )}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchBox;
