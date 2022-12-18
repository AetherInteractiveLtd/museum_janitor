export class Rotation {
	constructor(private _rotation: CFrame) {}

	public update(rotation: Vector2): CFrame {
		return this._rotation;
	}

	public getRotation(): CFrame {
		return this._rotation;
	}
}
