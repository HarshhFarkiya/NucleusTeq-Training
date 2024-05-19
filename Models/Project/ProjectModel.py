from sqlalchemy import Column, Integer, String,Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Project(Base):
    __tablename__ = 'project_information'
    project_id = Column(String, primary_key=True)
    project_name = Column(String)
    skills_required = Column(String)

