from Models.Project.ProjectModel import Project;
from ConnectSql import connect, disconnect
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json 
def assign_project_manager(project):
    #Connection Creation With SQL
    connection = connect()
    cursor_object = connection.cursor()
    try:
        required_parameters = ['manager_id','project_id']
        if not all(param in project for param in required_parameters):
            return JSONResponse(content={"message": "Missing Parameters"}, status_code=422)
        #To check wether the project exists or not
        cursor_object.execute(f"SELECT * FROM project_information WHERE project_id = '{project['project_id']}'")
        check = len(cursor_object.fetchall())
        if int(check) <= 0:
            return JSONResponse(content={"message":"Project Doesn't Exists, Please Provide a Valid Active Project Id"},status_code=404)
        cursor_object.execute(f"SELECT * FROM managers_information WHERE id = '{project['manager_id']}'")
        check = len(cursor_object.fetchall())
        if int(check) <= 0:
            return JSONResponse(content={"message":"Manager Doesn't Exists, Please Provide a Valid Manager Id"},status_code=404)

        cursor_object.execute(f"SELECT managers_id FROM project_assigned WHERE project_id='{project['project_id']}'")
        prev_managers_result = cursor_object.fetchone()
        if prev_managers_result is not None:
            prev_managers = prev_managers_result[0]
            if prev_managers:
                prev_managers = json.loads(prev_managers)
            else:
                prev_managers = []
        else:
            prev_managers = []
        if project['manager_id'] in prev_managers:
            return JSONResponse(content={'message': 'Manager Already Assigned'},status_code=200)
        prev_managers.append(project['manager_id'])
        new_managers_json = json.dumps(prev_managers)
        cursor_object.execute(f"UPDATE project_assigned SET managers_id = %s WHERE project_id = %s", (new_managers_json, project['project_id']))
        cursor_object.execute(f"SELECT projects_assigned FROM managers_information WHERE id='{project['manager_id']}'")
        prev_project_result = cursor_object.fetchone()
        if prev_project_result is not None:
            prev_projects = prev_project_result[0]
            if prev_projects:
                prev_projects = json.loads(prev_projects)
            else:
                prev_projects = []
        else:
            prev_projects = []
        if project['project_id'] in prev_projects:
            return JSONResponse(content={'message': 'Project Already Assigned'},status_code=200)
        prev_projects.append(project['project_id'])
        new_projects_json = json.dumps(prev_projects)
        cursor_object.execute(f"UPDATE managers_information SET projects_assigned = %s WHERE id = %s", (new_projects_json, project['manager_id']))
        connection.commit()
        return JSONResponse(content={'message': 'Project Assigned To Manager Successfully'},status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        raise Exception("Internal Server Error",e)
    finally :
        disconnect(connection)
