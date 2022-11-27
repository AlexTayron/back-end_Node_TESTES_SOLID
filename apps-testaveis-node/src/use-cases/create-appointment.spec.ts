import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("shold be able to create an appointment", () => {
    const startsAt = getFutureDate('2022-11-27')
    const endsAt = getFutureDate('2022-11-28')

    const createAppointment = new CreateAppointment()

    expect(
      createAppointment.execute({
        customer: "Jhon Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
