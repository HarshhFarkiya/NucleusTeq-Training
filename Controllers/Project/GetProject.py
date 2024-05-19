from ConnectSql import connect, disconnect
from Views.Project import Project
from fastapi import FastAPI
from fastapi.responses import JSONResponse
def get_project(project_id):
    #Connection Creation With SQL
    connection = connect()
    cursor_object = connection.cursor()
    try:
        #Query to find all the details of a project
        cursor_object.execute(f"SELECT * FROM project_information WHERE project_id='{project_id}'")
        result = cursor_object.fetchall()
        all_projects = Project.get_project_response(result)
        connection.commit()
        return JSONResponse(content={'message': 'project Details Fetched Successfully', 'result': all_projects},status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        raise Exception("Internal Server Error",e)
    finally:
        disconnect(connection)
