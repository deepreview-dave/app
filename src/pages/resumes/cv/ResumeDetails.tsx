import { useResultState } from "../../../state/result-state";
import { useResumeDetailsState } from "../../../state/resume.state";

export const ResumeDetails = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeDetailsState((state) => state);

  return (
    <div className="review-content">
      <div className="p-4">
        <table>
          <tr>
            <td colSpan={2} className="row-title is-monospace is-bold pb-4">
              1. Start by entering your details
            </td>
          </tr>
          <tr>
            <td>
              <label>Name</label>
            </td>
            <td>
              <input
                className="input is-small"
                disabled={resultLoading}
                placeholder="Please enter your name"
                type={"text"}
                value={state.name}
                onChange={(e) => state.setName(e.currentTarget.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Address</label>
            </td>
            <td>
              <input
                className="input is-small"
                disabled={resultLoading}
                placeholder="Please enter your address"
                type={"text"}
                value={state.address}
                onChange={(e) => state.setAddress(e.currentTarget.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Phone</label>
            </td>
            <td>
              <input
                className="input is-small"
                disabled={resultLoading}
                placeholder="Please enter your phone number"
                type={"text"}
                value={state.phone}
                onChange={(e) => state.setPhone(e.currentTarget.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Email</label>
            </td>
            <td>
              <input
                className="input is-small"
                disabled={resultLoading}
                placeholder="Please enter your email address"
                type={"text"}
                value={state.email}
                onChange={(e) => state.setEmail(e.currentTarget.value)}
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
