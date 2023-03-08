import { useEffect } from "react";

function Main(props) {

  // FB - Important! Example of usint JWT to confirm a user is authorized

  const getList = async() => {
  
    const API_URL = 'http://localhost:3001/list'
    let token;

    if(props.user){
      token = await props.user.getIdToken();
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      // setList(data);
        }
    }

    useEffect(() => {
      getList();
    }, [props.user]);

// This ends here
    return (
     <h1>Test</h1>
    )
  }
  
  export default Main;
  