from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from uuid import uuid4
from datetime import datetime
from typing import Optional
from app.models.ticket import Ticket, TicketStatus, TicketPriority
from app.models.comment import Comment

def create_ticket(db: Session, data):
    ticket = Ticket(
        id=str(uuid4()),
        title=data.title,
        description=data.description,
        priority=data.priority,
        status=TicketStatus.OPEN,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket

def get_ticket(db: Session, ticket_id: str):
    return db.get(Ticket, ticket_id)

def list_tickets(
    db: Session,
    q: Optional[str],
    status: Optional[TicketStatus],
    priority: Optional[TicketPriority],
    sort: str,
    order: str,
    offset: int,
    limit: int,
):
    stmt = select(Ticket)

    if q:
        stmt = stmt.where(
            or_(
                Ticket.title.ilike(f"%{q}%"),
                Ticket.description.ilike(f"%{q}%"),
            )
        )

    if status:
        stmt = stmt.where(Ticket.status == status)

    if priority:
        stmt = stmt.where(Ticket.priority == priority)

    if sort == "createdAt":
        stmt = stmt.order_by(Ticket.created_at.desc())

    return db.execute(stmt.offset(offset).limit(limit)).scalars().all()

def update_ticket(db: Session, ticket: Ticket, data):
    for field, value in data.dict(exclude_unset=True).items():
        setattr(ticket, field, value)
    ticket.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(ticket)
    return ticket

def delete_ticket(db: Session, ticket_id: str) -> bool:
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        return False

    db.query(Comment).filter(Comment.ticket_id == ticket_id).delete()

    db.delete(ticket)
    db.commit()
    return True