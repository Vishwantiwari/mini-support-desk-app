from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories import comment_repo
from app.repositories import ticket_repo

def list(db: Session, ticket_id: str):
    if not ticket_repo.get_ticket(db, ticket_id):
        raise HTTPException(status_code=404, detail="Ticket not found")
    return comment_repo.list_comments(db, ticket_id)

def create(db: Session, ticket_id: str, data):
    if not ticket_repo.get_ticket(db, ticket_id):
        raise HTTPException(status_code=404, detail="Ticket not found")
    return comment_repo.create_comment(db, ticket_id, data)
