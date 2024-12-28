import Page from "./page";
import { act, render, screen } from "@testing-library/react";

describe("slug page", () => {
  it("should render", async () => {
    const { container: pageContainer } = await act(async () => {
      return render(
        <Page
          params={Promise.resolve({
            slug: "hello!",
          })}
        />,
      );
    });

    expect(pageContainer).toMatchSnapshot();
  });

  it("should render a heading", async () => {
    await act(async () => {
      return render(
        <Page
          params={Promise.resolve({
            slug: "hello!",
          })}
        />,
      );
    });

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("Slug: hello!");
  });
});
