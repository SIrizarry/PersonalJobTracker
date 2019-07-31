import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CompanyIcon from '@material-ui/icons/DomainRounded';

import nl2br from 'nl2br';

import { makeStyles } from '@material-ui/core/styles';
import './styles.css'

const useStyles = makeStyles(({
  grow: {
    flexGrow: 1,
  }
}))

export default function AddJobModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  let [values, setValues] = React.useState({
    name: '',
    phone: '',
    email: '',
    industry: 'Interested',
    logo: ''
  })

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    console.log(values);
    fetch("http://localhost:8000/api/addCompany", {
      method: 'post',
      headers:{
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(res => console.log(res))
    .then(response => response.json())
    .then(setOpen(false))
    .catch(err => console.log(err))    
  }

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  return (
    <div className={classes.grow}>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <CompanyIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Company</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company Name"
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            value={values.phone}
            onChange={handleChange('phone')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Company E-Mail"
            type="text"
            value={values.email}
            onChange={handleChange('email')}
            multiline
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="industry"
            label="Industry"
            type="text"
            value={values.Industry}
            onChange={handleChange('industry')}
            fullWidth
          />
          <TextField
              autoFocus
              margin="dense"
              id="logo"
              label="Logo"
              type="text"
              value={values.logo}
              onChange={handleChange('logo')}
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}