from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.models.ticket import TicketStatus, TicketPriority

class TicketCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=80)
    description: str = Field(..., min_length=20, max_length=2000)
    priority: TicketPriority = TicketPriority.MEDIUM

class TicketUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=80)
    description: Optional[str] = Field(None, min_length=20, max_length=2000)
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None

class TicketOut(BaseModel):
    id: str
    title: str
    description: str
    status: TicketStatus
    priority: TicketPriority
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
