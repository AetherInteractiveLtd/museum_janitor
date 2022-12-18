export class CameraWrapper {
	constructor(private _camera: Camera) {}

	public update(position: Vector3, rotation: CFrame): void {
		if (rotation.LookVector.Magnitude === 0) return;
		this._camera.CFrame = new CFrame(position, position.add(rotation.LookVector));
	}
}
