export const PageInfo = () => {
  return (
    <>
      <div className="content has-text-centered">
        <h1 className="title has-text-weight-bold">
          Generate performance reviews using AI
        </h1>
        <h3
          className="subtitle mt-2 has-text-weight-normal"
          style={{ lineHeight: "32px" }}
        >
          DeepReview automatically generates meaningful reviews from just a name
          and a score.
          <br />
          Add details like <span className="is-underlined">roles</span>,{" "}
          <span className="is-underlined">skills</span>,{" "}
          <span className="is-underlined">strengths</span> and areas to{" "}
          <span className="is-underlined">improve</span> to create personalised,
          tailor made, reviews.
        </h3>
      </div>
    </>
  );
};
