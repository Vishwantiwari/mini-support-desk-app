import { useForm } from "react-hook-form";
import { createComment } from "../api/comments";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CommentForm({ ticketId }) {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { author_name: "", message: "" },
  });

  const onSubmit = async (data) => {
    setApiError("");
    try {
      await createComment(ticketId, data);
      reset();
      queryClient.invalidateQueries({ queryKey: ["comments", ticketId] });
    } catch (e) {
      setApiError("Could not add comment. Please try again.");
    }
  };

  return (
    <div className="card2" style={{ padding: 14 }}>
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Add a comment</div>

      {apiError && (
        <div style={{ marginBottom: 10, color: "var(--danger)", fontSize: 12 }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 10 }}>
        <div>
          <input
            className="input"
            placeholder="Your name"
            {...register("author_name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })}
          />
          {errors.author_name && (
            <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 6 }}>
              {errors.author_name.message}
            </div>
          )}
        </div>

        <div>
          <textarea
            className="textarea"
            placeholder="Write a comment…"
            rows={4}
            {...register("message", { required: "Comment is required", minLength: { value: 3, message: "Min 3 characters" } })}
          />
          {errors.message && (
            <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 6 }}>
              {errors.message.message}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className={`btn ${isSubmitting ? "" : "btnPrimary"}`} disabled={isSubmitting} type="submit">
            {isSubmitting ? "Adding…" : "Add Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}
