import React from 'react';
import './styles.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';


import AddJobModal from './../modal/addJobModal';
import AddCompanyModal from './../modal/addCompanyModal'
import SearchBar from './../searchBar';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  }
}))


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <SearchBar/>
            <div className={classes.grow} />
            <AddCompanyModal/>
            <AddJobModal/>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

// class Header extends Component {

//   render() {
//     return(
//       {/* <header className="header">
//         <span className="search-input-wrapper"><input type="text"/></span>
//         <span className="search-status-wrapper">
//           <select>
//             <option>Interested</option>
//             <option>Applying</option>
//             <option>Interviewing</option>
//             <option>Rejected</option>
//             <option>No Response</option>
//             <option>Offer</option>
//             <option>Accepted</option>
//           </select>
//         </span>
//         <addJobModal/>
//       </header> */}
//     )
//   }
// }

// export default Header