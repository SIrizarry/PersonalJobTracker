import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import WorkIcon from '@material-ui/icons/WorkRounded';

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
    title: '',
    company: '',
    description: '',
    status: 'Interested',
    compensation: ''
  })

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    nl2br(values.description);
    console.log(values.description);
    fetch("http://localhost:8000/api/addJob", {
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
        <WorkIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Job</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Job Title"
            type="text"
            value={values.title}
            onChange={handleChange('title')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="company"
            label="Company"
            type="text"
            value={values.company}
            onChange={handleChange('company')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            value={values.description}
            onChange={handleChange('description')}
            multiline
            fullWidth
          />
          <TextField
            id="status"
            select
            label="Status"
            value={values.status}
            onChange={handleChange('status')}
            margin="dense"
            fullWidth
          >
            <MenuItem name="Interested" value="Interested">Interested</MenuItem>
            <MenuItem name="Applying" value="Applying">Applying</MenuItem>
            <MenuItem name="Interviewing" value="Interviewing">Interviewing</MenuItem>
            <MenuItem name="Rejected" value="Rejected">Rejected</MenuItem>
            <MenuItem name="No Response" value="NoResponse">No Response</MenuItem>
            <MenuItem name="Offer" value="Offer">Offer</MenuItem>
            <MenuItem name="Accepted" value="Accepted">Accepted</MenuItem>
        </TextField>
        <TextField
            autoFocus
            margin="dense"
            id="compensation"
            label="Compensation"
            type="text"
            value={values.compensation}
            onChange={handleChange('compensation')}
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