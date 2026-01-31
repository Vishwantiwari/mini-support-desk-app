from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.session import engine
from app.db.base import Base
from app.api.v1 import tickets, comments


from app.models.ticket import Ticket
from app.models.comment import Comment

app = FastAPI(title="Mini Support Desk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets.router)
app.include_router(comments.router)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"ok": True}
