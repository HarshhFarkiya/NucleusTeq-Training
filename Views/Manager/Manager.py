def get_manager_response(managers):
    all_managers =[]
    keys=["manager_id","manager_name","manager_email","manager_phone","project_assigned"]
    for manager in managers:
        details = {}
        for i in range(0,len(manager)):
            details[keys[i]]=manager[i]
        all_managers.append(details)
    return all_managers


