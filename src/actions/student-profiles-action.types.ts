export const STUDENT_PROFILES_LOADING = "STUDENT_PROFILES_LOADING";
export const STUDENT_PROFILES_FAIL = "STUDENT_PROFILES_FAIL";
export const STUDENT_PROFILES_SUCCESS = "STUDENT_PROFILES_SUCCESS";
export const STUDENT_PROFILES_ADD_TAGS = "STUDENT_PROFILES_ADD_TAGS";

export type StudentType = {
  city: string,
  company: string,
  email: string,
  firstName: string,
  grades: string[],
  id: string,
  lastName: string,
  pic: string,
  skill: string,
  tags?: string[]
}

export interface StudentProfilesLoading {
  type: typeof STUDENT_PROFILES_LOADING
}

export interface StudentProfilesFail {
  type: typeof STUDENT_PROFILES_FAIL
}

export interface StudentProfilesSuccess {
  type: typeof STUDENT_PROFILES_SUCCESS,
  payload: StudentType[]
}

export type AddTagPayloadType = {
  id: string,
  newTag: string
}

export interface StudentProfilesAddTags {
  type: typeof STUDENT_PROFILES_ADD_TAGS,
  payload: AddTagPayloadType
}

export type StudentProfilesDispatchTypes = StudentProfilesLoading | StudentProfilesFail | StudentProfilesSuccess | StudentProfilesAddTags