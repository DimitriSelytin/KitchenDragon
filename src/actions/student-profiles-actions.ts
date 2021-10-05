import {Dispatch} from "redux";
import {
  STUDENT_PROFILES_FAIL, 
  STUDENT_PROFILES_LOADING, 
  STUDENT_PROFILES_SUCCESS, 
  STUDENT_PROFILES_ADD_TAGS, 
  StudentProfilesDispatchTypes
} from "./student-profiles-action.types";
import axios from "axios";

export const GetStudentProfiles = () => async (dispatch: Dispatch<StudentProfilesDispatchTypes>) => {
  try {
    dispatch({
      type: STUDENT_PROFILES_LOADING
    })

    const res = await axios.get(`https://api.hatchways.io/assessment/students`);

    dispatch({
      type: STUDENT_PROFILES_SUCCESS,
      payload: res.data.students
    })

  } catch(e) {
    dispatch({
      type: STUDENT_PROFILES_FAIL
    })
  }
};

export const StudentProfilesAddTags = (id: string, newTag: string) => async (dispatch: Dispatch<StudentProfilesDispatchTypes>) => {
  try {
    dispatch({
      type: STUDENT_PROFILES_ADD_TAGS,
      payload: { 
        id,
        newTag
      }
    })
  } catch(e) {
    dispatch({
      type: STUDENT_PROFILES_FAIL
    })
  }
};