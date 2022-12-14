import { Workspace, UserInputService, RunService } from "@rbxts/services";
import { MovementState } from "./movement";

class CameraState {
    private hasStepped: boolean = false;
    private lookVector: Vector3 = Vector3.zAxis;

    public bob(t: number): Vector3 {
        const C = 0.4/2.3;
        const O = math.pi / 20;
        const W = 0.5;
        let Wt = W * t
        let bob = math.sin (Wt) ^ 2
            * C * (math.cos (Wt)) ^ 10 
                - O;
        return new Vector3(0, bob, 0)
    }

    public applyRotation() {
        // take in a  
    }

}

export namespace CameraController {

    const EYE_OFFSET: Vector3 = new Vector3();
    const state: CameraState = new CameraState();

    let cam: Camera;

    export function initialise(): void {
        cam = Workspace.CurrentCamera!;
        cam.CameraType = Enum.CameraType.Scriptable;
    }

    export function registerInputListeners(): void {
        RunService.RenderStepped.Connect((t: number) => {
            // let delta: Vector3 = UserInputService.GetMouseDelta();
            // magic to modify some internal state
        })
    }

    initialise();

    export function update(c: MovementState): void {
        let time: number = tick();
        let position: Vector3 = c.getPosition();
        let velocity: Vector3 = c.getVelocity();

        let bob: Vector3 = state.bob(time);
        // apply rotation to make sure we face the correct way
        // offset rotation using pos.getVelocity();

        cam.CFrame = new CFrame(c.getPosition());
    }

}