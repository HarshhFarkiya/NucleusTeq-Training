import { getSessionVariable } from "../Components/Session";
export const AddProject = async (project) => {
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  const apiUrl = `${SERVER_BASE_URL}/project`;
  const token = getSessionVariable("token");
  const id = getSessionVariable("id");
  project.admin_id = id;
  project.token = token;
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the Content-Type header for JSON data
    },
    body: JSON.stringify(project),
  })
    .then((response) => {
      return response;
    })

    .catch((error) => {
      console.error('Error in POST request:', error);
    });
}

export const FetchAllProjects = async () => {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
    const token = getSessionVariable("token");
    const id = getSessionVariable("id");
    const apiUrl = `${SERVER_BASE_URL}/projects?token=${token}&id=${id}`;
  
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header for JSON data
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error('Error in GET request:', error);
      });
  }

  export const FetchAllProjectEmployees = async (project_id) => {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
    const token = getSessionVariable("token");
    const id = getSessionVariable("id");
    const apiUrl = `${SERVER_BASE_URL}/project/employees?token=${token}&project_id=${project_id}&id=${id}`;
  
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header for JSON data
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error('Error in GET request:', error);
      });
  }



  export const DeleteProject = async (project_id) => {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
    const apiUrl = `${SERVER_BASE_URL}/project?project_id=${project_id}`;
    const token = getSessionVariable("token");
    const id = getSessionVariable("id");
  
    return fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header for JSON data
      },
      body: JSON.stringify({ "project_id": project_id, "token": token, "admin_id": id }),
    })
      .then((response) => {
        return response;
      })
  
      .catch((error) => {
        console.error('Error in POST request:', error);
      });
  }

  export const FetchProject = async (project_id) => {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
    const token = getSessionVariable("token");
    const id = getSessionVariable("id");
    const apiUrl = `${SERVER_BASE_URL}/project?token=${token}&id=${id}&project_id=${project_id}`;
  
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header for JSON data
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error('Error in GET request:', error);
      });
  }