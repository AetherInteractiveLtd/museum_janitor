import { UserInputService, Workspace } from "@rbxts/services";

enum Moving {
	Forward,
	Backward,
	Left,
	Right,
}

export class Input {
	/*   This class is used to encapsulate user input
	 *   Input is cached after computation step */
	private _moveDirection: Vector3 = new Vector3(0, 0, 0);
	private _rotationDirection: Vector2 = new Vector2(0, 0);

	private is(direction: Moving): boolean {
		switch (direction) {
			case Moving.Forward:
				return UserInputService.IsKeyDown(Enum.KeyCode.W);
			case Moving.Backward:
				return UserInputService.IsKeyDown(Enum.KeyCode.S);
			case Moving.Left:
				return UserInputService.IsKeyDown(Enum.KeyCode.A);
			case Moving.Right:
				return UserInputService.IsKeyDown(Enum.KeyCode.D);
			default:
				return false;
		}
	}

	private updateMoveDirection(): void {
		this._moveDirection = new Vector3(
			this.is(Moving.Forward) ? 1 : 0 - (this.is(Moving.Backward) ? 1 : 0),
			0,
			this.is(Moving.Right) ? 1 : 0 - (this.is(Moving.Left) ? 1 : 0),
		);
	}

	private updateRotationDirection(): void {
		if (!Workspace.CurrentCamera) return;
		const viewportSize = Workspace.CurrentCamera.ViewportSize;
		if (viewportSize.X === 0 || viewportSize.Y === 0) return;
		this._rotationDirection = UserInputService.GetMouseDelta().div(Workspace.CurrentCamera.ViewportSize);
	}

	public update(): void {
		this.updateMoveDirection();
		this.updateRotationDirection();
	}

	/*   This function returns the direction of movement
	 *   of the character in local space (relative to the
	 *   character's rotation). */
	public getMoveDirection(): Vector3 {
		return this._moveDirection;
	}

	/*   This function returns the direction of rotation
	 *   of the character in the local X and Y axes.
	 *   The X axis is the left/right looking axis
	 *   and the Y axis is the up/down looking axis. */
	public getRotationDirection(): Vector2 {
		return this._rotationDirection;
	}
}
