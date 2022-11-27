import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("shold be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-11-27");
    const endsAt = getFutureDate("2022-11-28");

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    expect(
      createAppointment.execute({
        customer: "Jhon Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("shold be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate("2022-11-27");
    const endsAt = getFutureDate("2022-11-30");

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      customer: "Jhon Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt: getFutureDate("2022-11-29"),
        endsAt: getFutureDate("2022-12-05"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt: getFutureDate("2022-11-08"),
        endsAt: getFutureDate("2022-12-01"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt: getFutureDate("2022-08-29"),
        endsAt: getFutureDate("2022-12-25"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
