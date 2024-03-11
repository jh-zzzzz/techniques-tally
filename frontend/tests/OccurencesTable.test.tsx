import { render, waitFor } from "@testing-library/react";
import { Occurence } from "../src/components/OccurencesTable";
import { Technique } from "../src/components/Technique";
import { vi } from "vitest";
import React from "react";

const fetchMockData = (mockData: { data: Occurence[] }) => {
  return { json: () => new Promise((resolve) => resolve(mockData)) };
};

describe("OccurencesTable", () => {
  it("renders table", async () => {
    // Arrange
    const mockData = {
      data: [
        {
          id: "123",
          date: "2012",
          athlete: "tjabba",
          game: "",
          timestamp: "",
          video_link: "",
        },
        {
          id: "321",
          date: "2011",
          athlete: "Ronaldo",
          game: "",
          timestamp: "",
          video_link: "",
        },
        {
          id: "1337",
          date: "2010",
          athlete: "Tjabba",
          game: "",
          timestamp: "",
          video_link: "",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValueOnce(fetchMockData(mockData));

    // Act
    const { container } = render(<Technique />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Assert
    const entries = container.querySelectorAll(".occurence");
    expect(entries).toHaveLength(3);
  });
});
