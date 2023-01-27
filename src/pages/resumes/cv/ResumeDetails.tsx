import { useResultState } from "../../../state/result-state";
import { useResumeDetailsState } from "../../../state/resume.state";

export const ResumeDetails = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeDetailsState((state) => state);

  return (
    <div className="review-content">
      <div className="p-2">
        <div>
          <label>Name</label>
          <input
            disabled={resultLoading}
            placeholder="e.g. John Smith"
            type={"text"}
            value={state.name}
            onChange={(e) => state.setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            disabled={resultLoading}
            placeholder="Address"
            type={"text"}
            value={state.address}
            onChange={(e) => state.setAddress(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            disabled={resultLoading}
            placeholder="Phone"
            type={"text"}
            value={state.phone}
            onChange={(e) => state.setPhone(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            disabled={resultLoading}
            placeholder="Email"
            type={"text"}
            value={state.email}
            onChange={(e) => state.setEmail(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};
