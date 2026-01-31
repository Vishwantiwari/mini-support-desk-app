from uuid import uuid4
from datetime import datetime
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.ticket import Ticket, TicketStatus, TicketPriority
from app.models.comment import Comment

SAMPLE_TICKETS = [
    {
        "title": "Cannot login to dashboard",
        "description": "I am unable to login since morning. It says invalid token even after resetting password.",
        "priority": TicketPriority.HIGH,
        "status": TicketStatus.OPEN,
        "comments": [
            {"author_name": "Support Bot", "message": "Thanks! We are looking into it."},
        ],
    },
    {
        "title": "Billing mismatch on invoice",
        "description": "Invoice amount is higher than expected. Please check the tax calculation and line items.",
        "priority": TicketPriority.MEDIUM,
        "status": TicketStatus.IN_PROGRESS,
        "comments": [
            {"author_name": "Aayushi", "message": "Sharing the invoice ID: INV-10291"},
            {"author_name": "Agent", "message": "We are reviewing the invoice breakdown."},
        ],
    },
    {
        "title": "Feature request: dark mode toggle",
        "description": "Please add a user setting to toggle dark mode and persist it across sessions.",
        "priority": TicketPriority.LOW,
        "status": TicketStatus.RESOLVED,
        "comments": [
            {"author_name": "PM", "message": "Added to roadmap. Thanks for the suggestion."},
        ],
    },
]

def _ticket_exists(db: Session, title: str) -> bool:
    return db.query(Ticket).filter(Ticket.title == title).first() is not None

def seed():
    db = SessionLocal()
    try:
        inserted = 0

        for t in SAMPLE_TICKETS:
            if _ticket_exists(db, t["title"]):
                continue

            ticket_id = str(uuid4())
            now = datetime.utcnow()

            ticket = Ticket(
                id=ticket_id,
                title=t["title"],
                description=t["description"],
                status=t["status"],
                priority=t["priority"],
                created_at=now,
                updated_at=now,
            )
            db.add(ticket)

            for c in t.get("comments", []):
                comment = Comment(
                    id=str(uuid4()),
                    ticket_id=ticket_id,
                    author_name=c["author_name"],
                    message=c["message"],
                    created_at=datetime.utcnow(),
                )
                db.add(comment)

            inserted += 1

        db.commit()
        print(f"✅ Seed complete. Inserted {inserted} new ticket(s).")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
