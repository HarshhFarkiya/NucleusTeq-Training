def get_all_requests(requests):
    all_requests =[]
    keys=["project_id","manager_id","resource_id","status"]
    for request in requests:
        details = {}
        for i in range(0,len(request)):
            details[keys[i]]=request[i]
        all_requests.append(details)
    return all_requests


