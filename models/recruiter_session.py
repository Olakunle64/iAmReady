# #!/usr/bin/env python3
# """ UserSession module
# """
# from models.parent_model import ParentModel, Base
# from sqlalchemy import Column, String, ForeignKey



# class RecruiterSession(ParentModel, Base):
#     """A RecruiterSession class that inherit from parent model"""
#     __tablename__ = "recruiter_session"
#     user_id = Column("user_id", String(60), ForeignKey('recruiters.id'), nullable=False)
#     session_id = Column(String(60), nullable=False, unique=True)
