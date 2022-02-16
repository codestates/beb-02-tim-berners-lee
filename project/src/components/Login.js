import { useState } from 'react';
import { erc20Abi, erc20Addr } from '../erc20Contract';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Grid,
} from '@mui/material';
import { Refresh, Send } from '@mui/icons-material/';

const Login = ({
  web3,
  account,
  setAccount,
  token,
  setToken,
  connectWallet,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const sendToken = () => {
    const contract = new web3.eth.Contract(erc20Abi, erc20Addr);
    contract.methods
      .transfer(recipient, web3.utils.toWei(amount, 'ether'))
      .send({
        from: account,
      })
      .then(() => {
        setRecipient('');
        setAmount('');
      });
  };

  return (
    <Card
      sx={{
        minWidth: '20rem',
        maxWidth: '30rem',
        maxHeight: '12rem',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
      }}
    >
      <IconButton sx={{ float: 'right' }} onClick={connectWallet}>
        <Refresh />
      </IconButton>
      <CardContent>
        <Typography
          sx={{ fontSize: '0.9rem' }}
          color="text.secondary"
          gutterBottom
        >
          Address
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }} gutterBottom>
          {account}
        </Typography>
        <Typography
          sx={{ fontSize: '0.9rem' }}
          color="text.secondary"
          gutterBottom
        >
          Balance({token.name})
        </Typography>
        <Typography sx={{ fontSize: '1.2rem ' }} component="div">
          {token.balance} {token.symbol}
        </Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextField
              id="outlined-number"
              label="Amount"
              type="number"
              size="small"
              fullWidth
              inputProps={{ style: { fontSize: '0.8rem' } }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-number"
              label="Recipient Address"
              size="small"
              fullWidth
              inputProps={{ style: { fontSize: '0.8rem' } }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setRecipient(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={sendToken}>
              <Send />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Login;
