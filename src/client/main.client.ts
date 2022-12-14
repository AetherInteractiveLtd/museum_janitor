import { RunService } from "@rbxts/services";
import { CameraController } from "./camera";
import { MovementController } from "./movement";

RunService.Heartbeat.Connect((dt: number) => {
    MovementController.update(dt);
})

RunService.RenderStepped.Connect((dt: number) => {
    CameraController.update(MovementController.state);
})