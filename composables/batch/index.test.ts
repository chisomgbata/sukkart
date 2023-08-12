import { describe, it, expect } from "vitest";
import { useGetNextDeliveryBatch } from "./index";
describe("CalculateNextBatch", () => {
  it("returns the correct delivery batch for a Tuesday before 8:30am", () => {
    const inputDate = new Date("2021-07-20T08:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Tuesday, July 20 by 9am");
  });

  it("returns the correct delivery batch for a Tuesday before 12:30pm", () => {
    const inputDate = new Date("2021-07-20T12:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Tuesday, July 20 by 1pm");
  });

  it("returns the correct delivery batch for a Tuesday before 4:30pm", () => {
    const inputDate = new Date("2021-07-20T16:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Tuesday, July 20 by 5pm");
  });

  it("returns the correct delivery batch for a Tuesday after 4:30pm", () => {
    const inputDate = new Date("2021-07-20T17:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe(
      "Wednesday, July 21 by 9am"
    );
  });

  it("returns the correct delivery batch for a Sunday", () => {
    const inputDate = new Date("2021-07-18T17:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Tuesday, July 20 by 9am");
  });

  it("returns the correct delivery batch for a Monday", () => {
    const inputDate = new Date("2021-07-19T17:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Tuesday, July 20 by 9am");
  });

  it("returns the correct delivery batch for a Saturday after 4:30", () => {
    const inputDate = new Date("2021-07-24T17:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Tuesday, July 27 by 9am");
  });

  it("returns the correct delivery batch for a Saturday before 4:30", () => {
    const inputDate = new Date("2021-07-24T16:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Saturday, July 24 by 5pm");
  });

  it("returns the correct delivery batch for a Friday after 4:30", () => {
    const inputDate = new Date("2021-07-23T17:00:00");
    expect(useGetNextDeliveryBatch(inputDate)).toBe("Saturday, July 24 by 9am");
  });
});
