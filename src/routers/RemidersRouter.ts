import { Router } from "express";
import createReminderDtos from "../dtos/create-reminder";
import Reminder from "./reminder";

const router = Router();
const reminders: Reminder[] = [];

router.get("/", (req, res) => {
  res.json(reminders);
});
router.post("/", (req, res) => {
  const { title } = req.body as createReminderDtos;
  const reminder = new Reminder(title);
  reminders.push(reminder);
  res.status(201).json(reminders);
});
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body as createReminderDtos;

  const patchReminder = reminders.find((reminder) => reminder.id === id);

  if (!patchReminder) {
    return res.status(404).send("Reminder not found");
  }

  updateReminder(patchReminder, { title });

  res.status(200).send("Reminder updated successfully");
});

function updateReminder(reminder: Reminder, updates: createReminderDtos) {
  Object.assign(reminder, updates);
}
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const reminderIndex = reminders.findIndex((reminder) => reminder.id === id);

  if (reminderIndex === -1) {
    return res.status(404).send("Reminder not found");
  }

  // Remove the reminder from the array
  reminders.splice(reminderIndex, 1);

  res.status(200).send("Reminder Deleted successfully");
});

export default router;
