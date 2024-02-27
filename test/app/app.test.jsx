import { render, screen } from "@testing-library/react";
import Page from "@/app";

test("Page", async () => {
  render(<Page />);
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 1, name: "Home" })
    ).toBeDefined();
  });
});
