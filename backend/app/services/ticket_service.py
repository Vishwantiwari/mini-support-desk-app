from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories import ticket_repo
from typing import List
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate

def create(db: Session, data: TicketCreate):
    return ticket_repo.create_ticket(db, data)

def get(db: Session, ticket_id: str):
    ticket = ticket_repo.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

def list(db: Session, **kwargs) -> List[Ticket]:
    return ticket_repo.list_tickets(db, **kwargs)

def update(db: Session, ticket_id: str, data: TicketUpdate):
    ticket = get(db, ticket_id)
    return ticket_repo.update_ticket(db, ticket, data)

def delete(db: Session, ticket_id: str) -> bool:
    return ticket_repo.delete_ticket(db, ticket_id)