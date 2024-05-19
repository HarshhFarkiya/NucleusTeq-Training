from Models.Manager.ManagerModel import Manager;
from ConnectSql import connect, disconnect
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import bcrypt
def add_manager(manager):
    emp_status=False
    connection = connect()
    cursor_object = connection.cursor()
    try:
        required_parameters = ['email','phone','name']
        if not all(param in manager for param in required_parameters):
            return JSONResponse(content={"message": "Missing Parameters"}, status_code=422)
        cursor_object.execute("SELECT managers FROM users_count")
        result = cursor_object.fetchone()
        id=int(result[0]) + 1
        cursor_object.execute(f"SELECT * FROM managers_information WHERE email = '{manager['email']}'")
        check = len(cursor_object.fetchall())
        if int(check) > 0:
            return JSONResponse(content={'message' : 'User Already Exists'},status_code=409)
        new_manager = Manager(id=id,name = manager['name'], email=manager['email'], phone = manager['phone'])
        cursor_object.execute(f"INSERT INTO managers_information VALUES ('MNG{new_manager.id}', '{new_manager.name}', '{new_manager.email}', '{new_manager.phone}',NULL)")
        password = new_manager.email +"@"+ str(new_manager.id)
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        escaped_password = connection.converter.escape(hashed_password.decode())
        cursor_object.execute(f"INSERT INTO user_management VALUES ('MNG{new_manager.id}' , '{new_manager.email}' , '{escaped_password}', 'manager', NULL)")
        cursor_object.execute(f"UPDATE users_count SET managers={id}")
        connection.commit()
        return JSONResponse(content={'message': 'User Added Successfully', 'manager_id': new_manager.id, 'password': password},status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        return JSONResponse(content={'message': 'Some Error Occured'},status_code=500)
        raise Exception("Internal Server Error",e)
    disconnect(connection)
