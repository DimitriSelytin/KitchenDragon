import TextField from '@material-ui/core/TextField';

type StudentProfilesHeaderProps = {
  nameFilter: string,
  setNameFilter: any,
  tagFilter: string,
  setTagFilter: any
}

function StudentProfilesHeader(props: StudentProfilesHeaderProps) {
  const { 
    nameFilter, 
    setNameFilter,
    tagFilter,
    setTagFilter
  } = props;
  const handleNameChange = (event: any) => {
    setNameFilter(event.target.value);
  };
  const handleTagChange = (event: any) => {
    setTagFilter(event.target.value);
  };

  return (
    <div >
      <TextField 
        id="standard-basic" 
        label="Search by name"
        fullWidth
        value={nameFilter} 
        onChange={handleNameChange}
      />
      <TextField 
        id="standard-basic" 
        label="Search by tag" 
        fullWidth
        value={tagFilter} 
        onChange={handleTagChange}
      />
    </div>
  );
}

export default StudentProfilesHeader;