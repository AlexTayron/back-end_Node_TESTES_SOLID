import { Appointment } from "../entities/appointment";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;
export class CreateAppointment {
  async execute(
    request: CreateAppointmentRequest
  ): Promise<CreateAppointmentResponse> {}
}
