import { Button, Card, TextField, Typography } from '@mui/material';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import GlobalContext from '../../../Context/GlobalContext';
import { AxiosError } from 'axios';
import Axios from '../../../AxiosInstance';
import Cookies from 'js-cookie';

const GoalsCard = ({ comment = { id: -1, msg: '' }, setComments = () => { } }) => {
  const { user, setStatus } = useContext(GlobalContext);
  const [isConfirm, setIsConfirm] = useState(false);
  const [functionMode, setFunctionMode] = useState('update');
  const [msg, setMsg] = useState(comment.msg);
  const [msgError, setMsgError] = useState('');

  const submit = useCallback(async () => {
    if (functionMode === 'update') {
     
      if (!validateForm()) return;
      try {
        const userToken = Cookies.get('UserToken');
        const response = await Axios.patch(
          '/comment',
          {
            text: msg,
            commentId: comment.id,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        if (response.data.success) {
          setStatus({ severity: 'success', msg: 'Update goals successfully' });
          setComments((comments) => comments.map((c) => (c.id === comment.id ? { ...c, msg: response.data.data.text } : c)));
          cancelAction();
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setStatus({ severity: 'error', msg: error.response.data.error });
        } else {
          setStatus({ severity: 'error', msg: error.message });
        }
      }
    } else if (functionMode === 'delete') {
      try {
        const userToken = Cookies.get('UserToken');
        const response = await Axios.delete('/comment', {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { commentId: comment.id }
        }
        );
        if (response.data.success) {
          setStatus({ severity: 'success', msg: 'Delete goals successfully' });
          setComments((comments) => comments.filter((c) => c.id !== comment.id));
          cancelAction();
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setStatus({ severity: 'error', msg: error.response.data.error });
        } else {
          setStatus({ severity: 'error', msg: error.message });
        }
      }
    } else {
      console.log('error');
    }
  }, [functionMode, msg]);

  const validateForm = () => {
    let isValid = true;
    if (!msg) {
      setMsgError('Comment is required');
      isValid = false;
    }
    return isValid;
  }

  const changeMode = (mode) => {
    setFunctionMode(mode);
    setIsConfirm(true);
  };

  const cancelAction = () => {
    setFunctionMode('');
    setIsConfirm(false);
  };

  return (
    <Card sx={{ p: '1rem', m: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' , backgroundColor: '#EA5455'}}>
      {!(isConfirm && functionMode == 'update') ? (
        <Typography sx={{ flex: 1 , color: 'white'}}>{comment.msg}</Typography>
      ) : (
        <TextField sx={{ flex: 1 }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          error={msgError !== ''}
          helperText={msgError} />
      )}
      {!isConfirm ? (
        <Button onClick={() => changeMode('update')} variant="outlined"  sx={{backgroundColor: 'white'}}>
          update
        </Button>
      ) : (
        <Button onClick={submit} variant="outlined"  sx={{backgroundColor: 'white'}}>
          confirm
        </Button>
      )}
      {!isConfirm ? (
        <Button onClick={() => changeMode('delete')} variant="outlined"  sx={{backgroundColor: 'white'}}>
          delete
        </Button>
      ) : (
        <Button onClick={cancelAction} variant="outlined"  sx={{backgroundColor: 'white'}}>
          cancel
        </Button>
      )}
    </Card>
  );
};

export default GoalsCard;