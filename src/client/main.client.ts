import { RunService } from "@rbxts/services";
import { MovementController } from "./movement";

RunService.Heartbeat.Connect((dt: number) => {
    MovementController.update(dt);
})