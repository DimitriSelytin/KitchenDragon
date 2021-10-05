import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store";
import {GetStudentProfiles} from "../actions/student-profiles-actions";
import StudentProfilesHeader from './student-profiles-header';
import StudentProfile from './student-profile';
import { grey } from '@material-ui/core/colors';
import { StudentType } from '../actions/student-profiles-action.types';


const filterStudents = (array: StudentType[], nameFilter: string, tagFilter: string) => {
  var filteredArray = [...array];

  if(!!nameFilter) {
    filteredArray = filteredArray.filter((student: StudentType) => { 
      return student.firstName.toLowerCase().includes(nameFilter.toLowerCase()) || 
             student.lastName.toLowerCase().includes(nameFilter.toLowerCase());
    });
  }

  if(!!tagFilter) {
    filteredArray = filteredArray.filter((student: StudentType) => {
      return student.tags && student.tags.some((element: string) => { 
        return element.toLowerCase().includes(tagFilter.toLowerCase())
      });
    });
  }

  return filteredArray;
}


function StudentProfilesPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {dispatch(GetStudentProfiles())}, [dispatch]);
  const studentProfilesState = useSelector((state: RootStore) => state.studentProfiles);
  const [nameFilter, setNameFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  return (
    <div className={classes.background}>
      <div className={classes.body}>
        <StudentProfilesHeader 
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
        />
        <div className={classes.scrollable}>
          {studentProfilesState.studentProfiles && (
            filterStudents(studentProfilesState.studentProfiles, nameFilter, tagFilter).map((student) => <StudentProfile key={student.id} student={student}/>)
          )}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: grey[300],
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  body: {
    fontFamily: 'Raleway',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: grey[50],
    margin: 'auto',
    width: '80%',
    position: 'absolute',
    padding: 10,
    top: 40,
    bottom: 40,
    left: 10,
    right: 10,
    borderRadius: 10,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  scrollable: {
    overflowY: 'auto'
  }
}));

export default StudentProfilesPage;