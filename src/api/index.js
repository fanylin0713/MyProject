import axios from 'axios';
import queryString from 'query-string';
const config = {
  headers: {
    'Authorization' : 'Bearer keyA7EKdngjou4Dgy',
    'Content-Type': 'application/json;charset=UTF-8',
  },
}


// Api docs, http://www.amiiboapi.com/
export const fetchGetCharacterList = (payload) => axios.get(`https://reqres.in/api/users?${queryString.stringify(payload)}`, config)
export const fetchPostStudent = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?view=Grid%20view', payload, config)

export const fetchPostClassMember = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassMember?view=Grid%20view', payload, config)

//announce
export const fetchPostAnnounce = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Announcement?view=Grid%20view', payload, config)
//Teacher
export const fetchPostTeacher = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Teacher?view=Grid%20view', payload, config)
//Course
export const fetchPostCourse = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassDay?view=Grid%20view', payload, config)


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
