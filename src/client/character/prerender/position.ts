import Spring from "@rbxts/spring";

const CURRENT_TIME = tick;
const WALK_SPEED = 16;

export class Position {
	private _breatheOffset: Vector3 = new Vector3(0, 0, 0);
	private _position: Spring<Vector3>;

	constructor(_position: Vector3) {
		this._position = new Spring<Vector3>(_position, WALK_SPEED, _position, 1);
	}

	private updateBreatheOffset(): void {
		const C: number = 0.4 / 2.3;
		const O = math.pi / 20;
		const W = 0.5;
		const Wt = W * CURRENT_TIME();
		this._breatheOffset = new Vector3(0, math.sin(Wt) ** 2 + C * math.cos(Wt) ** 10 - O, 0);
	}

	private updatePosition(dt: number, movement: Vector3): void {
		const scaledMovement: Vector3 = movement.mul(WALK_SPEED);
		this._position.goal = this._position.position.add(scaledMovement);
		this._position.update(dt);
	}

	public update(dt: number, movement: Vector3): void {
		this.updateBreatheOffset();
		this.updatePosition(dt, movement);
	}

	public getPosition(): Vector3 {
		return this._position.position;
	}

	public getBreatheOffset(): Vector3 {
		return this._breatheOffset;
	}
}
