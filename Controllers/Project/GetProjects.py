from ConnectSql import connect, disconnect
from Views.Project import Project
from fastapi import FastAPI
from fastapi.responses import JSONResponse
def get_all_projects():
    #Connection Creation With SQL
    connection = connect()
    cursor_object = connection.cursor()
    try:
        #Query to find all the employees
        cursor_object.execute("SELECT * FROM project_information")
        result = cursor_object.fetchall()
        all_projects = Project.get_project_response(result)
        connection.commit()
        return JSONResponse(content={'message': 'All Projects Fetched Successfully', 'result':all_projects},status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        raise Exception("Internal Server Error",e)
    finally:
        disconnect(connection)
