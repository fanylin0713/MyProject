import axios from 'axios';
import queryString from 'query-string';
const config = {
  headers: {
    'Authorization' : 'Bearer keyA7EKdngjou4Dgy',
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

const deleteURL = 'https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Teacher/'
const CourseDeleteURL = 'https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassDay/'


// Api docs, http://www.amiiboapi.com/
export const fetchGetCharacterList = (payload) => axios.get(`https://reqres.in/api/users?${queryString.stringify(payload)}`, config)
export const fetchPostStudent = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?view=Grid%20view', payload, config)

export const fetchPostClassMember = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassMember?view=Grid%20view', payload, config)

//announce
export const fetchPostAnnounce = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Announcement?view=Grid%20view', payload, config)
//Teacher
export const fetchPostTeacher = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Teacher?view=Grid%20view', payload, config)

//TeacherDelete
export const fetchDeleteTeacher = (payload) => axios.delete(deleteURL + payload ,config)
.then(res => {
  console.log(res)
})
.catch(err => {
  console.error(err); 
})

//Course
export const fetchPostCourse = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassDay?view=Grid%20view', payload, config)

//CourseDelete
export const fetchDeleteCourse = (payload) => axios.delete(CourseDeleteURL + payload ,config)
.then(res => {
  console.log(res)
})
.catch(err => {
  console.error(err); 
})

//Progresspage Schedule
export const fetchPostSchedule = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Schedule?view=Grid%20view', payload, config)

//RollCall attend
export const fetchPostAttend = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Attend?view=Grid%20view', payload, config)

//Makeup Class
export const fetchPostReserveStudent = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ReserveStudent?view=Grid%20view', payload, config)


// this.Axios = axios.create({
//   baseURL: "http://localhost:8080",
//   headers:{'content-type':'application/json','Access-Control-Allow-Origin':'*'}

// });
// this.Axios.get("/retrieveface")
//   .then(function(response){
//     console.log(respones.status);
//     console.log('open camera');
//   })
//   .catch(function(error){
//     return error;
//   });
