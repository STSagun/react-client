import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import callApi from '../../libs/utils/api';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  style: {
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#bfbfbf',

  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },

});
class TraineDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, dataList: '', loading: false };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    callApi('get', 'trainee', {}).then((res) => {
      this.setState({ dataList: res.data.data.records.find(element => element.originalId === id), loading: false });
    });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

 getDateFormatted = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

 render() {
   const { classes } = this.props;
   const { dataList } = this.state;
   if (!dataList) {
     return <CircularProgress size={34} className={classes.buttonProgress} />;
   }
   let { createdAt } = dataList;
   createdAt = this.getDateFormatted(createdAt);
   return (
     <>
       <Grid container spacing={40} className={classes.cardGrid}>
         <Grid item key={dataList.name} xs={12} md={12}>
           <Card className={classes.card}>
             <CardMedia
               className={classes.cardMedia}
               image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
               title="Image title"
             />
             <div className={classes.cardDetails}>
               <CardContent>
                 <Typography component="h2" variant="h5">
                   {dataList.name}
                 </Typography>
                 <Typography variant="subheading" color="textSecondary">
                   {createdAt}
                 </Typography>
                 <Typography variant="subheading" paragraph>
                   {dataList.email}
                 </Typography>
               </CardContent>
             </div>

           </Card>
         </Grid>

       </Grid>
       <div className={classes.style}>

         <Button variant="contained" className={classes.button}>
           <Link to="/trainee" className={classes.link}>Back</Link>
         </Button>
       </div>
     </>
   );
 }
}

TraineDetail.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withStyles(styles)(TraineDetail);
