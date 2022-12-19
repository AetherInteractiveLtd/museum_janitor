const ROTATION_SENSITIVITY = 2;
// the range of vertical rotation permitted
const VERTICAL_ROTATION_RANGE = math.pi / 2;

export class Rotation {
	constructor(private _rotation: Vector2) {}

	public getRotation(): CFrame {
		return CFrame.Angles(0, this._rotation.X, 0).mul(CFrame.Angles(this._rotation.Y, 0, 0));
	}

	public getFlatRotation(): CFrame {
		return CFrame.Angles(0, this._rotation.X, 0);
	}

	public update(rotation: Vector2): CFrame {
		const scaledRotation: Vector2 = rotation.mul(ROTATION_SENSITIVITY);
		this._rotation = new Vector2(
			this._rotation.X + scaledRotation.X,
			math.clamp(this._rotation.Y + scaledRotation.Y, -VERTICAL_ROTATION_RANGE / 2, VERTICAL_ROTATION_RANGE / 2),
		);
		return this.getRotation();
	}
}
