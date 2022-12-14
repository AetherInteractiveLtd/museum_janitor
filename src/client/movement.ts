import { Players, RunService, UserInputService, Workspace } from "@rbxts/services";
import Spring from "./spring";


const walkspeed = 0.4;

export class MovementState {
    public increase: Vector3 = new Vector3();
    public velocity = new Spring(new Vector3(), new Vector3(), new Vector3());

    public pos = new Vector3();

    private desiredVelocity: Vector3 = new Vector3();

    public resetIncrease() {
        this.increase = new Vector3();
    }

    public addIncrease(vel: Vector3) {
        this.increase = this.increase.add(vel);
    }

    public getIncrease() {
        if (this.increase.Magnitude > 0.1) {
            return this.increase.Unit.mul(walkspeed);
        } else {
            return new Vector3(0, 0, 0);
        }
    }

    public setTarget(vel: Vector3) {
        this.velocity.target = vel;
    }

    public updateVelocity(dt: number) {
        return this.velocity.update(dt);
    }

    public getP() {
        return this.pos;
    }

    public getPosition() {
        return new Vector3(this.pos.X, 10, this.pos.Z);
    }

    public setPosition(pos: Vector3) {
        this.pos = pos;
    }

    public getVelocity() {
        return this.velocity.position;
    }
}

export namespace MovementController {
    export const state = new MovementState();
    
    export function character(): Model {
        return Players.LocalPlayer.Character as Model;
    }

    function kd(k: Enum.KeyCode): boolean {
        return UserInputService.IsKeyDown(k);
    }

    export function updateControls(): Vector3 {
        state.resetIncrease();
        let delta: Vector3 = new Vector3()

        if (kd(Enum.KeyCode.W)) {
            delta = delta.add(new Vector3(1, 0, 0));
        }
        if (kd(Enum.KeyCode.S)) {
            delta = delta.add(new Vector3(-1, 0, 0));
        }
        if (kd(Enum.KeyCode.A)) {
            delta = delta.add(new Vector3(0, 0, 1));
        }
        if (kd(Enum.KeyCode.D)) {
            delta = delta.add(new Vector3(0, 0, -1));
        }

        state.addIncrease(delta);

        return delta;
    }

    const part = new Instance("Part");

    part.Parent = Workspace;
    part.Anchored = true;

    let i = 0;
    export function update(dt: number): void {
        i++;

        updateControls();

        const increase = state.getIncrease();

        state.setTarget(increase);
        const newVelocity = state.updateVelocity(dt);

        state.setPosition(state.getP().add(newVelocity));

        let pos = state.getPosition();
        part.CFrame = new CFrame(pos);

        if (i % 5) {
            print(increase, newVelocity, state.increase);
        }
    }
}