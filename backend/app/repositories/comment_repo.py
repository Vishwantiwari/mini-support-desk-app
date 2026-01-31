from sqlalchemy.orm import Session
from uuid import uuid4
from datetime import datetime
from app.models.comment import Comment

def create_comment(db: Session, ticket_id: str, data):
    comment = Comment(
        id=str(uuid4()),
        ticket_id=ticket_id,
        author_name=data.author_name,
        message=data.message,
        created_at=datetime.utcnow(),
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

def list_comments(db: Session, ticket_id: str):
    return db.query(Comment).filter(Comment.ticket_id == ticket_id).all()
