from ConnectSql import connect, disconnect
from Views.Admin import ResourceRequests
from fastapi import FastAPI
from fastapi.responses import JSONResponse
def get_all_requests():
    connection = connect()
    cursor_object = connection.cursor()
    try:
        cursor_object.execute(f"SELECT * FROM resources_requested")
        requests = cursor_object.fetchall()
        final_requests = ResourceRequests.get_all_requests(requests)
        return JSONResponse(content={'message': 'Requests Fetched Successfully', 'result': final_requests},status_code=200)
    except Exception as e: 
        print("Some Error Occured", e)
        disconnect(connection)
        raise Exception("Internal Server Error",e)
    finally:
        disconnect(connection)
