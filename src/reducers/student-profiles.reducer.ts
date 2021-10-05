import {
    STUDENT_PROFILES_FAIL,
    STUDENT_PROFILES_LOADING,
    STUDENT_PROFILES_SUCCESS,
    STUDENT_PROFILES_ADD_TAGS,
    StudentProfilesDispatchTypes,
    StudentType
  } from "../actions/student-profiles-action.types";
  
interface DefaultState {
    loading: boolean,
    studentProfiles: StudentType[]
}

const defaultState: DefaultState = {
    loading: false,
    studentProfiles: []
};

const studentProfilesReducer = (state: DefaultState = defaultState, action: StudentProfilesDispatchTypes) : DefaultState => {
    switch (action.type) {
        case STUDENT_PROFILES_FAIL:
            return {
                ...state,
                loading: false,
            };
        case STUDENT_PROFILES_LOADING:
            return {
                ...state,
                loading: true,
            };
        case STUDENT_PROFILES_SUCCESS:
            return {
                loading: false,
                studentProfiles: action.payload
            };
        case STUDENT_PROFILES_ADD_TAGS:
            //yeah, probably should have added a lot of this logic in the action, but I didn't want to get the selectors set up.
            let updatedStudents = [...state.studentProfiles];
            const indexOfStudent = updatedStudents.findIndex(student => student.id === action.payload.id);
            let currentTags: string[] = [];
            if(!!updatedStudents[indexOfStudent].tags) {
                const otherTags: any = updatedStudents[indexOfStudent].tags; //And I know I can do this better...
                currentTags = [...otherTags];
            }
            updatedStudents[indexOfStudent].tags = [...currentTags, action.payload.newTag];
            return {
                ...state,
                studentProfiles: [...updatedStudents]
            };
        default:
        return state
    }
};


export default studentProfilesReducer