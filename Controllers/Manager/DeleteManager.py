from Models.Project.ProjectModel import Project;
from ConnectSql import connect, disconnect
from fastapi import FastAPI
from fastapi.responses import JSONResponse

def delete_manager(id):
    #Connection Creation With SQL
    connection = connect()
    cursor_object = connection.cursor()
    try:
        cursor_object.execute(f"SELECT * FROM managers_information WHERE id='{id}'")
        emp = cursor_object.fetchall()
        check=len(emp)
        if check<=0:
            return JSONResponse(content={"message": "manager Doesnt Exists"}, status_code=404)
        status=emp[0][4]
        if status is not None :
            return JSONResponse(content={"message": "manager already assigned to a project, Unassign before delete the user"}, status_code=200)
        cursor_object.execute(f"DELETE FROM managers_information WHERE id='{id}'")
        cursor_object.execute(f"DELETE FROM user_management WHERE id='{id}'")
        connection.commit()
        return JSONResponse(content={"message": "manager Deleted Successfully"}, status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        raise Exception("Internal Server Error",e)
    finally :
        disconnect(connection)
