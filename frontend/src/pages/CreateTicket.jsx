import { useForm } from "react-hook-form";
import { createTicket } from "../api/tickets";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function CreateTicket() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", description: "", priority: "MEDIUM" },
  });

  const onSubmit = async (data) => {
    setApiError("");
    try {
      await createTicket(data);
      navigate("/");
    } catch (e) {
      setApiError("Could not create ticket. Please try again.");
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <Link className="btn" to="/">← Back</Link>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 14 }}>
        <div style={{ fontSize: 28, fontWeight: 900 }}>Create Ticket</div>
        <div style={{ color: "var(--muted)", marginTop: 6 }}>
          Provide a clear title and detailed description for faster resolution.
        </div>

        {apiError && (
          <div style={{ marginTop: 12, color: "var(--danger)", fontSize: 12 }}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 16, display: "grid", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}>Title</div>
            <input
              className="input"
              placeholder="Short summary (e.g. Cannot login)"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" },
                maxLength: { value: 80, message: "Max 80 characters" },
              })}
            />
            {errors.title && (
              <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 6 }}>
                {errors.title.message}
              </div>
            )}
          </div>

          <div>
            <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}>Description</div>
            <textarea
              className="textarea"
              rows={6}
              placeholder="Describe the issue in detail…"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 20, message: "Description must be at least 20 characters" },
                maxLength: { value: 2000, message: "Max 2000 characters" },
              })}
            />
            {errors.description && (
              <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 6 }}>
                {errors.description.message}
              </div>
            )}
          </div>

          <div>
            <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}>Priority</div>
            <select className="select" {...register("priority", { required: true })}>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
            <Link className="btn" to="/">Cancel</Link>
            <button className={`btn btnPrimary`} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating…" : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
