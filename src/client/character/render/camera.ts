const CAMERA_LERP_SPEED = 0.1;
const CAMERA_HEAD_OFFSET = new Vector3(0, 2, 0);
export class CameraWrapper {
	constructor(private _camera: Camera) {}

	public update(position: Vector3, rotation: CFrame): void {
		if (rotation.LookVector.Magnitude === 0) return;
		const newRotation: CFrame = this._camera.CFrame.Rotation.Lerp(rotation, CAMERA_LERP_SPEED);
		this._camera.CFrame = new CFrame(position).mul(newRotation).add(CAMERA_HEAD_OFFSET);
	}
}
