import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("shold be able to create an appointment", () => {
    const createAppointment = new CreateAppointment();

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "Jhon Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
