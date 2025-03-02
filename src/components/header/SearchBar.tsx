import React, { ChangeEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Container, TextField } from '@mui/material';
import { Colors, Fonts } from '../../constants/Constants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useIsMobile from '../utils/IsMobile';
import { DASHBOARD_PAGE } from '../../pages/common/Pages';

const SearchBar: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const isMobile: boolean = useIsMobile();
  const [searchInput, setSearchInput] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate(`/stocks/search/${searchInput.toLowerCase()}`);
    }
  };

  return (
    <>
      <Container
        sx={{
          backgroundColor: Colors.WHITE,
          borderRadius: '40px',
          border: `2px solid ${Colors.GRAY}`,
          color: Colors.GRAY,
        }}
      >
        <TextField
          variant="standard"
          size="medium"
          placeholder="Search Stocks..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{
            backgroundColor: 'white',
            width: isMobile ? '150px' : '250px',
            fontFamily: Fonts.RALEWAY,
          }}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
        />
      </Container>
      <Container>
        <AccountCircleIcon
          fontSize="large"
          sx={{ cursor: 'pointer', color: Colors.LIGHT_GRAY }}
          onClick={() => navigate(DASHBOARD_PAGE)}
        />
      </Container>
    </>
  );
};

export default SearchBar;
