export class Position {
	private _breatheOffset: Vector3 = new Vector3(0, 0, 0);

	constructor(private _position: Vector3) {}

	private updateBreatheOffset(): void {}

	public update(movement: Vector3): void {
		this.updateBreatheOffset();
	}

	public getPosition(): Vector3 {
		return this._position;
	}

	public getBreatheOffset(): Vector3 {
		return this._breatheOffset;
	}
}