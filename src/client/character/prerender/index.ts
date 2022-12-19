import { Position } from "./position";
import { Rotation } from "./rotation";
import { Input } from "./input";
import { RunService } from "@rbxts/services";

const START_POSITION = new Vector3(0, 3, 0);
const START_ROTATION = new Vector2(0, 0);
const PRE_RENDER = RunService.Heartbeat;

export class PreRender {
	private readonly _position: Position = new Position(START_POSITION);
	private readonly _rotation: Rotation = new Rotation(START_ROTATION);
	private readonly _input: Input = new Input();
	private readonly _connection: RBXScriptConnection;

	constructor() {
		this._connection = PRE_RENDER.Connect(this.update);
	}

	private update(dt: number): void {
		this._input.update();
		const updatedRotation: CFrame = this._rotation.update(this._input.getRotationDirection().mul(dt));
		const localMovement: Vector3 = updatedRotation.PointToObjectSpace(this._input.getMoveDirection().mul(dt));
		this._position.update(dt, localMovement);
	}

	public destroy(): void {
		this._connection.Disconnect();
	}

	public position = this._position.getPosition;

	public rotation = this._rotation.getRotation;

	public flatRotation = this._rotation.getFlatRotation;

	public breatheOffset = this._position.getBreatheOffset;
}
