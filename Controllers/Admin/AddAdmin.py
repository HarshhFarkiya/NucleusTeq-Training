from ConnectSql import connect, disconnect
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import bcrypt

def add_admin():
    #Status : Assigned/Unassigned
    emp_status=False
    #Connection Creation With SQL
    connection = connect()
    cursor_object = connection.cursor()
    try:
        password = 'admin123'
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        escaped_password = connection.converter.escape(hashed_password.decode())
        cursor_object.execute(f"INSERT INTO user_management VALUES ('admin' , 'admin@gmail.com' , '{escaped_password}', 'admin' , NULL)")
        connection.commit()
        return JSONResponse(content={'message': 'Admin Registered Successfully', 'admin_id': 'admin', 'password': 'admin123'},status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        raise Exception("Internal Server Error",e)
    disconnect(connection)
