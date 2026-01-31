from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services import comment_service
from app.schemas.comment import CommentCreate, CommentOut

router = APIRouter(prefix="/tickets/{ticket_id}/comments", tags=["Comments"])

@router.get("", response_model=list[CommentOut])
def list_comments(ticket_id: str, db: Session = Depends(get_db)):
    return comment_service.list(db, ticket_id)

@router.post("", response_model=CommentOut, status_code=201)
def create_comment(ticket_id: str, data: CommentCreate, db: Session = Depends(get_db)):
    return comment_service.create(db, ticket_id, data)
