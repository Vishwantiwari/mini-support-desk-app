from datetime import datetime
from pydantic import BaseModel, Field

class CommentCreate(BaseModel):
    author_name: str = Field(min_length=1, max_length=80)
    message: str = Field(min_length=1, max_length=500)

class CommentOut(BaseModel):
    id: str
    ticket_id: str
    author_name: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True
