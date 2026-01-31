from fastapi import APIRouter, Depends, Query , HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services import ticket_service
from typing import Optional
from app.schemas.ticket import TicketCreate, TicketUpdate, TicketOut
from app.models.ticket import TicketStatus, TicketPriority

router = APIRouter(prefix="/tickets", tags=["Tickets"])

@router.get("", response_model=list[TicketOut])
def list_tickets(
    q: Optional[str] = None,
    status: Optional[TicketStatus] = None,
    priority: Optional[TicketPriority] = None,
    sort: str = Query(default="createdAt"),
    order: str = Query(default="desc"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, le=50),
    db: Session = Depends(get_db),
):
    offset = (page - 1) * limit
    return ticket_service.list(
        db,
        q=q,
        status=status,
        priority=priority,
        sort=sort,
        order=order,
        offset=offset,
        limit=limit,
    )

@router.post("", response_model=TicketOut, status_code=201)
def create_ticket(data: TicketCreate, db: Session = Depends(get_db)):
    return ticket_service.create(db, data)

@router.get("/{ticket_id}", response_model=TicketOut)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    return ticket_service.get(db, ticket_id)

@router.patch("/{ticket_id}", response_model=TicketOut)
def update_ticket(ticket_id: str, data: TicketUpdate, db: Session = Depends(get_db)):
    return ticket_service.update(db, ticket_id, data)

@router.delete("/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket(ticket_id: str, db: Session = Depends(get_db)):
    deleted = ticket_service.delete(db, ticket_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return