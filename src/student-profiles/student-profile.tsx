import {useState} from 'react';
import {useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { StudentType } from '../actions/student-profiles-action.types';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { StudentProfilesAddTags } from '../actions/student-profiles-actions';

type StudentProfileProps = {
  student: StudentType
}

const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;
const stringAverage = (array: string[]) => average(array.map((i) => Number(i)));

function StudentProfile(props: StudentProfileProps) {
  const { student } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [newTag, setNewTag] = useState('');
  const handleNewTagChange = (event: any) => {
    setNewTag(event.target.value);
  };
  const handleNewTagBlur = () => {
    if(newTag.length >= 1){
      dispatch(StudentProfilesAddTags(student.id, newTag))
    }
    setNewTag('');
  };

  return (
    <div className={classes.container} >
      <div className={classes.leftPanel}>
        <Avatar aria-label="recipe" className={classes.avatar} src={student.pic} />
      </div>
      <div className={classes.rightPanel}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h4" className={classes.bold} gutterBottom>{student.firstName} {student.lastName}</Typography>
          </Grid>
          <Grid item>
            <IconButton 
              color="primary" 
              aria-label={expanded ? "Fewer Details" : "More Details" } 
              onClick={() => { setExpanded(!expanded) }}
            >
              {expanded ? <RemoveIcon className={classes.icon} /> : <AddIcon className={classes.icon}/> }
            </IconButton>
          </Grid>
        </Grid>
        <div className={classes.details}>
          <Typography variant="body1">Email: {student.email}</Typography>
          <Typography variant="body1">Companyy: {student.company}</Typography>
          <Typography variant="body1">Skill: {student.skill}</Typography>
          <Typography variant="body1">Average: {stringAverage(student.grades)}%</Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <br/>
            {student.grades.map((grade, i) => <Typography key={i} variant="body1">Test {i+1}&emsp;&emsp;{grade}%</Typography>)}
          </Collapse>
        </div>
        <div className={`${classes.details} ${classes.extraPadding}`}>
          <div>
            {student.tags && student.tags.map((tag) => <Chip label={tag} className={classes.chipColor} variant="outlined" />)}
          </div>
          <TextField 
            id="standard-basic" 
            label="Add a tag"
            value={newTag} 
            onChange={handleNewTagChange}
            onBlur={handleNewTagBlur}
          />
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 5,
    display: 'flex',
    borderBottom: `1px solid ${grey[400]}`
  },
  leftPanel: {
    width: 175
  },
  rightPanel: {
    width: 'calc(100% - 200px)'
  },
  details: {
    color: grey[600],
    paddingLeft: 15
  },
  icon: {
    fontSize: 40,
    color: grey[600],
  },
  avatar: {
    width: 100,
    height: 100,
    border: `1px solid ${grey[400]}`,
    margin: 30
  },
  chipColor:{
    backgroundColor: grey[200]
  },
  extraPadding:{
    paddingTop: 15
  },
  bold:{
    fontWeight: 'bold'
  }
}));

export default StudentProfile;