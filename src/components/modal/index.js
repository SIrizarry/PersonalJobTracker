import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

export default function FormDialog() {

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(e) {
    console.log({[e.target.name] : e.target.value})
  }

  return (
    <div className="modal-component-container">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faSuitcase}/>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Job</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Job Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="company"
            label="Company"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline
            fullWidth
          />
          <TextField
            id="standard-select-currency-native"
            select
            label="Status"
            onChange={handleChange}
            helperText="Please select your currency"
            margin="normal"
          >
            <option name="Interested" value="Interested">Interested</option>
            <option name="Applying" value="Applying">Applying</option>
            <option name="Interviewing" value="Interviewing">Interviewing</option>
            <option name="Rejected" value="Rejected">Rejected</option>
            <option name="No Response" value="NoResponse">No Response</option>
            <option name="Offer" value="Offer">Offer</option>
            <option name="Accepted" value="Accepted">Accepted</option>
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}