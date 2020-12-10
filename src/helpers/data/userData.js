// import axios from 'axios';

// const baseUrl = 'https://ec13-capstone-default-rtdb.firebaseio.com/users';

// const checkIfUserIsInFirebase = (user) => {
//   axios
//     .get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${user.userId}"`)
//     .then((resp) => {
//       if (Object.values(resp.data).length === 0) {
//         axios.post(`${baseUrl}/users.json`, user).then((response) => {
//           const updateIt = { firebaseKey: response.data.name };
//           axios.patch(`${baseUrl}/users/${response.data.name}.json`, updateIt);
//         }).catch((error) => console.warn(error));
//       } else {
//         console.warn('This user already exists');
//       }
//     }).catch((error) => console.error(error));
// };

// const setTheCurrentUser = (userObject) => {
//   const user = {
//     userId: userObject.userId,
//     name: userObject.name,
//   };
//   checkIfUserIsInFirebase(user);
//   return user;
// };

// export default setTheCurrentUser;
