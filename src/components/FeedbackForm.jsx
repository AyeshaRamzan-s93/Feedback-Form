
import { useState } from "react";

function FeedbackForm() {
  // Controlled states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("General Suggestion");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [recommend, setRecommend] = useState("");
  const [submitted, setSubmitted] = useState(false);                 // for conditional rendering
  const [errors, setErrors] = useState({});


  // Validation logic
  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Email must contain @ and .";
    }
    if (rating === 0) newErrors.rating = "Give a rating";
    if (message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    if (!recommend) newErrors.recommend = "Please select an option";
    return newErrors;
  };


  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setSubmitted(true);                              // Show thank-you message
      console.log({
        name,
        email,
        feedbackType,
        rating,
        message,
        recommend,
      });
    }
  };

  // Conditional rendering: if submitted show thank-you
  if (submitted) {
    return (
      <div className="form-card success">
        <h2>Thank you {name}!</h2>
        <p>
          Your <b>{feedbackType}</b> has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Feedback Type */}
        <div className="form-group">
          <label>Feedback Type:</label>
          <select
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option>Feature Request</option>
            <option>General Suggestion</option>
            <option>Complaint</option>
            <option>Appreciation</option>
          </select>
        </div>

        {/* Rating */}
        <div className="form-group">
          <label>Rate your experience:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setRating(num)}
                className={rating >= num ? "star selected" : "star"}
              >
                ★
              </span>
            ))}
          </div>
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>

        {/* Message */}
        <div className="form-group">
          <label>Feedback Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback..."
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        {/* Recommend */}
        <div className="form-group">
          <label>Would you recommend us?</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                value="Yes"
                checked={recommend === "Yes"}
                onChange={(e) => setRecommend(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={recommend === "No"}
                onChange={(e) => setRecommend(e.target.value)}
              />
              No
            </label>
          </div>
          {errors.recommend && <p className="error">{errors.recommend}</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
