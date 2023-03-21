import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import projectLogo from '../assets/logo.png';

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
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      margin='20px'>
      <Grid
        item
        xs={12}
        sm={6}
        marginRight='40px'>
        <TextField
          fullWidth
          variant='outlined'
          id='searchBox'
          label='Which word do you want to know?'
          onChange={onTextChanged}
          onKeyUp={e => onEnterPressed(e.key)}
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
              <SearchIcon style={{ fontSize: '56px' }} />
            )}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchBox;
