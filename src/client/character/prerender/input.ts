export class Input {
	/*   This class is used to encapsulate user input
	 *   Input is cached after computation step */
	private _moveDirection: Vector3 = new Vector3(0, 0, 0);
	private _rotationDirection: Vector2 = new Vector2(0, 0);

	private updateMoveDirection(): void {}

	private updateRotationDirection(): void {}

	public update(dt: number): void {}

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
