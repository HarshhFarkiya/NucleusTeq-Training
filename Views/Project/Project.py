def get_project_response(projects):
    all_projects =[]
    keys=["project_id","project_name","project_skills"]
    for project in projects:
        details = {}
        for i in range(0,len(project)):
            details[keys[i]]=project[i]
        all_projects.append(details)
    return all_projects


